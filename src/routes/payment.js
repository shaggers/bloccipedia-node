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
    postController.upgrade);
router.get("/downgrade", paymentController.getDowngrade);
router.post("/downgrade", paymentController.downgrade);

module.exports = router;