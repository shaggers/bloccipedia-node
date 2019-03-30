const userQueries = require("../db/queries.users.js");
const sgMail = require('@sendgrid/mail');
const crypto = require('crypto-random-string');

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

                const cryptoCode = crypto(6);
                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                const msg = {
                //to: newUser.email,
                to: "camtl66@gmail.com",
                from: "camtl66@gmail.com",
                subject: 'Bloccipedia account verification',
                text: 'confirmation code: ' + cryptoCode,
                html: '<strong>Thank you for signing up with bloccipedia.</strong>'
                };
                sgMail.send(msg);

                req.flash("notice", "Please verify your account");
                res.redirect("/users/verification");
            }
        });
    }
}