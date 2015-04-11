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
    stopAllTasks(request);
    var _id = request.params["_id"];
    request.models.task.one({id: _id}, function(err, result) {
        var started = request.body.started;
        if(result.startTime) {
            if(started === false) {
                result.stop();
            }
        } else {
            if(started === true) {

                result.start();
            }
        }

        result.save(function(err) {
            response.send(result.getJson());
        });
    });
});

function stopAllTasks(request) {
    request.models.task.find({"not": [{start_time: null}]}).each(function(task) {
        task.stop();
        task.save();
    });
}

module.exports = router;