const express = require("express");
const router = express.Router();
const helper = require("../auth/helpers");
const wikiController = require("../controllers/wikiController");
const validation = require("./validation");

router.get("/wikis", 
    wikiController.index);
router.get("/wikis/new",
    helper.ensureAuthenticated,
    helper.ensureVerified,
    wikiController.new);
router.post("/wikis/create", 
    validation.validateWikis,
    helper.ensureAuthenticated,
    helper.ensureVerified,
    wikiController.create);
router.get("/wikis/:id", 
    wikiController.show);
router.post("/wikis/:id/destroy",
    helper.ensureVerified,
    helper.ensureAuthenticated,
    wikiController.destroy);
router.get("/wikis/:id/edit", 
    helper.ensureVerified,
    helper.ensureAuthenticated,
    wikiController.edit);
router.post("/wikis/:id/update", 
    validation.validateWikis,
    helper.ensureVerified,
    helper.ensureAuthenticated,
    wikiController.update);

module.exports = router;