var express = require('express');
var router = express();

router.get('/', function (request, response) {
    request.models.client.find(function(err, results) {
        response.send(results);
    });
});

router.get('/:_id', function (request, response) {
    var _id = request.params["_id"];
    request.models.client.one({id: _id}, function(err, client) {
        client.getOrganization(function (err, result) {
            client.getTasks(function (err, result) {
                response.send(client);
            });
        });
    });
});

module.exports = router;