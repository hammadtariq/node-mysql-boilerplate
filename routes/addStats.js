var express = require("express");
var router = express.Router();
var addStatsController = require("../controllers/addStats");

router.get("/getAdd", function(req, res) {
  res.json(addStatsController.insertAddInfo(req.query));
});

router.get("/showAdd", function(req, res) {
  res.json(addStatsController.updateAddInfo(req.query, 'SHOW'));
});

router.get("/clickAdd", function(req, res) {
  res.json(addStatsController.updateAddInfo(req.query, 'CLICK'));
});

module.exports = router;
