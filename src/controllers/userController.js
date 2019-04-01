const userQueries = require("../db/queries.users.js");
const sgMail = require('@sendgrid/mail');
const passport = require("passport");

module.exports = {

    signUp(req, res, next){
      res.render("users/sign_up");
    },
    create(req, res, next){

        let newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirmation: req.body.passwordConfirmation
        };

        userQueries.createUser(newUser, (err, user) => {
            if(err){
                req.flash("error", err);
                res.redirect("/users/sign_up");
            } else {
                console.log("above passport function");
                passport.authenticate("local")(req, res, () => {
                console.log("inside passport function");
                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                const msg = {
                //to: newUser.email,
                to: "camtl66@gmail.com",
                from: "camtl66@gmail.com",
                subject: 'Bloccipedia account verification',
                text: 'Your verification code is: ' + user.verificationCode
                };
                sgMail.send(msg);

                req.flash("notice", "Please verify your account");
                res.redirect("/users/verification");
                })
            }
        });
    },
    signInForm(req, res, next){
        res.render("users/sign_in");
    },
    signIn(req, res, next){

        passport.authenticate('local', function(err, user, info) {
            console.log(user);
            if(err){
              req.flash("notice", "Sign in failed. Please try again.")
              return next(err);
            }
            if(!user){
                req.flash("notice", "The email or password you entered was incorrect");
                return res.redirect('/users/sign_in')
            } 
            req.login(user, function(err) {
                req.flash("notice", "You've successfully signed in!");
                if(err){return next(err);}
                return res.redirect("/")
            })
        })(req, res, next);
    },
    signOut(req, res, next){
        req.logout();
        req.flash("notice", "You've successfully signed out!");
        res.redirect("/");
    },
    verifyForm(req, res, next){
        if(req.user){
            res.render("users/verification");
        } else {
            res.redirect("/")
        }
    },
    verify(req, res, next){

        if(req.body.verificationCode === req.user.verificationCode){
            userQueries.verifyAccount(req.user.id);
                req.flash("notice", "Your account verification was successful");
                res.redirect("/");
        } else {
            req.flash("notice", "The code you've entered is incorrect. Please try again.");
            res.redirect("/users/verification");
        }
    }
}