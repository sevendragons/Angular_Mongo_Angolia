import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import {config} from './config';

// const express = require ('express');
// const morgan = require ('morgan');
// const bodyParser = require ('body-parser');
// const mongoose = require ('mongoose');
// const cors = require ('cors');

// const config = require ('./config');
const app = express();
mongoose.connect(config.database, err => {

    if( err) {
        console.log(err);
    } else {
        console.log("Connected to the database");
    } 
    
})

app.get('/', (req, res, next) => {
    return res.json({
        user: 'Ask What',
        msg: 'Welcome to express'
    })
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
    useNewUrlParser: true
}));
app.use(morgan('dev'));
app.use(cors());


app.listen( err => {
    console.log(`Listen in Port ${config.port} show that and add mongoose !!! `);
    
});
// console.log('Listen in Port ' + config.port + ' show that and add mongoose !!! ');
