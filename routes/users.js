var express = require("express");
var router = express.Router();
var userController = require("../controllers/user");

router.get("/", function(req, res, next) {
  res.send("Wohuuu!....I am working");
});

router.get("/getId", function(req, res) {
  res.json(userController.getUserId(req.query));
});

module.exports = router;
