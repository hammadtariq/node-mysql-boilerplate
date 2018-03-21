var express = require("express");
var router = express.Router();
var gameController = require("../controllers/gameInfo");

router.get("/getAdd", function(req, res) {
  res.json(gameController.getGameId(req.query));
});

module.exports = router;
