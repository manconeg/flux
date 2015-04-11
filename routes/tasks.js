var express = require('express');
var router = express();

router.get('/:_id', function (request, response) {
    var _id = request.params["_id"];
    request.models.task.one({id: _id}, function(err, result) {
        result.getUser(function (err, user) {
            response.send(result.getJson());
        });
    });
});

router.post('/:_id', function (request, response) {
    var _id = request.params["_id"];
    request.models.task.one({id: _id}, function(err, result) {
        var started = request.body.started;
        if(result.startTime) {
            if(started === false) {
                var diff = new Date() - Date.parse(result.startTime);
                result.timeSpent += diff / 1000 / 60 / 60;
                result.startTime = null;
            }
        } else {
            if(started === true) {
                result.startTime = new Date();
            }
        }

        result.save(function(err) {
            response.send(result.getJson());
        });
    });
});

module.exports = router;