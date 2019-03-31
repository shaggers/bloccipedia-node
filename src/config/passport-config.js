const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../db/models").Users;
const authHelper = require("../auth/helpers");
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

module.exports = {
  init(app){

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy({
        usernameField: "email"
    }, (email, password, done) => {
        User.findOne({
            where: { email }
        })
        .then((user) => {
            if (!user || !authHelper.comparePass(password, user.password)) {
                console.log("sign in failed");
                return done(null, false, { message: "Invalid email or password" });
            }
            return done(null, user);
        }).catch((err) => {
            console.log(err);
        })
    }));
    
    passport.serializeUser((user, callback) => {
      callback(null, user.id);
    });

    passport.deserializeUser((id, callback) => {
      User.findByPk(id)
      .then((user) => {
        callback(null, user);
      })
      .catch((err =>{
        callback(err, user);
      }))

    });
  }
}