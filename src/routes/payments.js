const express = require("express");
const router = express.Router();
const helper = require("../auth/helpers");
const paymentController = require("../controllers/paymentController");
const validation = require("./validation");

router.get("/upgrade", 
    helper.ensureAuthenticated,
    helper.ensureVerified,
    paymentController.getUpgrade);
router.post("/upgrade", 
    helper.ensureAuthenticated,
    helper.ensureVerified,
    paymentController.upgrade);
router.get("/downgrade", 
    helper.ensureAuthenticated,
    helper.ensureVerified,
    paymentController.getDowngrade);
router.post("/downgrade", 
    helper.ensureAuthenticated,
    helper.ensureVerified,
    paymentController.downgrade);

module.exports = router;