
"use strict";

/******************************************
 ****** Default Server configuration ******
 ******************************************/
let SERVER_CONFIG = {
    MONGODB: {
        HOST: "127.0.0.1",
        PORT: process.env.DB_PORT || 27017,
        NAME: "mongodb",
        CONNECTOR: "mongodb",
        URL: process.env.DB_URL || "mongodb://localhost/assignment_test",
        DATABASE: "demo_dev",
        USER: "",
        PASSWORD: "",
    },
    HOST: process.env.HOST || "0.0.0.0",
    TYPE: "http://",
    PORT: process.env.PORT || '4007'
};

/** exporting server configuration **/
module.exports = SERVER_CONFIG;
