var express = require("express");
var router = express.Router();
var addStatsController = require("../controllers/addStats");

router.get("/getId", function(req, res) {
  res.json(addStatsController.getAddStatsId(req.query));
});

module.exports = router;
