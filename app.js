// set up ======================================================================

/**********
The second way is to update your main file to add the agent declaration var as_agent = require('bluemix-autoscaling-agent');
Note: bluemix-autoscaling-agent must be initialized prior to the npm modules you want to monitor, so you must call require('bluemix-autoscaling-agent'); prior to the other require statements.
The following code snippet shows a complete entry js file with the auto-scaling agent declaration.
**********/
var agent = require('bluemix-autoscaling-agent');

var express = require('express');
var cfenv = require('cfenv');
var favicon = require('serve-favicon');
var app = express();
var bodyParser = require('body-parser');

// load local VCAP configuration
var vcapLocal = null
try {
  vcapLocal = require("./vcap-local.json");
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) {
  console.error(e);
}

var appEnvOpts = vcapLocal ? {
  vcap: vcapLocal
} : {}
var appEnv = cfenv.getAppEnv(appEnvOpts);

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json()); // parse application/json

require("./app/database.js")(appEnv, "todo-cloudant", "todos", function (err, database) {
  if (err) {
    console.log(err);
  } else {
    // database is initialized, install our CRUD route for Todo objects
    require('./app/todos.js')(app, database);
  }
});

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(favicon(__dirname + '/public/icons/favicon.ico'));

// start server on the specified port and binding host
app.listen(appEnv.port, "0.0.0.0", function () {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
