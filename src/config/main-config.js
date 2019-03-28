require("dotenv").config();
const path = require("path");
const viewsFolder = path.join(__dirname, "..", "views");
const bodyParser = require("body-parser");
/*
const expressValidator = require("express-validator");
const session = require("express-session");
const flash = require("express-flash");
const passportConfig = require("./passport-config");
*/
const logger = require('morgan');

module.exports = {
    init(app, express){
        app.set("views", viewsFolder);
        app.set("view engine", "ejs");
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(express.static(path.join(__dirname, "..", "assets")));
        /*
        app.use(expressValidator());
        app.use(session({
            secret: process.env.cookieSecret,
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 60000 } 
          }));
        app.use(flash());
        passportConfig.init(app);
        app.use((req,res,next) => {
            res.locals.currentUser = req.user;
            if(res.locals.currentUser != undefined){
                console.log(res.locals.currentUser.dataValues.role);
            }
            next();
        });
        */
        app.use(logger('dev'));
    }
};