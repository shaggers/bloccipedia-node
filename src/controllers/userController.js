const userQueries = require("../db/queries.users.js");
const sgMail = require('@sendgrid/mail');
const crypto = require('crypto-random-string');
const cryptoCode = crypto(6);

module.exports = {

    signUp(req, res, next){
      res.render("users/sign_up");
    },
    create(req, res, next){

        let newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirmation: req.body.passwordConfirmation,
        isVerified : false
        };

        userQueries.createUser(newUser, (err, user) => {
            if(err){
                req.flash("error", err);
                res.redirect("/users/sign_up");
            } else {

                console.log(cryptoCode);
                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                const msg = {
                //to: newUser.email,
                to: "camtl66@gmail.com",
                from: "camtl66@gmail.com",
                subject: 'Bloccipedia account verification',
                text: 'Your verification code is: ' + cryptoCode
                };
                console.log(msg);
                sgMail.send(msg);

                req.flash("notice", "Please verify your account");
                res.redirect("/users/verification");
            }
        });
    }
}