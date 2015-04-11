var express = require('express');
var orm = require('orm');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(orm.express(process.env.DATABASE_URL, {
  define: function (db, models, next) {
    models.organization = db.define("organizations", {
      id: Number,
      name: String
    });




    models.client = db.define("clients", {
      id: Number,
      name: String
    });
    models.client.hasOne('organization', models.organization, { reverse: "clients" });




    models.user = db.define("users", {
      id: Number,
      name: String,
      email: String
    });
    models.user.hasOne('organization', models.organization, { reverse: "users" });




    models.task = db.define("tasks", {
      id: {type: 'number', key: true},
      name: String,
      description: String,
      timeAllocated: {type: 'number', mapsTo: 'time_allocated'},
      timeSpent: {type: 'number', mapsTo: 'time_spent'},
      startTime: {type: 'date', mapsTo: 'start_time'}
    }, {
      methods: {
        setStarted: function() {
          this.started = this.startTime !== null;
        },
        getJson: function() {
          this.setStarted();
          return this;
        },
        stop: function() {
          var diff = new Date() - Date.parse(this.startTime);
          this.timeSpent += diff / 1000 / 60 / 60;
          this.startTime = null;
          this.started = false;
        },
        start: function() {
          this.startTime = new Date();
          this.started = true;
        }
      },
      hooks: {
        afterLoad: function (next) {
          this.setStarted();
          return next();
        }
      }
    });
    models.task.hasOne('client', models.client, { reverse: "tasks" });
    models.task.hasOne('user', models.user, { reverse: "tasks" });


    next();
  }
}));

app.use('/', require('./routes/index'));
app.use('/clients', require('./routes/clients'));
app.use('/organizations', require('./routes/organizations'));
app.use('/users', require('./routes/users'));
app.use('/tasks', require('./routes/tasks'));

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
