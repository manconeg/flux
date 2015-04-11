var express = require('express');
var router = express();

router.get('/', function (request, response) {
  response.send({
    organizations: '/organizations',
    organizationClients: '/organizations/:id/clients',
    organizationUsers: '/organizations/:id/users',

    clients: '/clients/:id',
    clientTasks: '/clients/:id/tasks',

    user: '/users/:id',
    userTasks: '/user/:id/tasks',

    projects: '/projects/:id',
    projectTasks: '/projects/:id/tasks',

    tasks: '/tasks/:id'
  });
});

module.exports = router;