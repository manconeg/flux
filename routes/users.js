var express = require('express');
var router = express();

router.get('/:_id', function (request, response) {
    var _id = request.params["_id"];
    request.models.user.one({id: _id}, function(err, result) {
        result.getOrganization(function (err, organization) {
            result.getTasks(function (err, tasks) {
                response.send(result);
            });
        });
    });
});

router.get('/:_id/tasks', function (request, response) {
    var _id = request.params["_id"];
    request.models.user.one({id: _id}, function(err, result) {
        result.getTasks(function (err, tasks) {
            response.send(tasks);
        });
    });
});

module.exports = router;