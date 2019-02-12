const router = require ('express').Router();
const aws = require ('aws-sdk');
const multer = require('multer');
const multerS3 = require ('multer-s3');
const faker = require('faker');


const Product = require ('../models/product');
const checkJWT = require ('../middlewares/check-jwt');

const s3 = new aws.S3({ accessKeyId: "AKIAJR5YNMD5HXIPIWGA", secretAccessKey: "sXRt1p72X0iUdYh2d8yvDCVN7fcZ98vnHtoaxCu4" });


const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'amano-angular-angolia-mogo',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

router.route('/products')
  .get(checkJWT, (req, res, next) => {
    Product.find( {owner: req.decoded.user._id} )
      .populate('owner')
      .populate('category')
      .exec((err, products) => {
        if (products) {
          res.json({
            success: true,
            message: "Products",
            products: products
          });
        }
      });
  })
  .post([checkJWT, upload.single('product_picture')], (req, res, next) => {
    console.log(upload);
    console.log(req.file);
    let product = new Product();
    product.owner = req.decoded.user._id;
    product.category = req.body.categoryId;
    product.title = req.body.title;
    product.price = req.body.price;
    product.description = req.body.description;
    product.image = req.file.location;
    product.save();
    res.json({
      success: true,
      message: 'Successfully Added the product image. a lot of stuff. \u{1F631}'
    });
  });

  //////////********* Just for testing *********//////////
router.get('/faker/test', (req, res, next) => {
  for (let i = 0; i < 20; i++) {   //add 20 pictur use for loop
    let product = new Product();
    product.category = "5c61683ada109f63e81a1c14";
    product.owner = "5c606ae222f86d0b2f486462";
    product.image = faker.image.cats();
    product.title = faker.commerce.productName();
    product.description = faker.lorem.word();
    product.price = faker.commerce.price();
    product.save();
  }

  res.json({
    message: "Successfully add 20 pictures by faker \u{1F604} "
  })
})

module.exports = router;