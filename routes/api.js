var express = require('express');
var _ = require('lodash');
var mement = require('moment');
var fs = require('fs');
var fs_ext = require('fs-extra');
var router = express.Router();

var baseDirectory = "storage/"

router.post('/', function (req, res) {
    var content = ( !_.isUndefined(req.body.content) ) ? JSON.parse(req.body.content) : undefined;
    if (!_.isUndefined(content) && !_.isUndefined(content.uuid) && _.isArray(content.logList)) {

        var timestamp = mement().format('YYYYMMDDHHmmss');

        var contentData = _.join(content.logList);
        fs.writeFile(baseDirectory + timestamp + "_" + content.uuid + ".txt", contentData, function (err) {
            if (err) {
                console.error(err);
            }

        });

    }

    res.json({
        responseResult: {
            result: 0
        }
    });

});

router.get('/clear', function (req, res) {

    fs_ext.emptyDir(baseDirectory, (err)=>{
        if(err) {
            console.log(err);
        }
    });
    res.json({
        responseResult : {
            result: 0
        }
    });

});

module.exports = router;
