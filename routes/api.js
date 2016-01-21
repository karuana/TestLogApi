var express = require('express');
var _ = require('lodash');
var mement = require('moment');
var jsonfile = require('jsonfile');
var router = express.Router();

var baseDirectory = "storage/"

router.post('/', function (req, res) {
  var content = ( !_.isUndefined(req.body.content) ) ? JSON.parse(req.body.content) : undefined ;
  if (!_.isUndefined(content) && !_.isUndefined(content.uuid)) {

    var timestamp = mement().format('YYYY_MM_DD_HH_mm_ss');

    jsonfile.writeFile(baseDirectory + timestamp + "_" + content.uuid + ".log", function(err) {
      console.error(err);
    });

  }

  res.json({
    responseResult : {
      result: 0
    }
  });

});

module.exports = router;
