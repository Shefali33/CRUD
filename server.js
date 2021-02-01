`use strict`;

require('dotenv').config();
require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { ServerConfig } = require('./config');
const routes = require('./routes');
const { route } = require('./utils/routeUtils');
const mongoose = require('mongoose');
const { MongodbConnectionMessage, MongodbErrorConnection, ServerSuccess } = require('./utils/static-messages');
mongoose.Promise = global.Promise;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(express.static(__dirname + '/'));


// Route configured with app
route(app, routes);
const connectDb = () => {
    /* Mongodb connection established here if mongodb is runing and connection string is correct */
    mongoose.connect(ServerConfig.MONGODB.URL, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).then(async res => {
        console.log(MongodbConnectionMessage);
        return;
    }).catch(error => {
        console.log(`${MongodbErrorConnection} ${error}`);
    });
};

/**
 * Server is running
 */

app.listen(ServerConfig.PORT, function (err) {
    try {
        if (err) {
            return process.exit(0);
        }
        connectDb();
        console.log(`${ServerSuccess} ${ServerConfig.PORT}`);
        return true;
    } catch (error) {
        process.exit(0)
    }
});




