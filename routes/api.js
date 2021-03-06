var express = require('express');
var _ = require('lodash');
var mement = require('moment');
var fs = require('fs');
var fs_ext = require('fs-extra');
var router = express.Router();

var baseDirectory = "storage/"
var other = "others/";


router.post('/', function (req, res) {
    var content = ( !_.isUndefined(req.body) ) ? req.body : undefined;
    if (!_.isUndefined(content) && !_.isUndefined(content.uuid) && _.isArray(content.logList)) {

        var logPath = baseDirectory;
        if (_.isUndefined(content.version)) {
            logPath = logPath + other;
        } else {
            logPath = logPath + content.version + "/";
        }

        try {
            var stat = fs.statSync(logPath);
        } catch(e) {
            fs_ext.mkdirsSync(logPath);
        }

        var timestamp = mement().format('YYYYMMDDHHmmss');


        var contentData = _.join(content.logList);
        fs.writeFile(logPath + timestamp + "_" + content.uuid + ".txt", contentData, function (err) {
            if (err) {
                console.error(err);
            }

        });

    }

    res.json({
        responseResult: {
            result: 0
        },
        "packet": {
            "id": "log",
            "content": {}
        }
    });

});

router.get('/clear', function (req, res) {

    fs_ext.emptyDir(baseDirectory, function (err) {
        if (err) {
            console.log(err);
        }
    });
    res.json({
        responseResult: {
            result: 0
        }
    });

});

module.exports = router;
