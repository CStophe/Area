var express = require('express');
const bodyParser = require("body-parser");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var firebase = require("firebase-admin");
const cors = require('cors');
const mysql = require('mysql');

var app = express();

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_ROOT_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

db.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

var serviceAccount = require("./serviceAccountKey.json");

require('./about')(app);

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://area-firebase.firebaseio.com"
});

var auth = firebase.auth();

//var weather = require('events');
//var eventEmitter = new events.EventEmitter();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  db.query("select * from services", (err, results) => {
    if (err)
      return res.send(err);
    else
      return res.send(results);
  });
});

//require('./auth')(app, auth);

require("./routes/services.routes")(app, db);

require('./apiWrappers')(app, db);

module.exports = app;
