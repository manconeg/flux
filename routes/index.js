var express = require('express');
var router = express();

router.get('/', function (request, response) {
  response.send({
    organizations: '/organizations',

    clients: '/organizations/:id/clients',
    client: '/clients/:id',
    clientTasks: '/clients/:id/tasks',

    users: '/organizations/:id/users',
    user: '/users/:id',
    userTasks: '/user/:id/tasks',

    tasks: '/tasks/:id'
  });
});

module.exports = router;