var express = require('express');
var router = express();

router.get('/', function (request, response) {
    request.models.project.find(function(err, results) {
        response.send(results);
    });
});

router.get('/:_id', function (request, response) {
    var _id = request.params["_id"];
    request.models.project.one({id: _id}, function(err, project) {
        response.send(project);
    });
});

router.get('/:_id/tasks', function (request, response) {
    var _id = request.params["_id"];
    request.models.project.one({id: _id}, function(err, project) {
        response.send(project.tasks);
    });
});

module.exports = router;