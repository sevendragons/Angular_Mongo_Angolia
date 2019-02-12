const express = require ('express');
const morgan = require ('morgan');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
const cors = require ('cors');

const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/account');
const sellerRoutes = require('./routes/seller');

const app = express();

app.use(bodyParser.urlencoded({
    extended: false,
    useNewUrlParser: true
}));
app.use(bodyParser.json());

const db = require('./config').database;

mongoose.connect(db)
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err));

app.get('/', (req, res, next) => {
    return res.json({
        user: 'Ask What',
        msg: 'Welcome to express'
    })
});


app.use(morgan('dev'));
app.use(cors());

app.use('/api', mainRoutes);
app.use('/api/account', userRoutes);
app.use('/api/seller', sellerRoutes);


const port = process.env.PORT || 3030; //for Heroku

app.listen( port, () => {
    console.log(`Listen in Port ${port} show that and add mongoose !!! `);
    // console.log('Listen in Port ' + config.port + ' show that and add mongoose !!! ');
    
});
