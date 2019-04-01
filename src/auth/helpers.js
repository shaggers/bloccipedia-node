const bcrypt = require("bcrypt");

module.exports = {

    ensureAuthenticated(req, res, next) {
        if (!req.user){
            req.flash("notice", "You must be signed in to do that.")
            return res.redirect("/users/sign_in");
        } else {
            next();
        }
    },
    ensureVerified(req, res, next) {
        if (req.user.isVerified === false){
            req.flash("notice", "You must verify your account first")
            return res.redirect("/users/verification");
        } else {
            next();
        }
    },
    ensureNotAuthenticated(req, res, next){
        if(req.user){
            req.flash("notice", "You must sign out first.")
            return res.redirect("/");
        } else {
            next();
        }
    },
    ensureNotVerified(req, res, next){
        if (req.user.isVerified === true){
            req.flash("notice", "Your account has already been verified.")
            return res.redirect("/");
        } else {
            next();
        }
    },
    comparePass(userPassword, databasePassword) {
        return bcrypt.compareSync(userPassword, databasePassword);
    }
}