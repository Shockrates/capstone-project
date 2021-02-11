/**
 * Required External Modules
 */
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import sampleRoutes from './routes/sample';
import employeeRoutes from './routes/employee'
import deviceRoutes from './routes/device'
import mongoose from "mongoose"

/**
 * Declare App variables
 */
const NAMESPACE = 'Server';
const router = express();
const uri: string = `mongodb+srv://${config.mongo.USER}:${config.mongo.PASSWORD}@cluster0.fu6vy.mongodb.net/${config.mongo.DB}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }

/**
 * Logging the request
 */
router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });
    next();
});

/**
 * Parse the request's body
 */
router.use(
    bodyParser.urlencoded({
        extended: false
    })
);
router.use(bodyParser.json());

/**
 * Define the Rules of the API
 */
router.use((req, res, next) => {
    //In  production enviroment have your routed predifined
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }
    next();
});

/**
 * Routes
 */
router.use('/sample', sampleRoutes);
router.use('/employee', employeeRoutes);
router.use('/device', deviceRoutes);

/**
 * Error Handling
 */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/**
 * Define the database
 */
mongoose.set("useFindAndModify", false);

/**
 * Define the server
 */
const httpServer = http.createServer(router);

/**
 * Deploy the server
 */
mongoose
  .connect(uri, options)
  .then(() =>
    httpServer.listen(config.server.port, () => 
    logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`)
    )
  )
  .catch(error => {
    throw error
  })