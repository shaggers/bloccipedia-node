const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const validation = require("./validation");

router.get("/users/sign_up", userController.signUp);
router.post("/users", validation.validateUsersSignUp, userController.create);
router.get("/users/sign_in", userController.signInForm);
router.post("/users/sign_in", validation.validateUsersSignIn, userController.signIn);
router.get("/users/sign_out", userController.signOut);
router.get("/users/verification", userController.verifyForm);
router.post("/users/verification", userController.verify);

module.exports = router;