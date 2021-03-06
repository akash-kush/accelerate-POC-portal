/**
 * @fileoverview Server configuration file
 */
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require("cors"),
    chalk = require("chalk"),
    compression = require("compression"),
    helmet = require("helmet"),
    serverPortConfiguration = require("./config/serverPortConfig"),
    mongoDbConfig = require("./config/mongoDBConfig"),
    winston = require("./config/serverPortConfig"),
    auth = require('./routers/auth'),
    user = require('./routers/user');

//Middlewares
app.use(cors());
mongoDbConfig.connect();
app.use(express.json());
app.options("*", cors());
app.use(helmet());
app.use(compression());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy({setTo:"PHP 4.2.2"}));
app.use(require("morgan")("combined", {stream: winston.stream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Routes
app.use('/api/auth', auth);
app.use('/api/user', user);

app.use(function(err, req, res, next) {
    console.log(err)
    return res.status(500).send({ error: err });
});

app.use("*", (req,res)=> {
    res.status(404).json("The route you requested has not been found");
});

app.listen(serverPortConfiguration.port,serverPortConfiguration.host,()=> console.log(`%s Sicarii running on ${serverPortConfiguration.port}`, chalk.green('✓')));
