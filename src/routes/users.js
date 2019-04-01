const express = require("express");
const router = express.Router();
const helper = require("../auth/helpers");
const userController = require("../controllers/userController");
const validation = require("./validation");

router.get("/users/sign_up",
    helper.ensureNotAuthenticated,
    userController.signUp);
router.post("/users", 
    helper.ensureNotAuthenticated,
    validation.validateUsersSignUp,
    userController.create);
router.get("/users/sign_in", 
    helper.ensureNotAuthenticated,
    userController.signInForm);
router.post("/users/sign_in", 
    helper.ensureNotAuthenticated, 
    validation.validateUsersSignIn, 
    userController.signIn);
router.get("/users/sign_out", 
    helper.ensureAuthenticated, 
    userController.signOut);
router.get("/users/verification", 
    helper.ensureAuthenticated,
    helper.ensureNotVerified, 
    userController.verifyForm);
router.post("/users/verification", 
    helper.ensureAuthenticated,
    helper.ensureNotVerified, 
    userController.verify);

module.exports = router;