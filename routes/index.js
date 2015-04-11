var express = require('express');
var router = express();

router.get('/', function (request, response) {
  response.send({
    organizations: '/organizations',
    clients: '/organizations/:id/clients',
    tasks: '/organizations/:id/clients/tasks',
    users: '/organizations/:id/users',
    userTasks: '/organizations/:id/users/tasks'
  });
});

module.exports = router;