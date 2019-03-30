const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
//const validationController = require("../controllers/verificationController");
const validation = require("./validation");

router.get("/users/sign_up", userController.signUp);
router.post("/users", validation.validateUsers, userController.create);
//router.get("/users/verification", userController.verification);

module.exports = router;