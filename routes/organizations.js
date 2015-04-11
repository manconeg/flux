var express = require('express');
var router = express();
var pg = require('pg');

router.get('/', function (request, response) {
    request.models.organization.find(function(err, results) {
        response.send(results);
    });
});

router.get('/:_id', function (request, response) {
    var _id = request.params["_id"];
    request.models.organization.one({id: _id}, function(err, organization) {
        organization.getClients(function (err, results) {
            response.send(organization);
        });
    });
});

router.get('/:_id/clients', function (request, response) {
    var _id = request.params["_id"];
    request.models.organization.one({id: _id}, function(err, result) {
        result.getClients(function (err, clients) {
            response.send(clients);
        });
    });
});

router.get('/:_id/users', function (request, response) {
    var _id = request.params["_id"];
    request.models.organization.one({id: _id}, function(err, result) {
        result.getUsers(function (err, clients) {
            response.send(clients);
        });
    });
});

module.exports = router;