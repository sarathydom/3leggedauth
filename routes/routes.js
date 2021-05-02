const router = require("express").Router();

const defaultController = require("../controller/routes/default.controller");

router.get(["/", "/access/:token"], defaultController.defaultRoute);

router
  .get("/linkedinCallBack", defaultController.linkedinCallBack)
  .post("/getLinkedinURLForAuth", defaultController.linkedAuthUrl);

module.exports = router;
