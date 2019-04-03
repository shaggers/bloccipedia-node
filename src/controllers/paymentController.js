const paymentQueries = require("../db/queries.payments");

module.exports = {

    getUpgrade(req, res, next){
        if(req.user.role === 0){
            res.render("payments/upgrade")
        } else {
            req.flash("notice", "You already have a premium account")
            res.redirect("/");
        }
    },
    upgrade(req, res, next){

        if(req.user.role === 0){
            // Set your secret key: remember to change this to your live secret key in production
            // See your keys here: https://dashboard.stripe.com/account/apikeys
            var stripe = require("stripe")("sk_test_DdQP0lOl7CMD9qXuHDzMJBUD00MTj4e4K3");

            // Token is created using Checkout or Elements!
            // Get the payment token ID submitted by the form:
            const token = req.body.stripeToken; // Using Express

            (async () => {
                const charge = await stripe.charges.create({
                    amount: 1500,
                    currency: 'usd',
                    description: 'Example charge',
                    source: token,
                });
            })();
            paymentQueries.upgrade(req.user.id);
        } else {
            req.flash("notice", "You already have a premium account")
            res.redirect("/");
        }
    },
    getDowngrade(req, res, next){
        if(req.user.role === 1) {
            res.render("payments/downgrade");
        } else {
            req.flash("notice", "You must upgrade your account first." )
            res.redirect("/");
        }
    },
    downgrade(req, res, next){
        if(req.user.role === 1){
            paymentQueries.downgrade(req.user.id);
        } else {
            req.flash("notice", "You must upgrade your account first." )
            res.redirect("/");
        }
    }

}