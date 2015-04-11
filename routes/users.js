var express = require('express');
var router = express();

router.get('/', function (request, response) {
    request.models.user.find(function(err, results) {
        response.send(results);
    });
});

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

module.exports = router;