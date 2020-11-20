var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
const expressSession = require('express-session');

app.use(expressSession({
  name: "kmpSessionCookie",
  secret: "express session secret",
  resave: false,
  saveUninitialized: false
}));

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://host:NGNxDF1XwElvEQ0c@cluster0.gbvl6.mongodb.net/Secret?retryWrites=true&w=majority";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const Secret = require("./Secret.js");

const login_data = require('data-store')({ path: process.cwd() + '/public/data/users.json' });


app.post('/login', (req,res) => {

  let user = req.body.username;
  let password = req.body.password;
  let user_data;
  

  const client = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true },{useCreateIndex: true});
  client.connect(err => {
      const collection = client.db("Secret").collection("users");
      collection.find().toArray(function(err, result) {
        user_data = JSON.parse(JSON.stringify(result));
        user_data = user_data.filter(d=> d.username == user)[0]
        if (user_data == null) {
          res.status(404).send("Not found");
          client.close();
          return;
      }
       if (user_data.password == password) {
          req.session.user = user;
          res.json(true);
          client.close();
          return;
      }
      res.status(403).send("Unauthorized"); 
      client.close();
      return;

      });
    });

  
});

app.post('/signup', (req,res) => {

  let user = req.body.username;
  let password = req.body.password;
  let user_data;

  const client = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true },{useCreateIndex: true});
  client.connect(err => {
      const collection = client.db("Secret").collection("users");
      collection.find().toArray(function(err, result) {
        user_data = JSON.parse(JSON.stringify(result));
        user_data = user_data.filter(d=> d.username == user)[0]
       
        console.log(user_data)

        if (user_data === undefined) {
          let myobj = { "username": user, "password": password };

          collection.insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("Added User Successfully");

          });
          
          res.json(true);
          client.close();
          return;

      } else {
        res.status(404).send("Username Taken");
        client.close();
        return;
      }
       

      });
    });

})

app.get('/getLoggedInUser', (req, res) => {
  if (req.session.user == undefined) {
    res.status(403).send("No User Logged In");
    return;
} else {
  res.json(req.session.user);
}
})

app.get('/logout', (req, res) => {
  delete req.session.user;
  res.json(true);
})


app.get('/secret', (req, res) => {
  if (req.session.user == undefined) {
      res.status(403).send("Unauthorized");
      return;
  }

  res.json(Secret.getAllIDsForOwner(req.session.user));
  return;
});

app.get('/secret/:id', (req, res) => {
  if (req.session.user == undefined) {
      res.status(403).send("Unauthorized");
      return;
  }

  let s = Secret.findByID(req.params.id);
  if (s == null) {
      res.status(404).send("Not found");
      return;
  }

  if (s.owner != req.session.user) {
      res.status(403).send("Unauthorized");
      return;
  }

  res.json(s);
} );

app.post('/secret', (req, res)=> {
  if (req.session.user == undefined) {
      res.status(403).send("Unauthorized");
      return;
  }

  let s = Secret.create(req.session.user, req.body.secret);
  if (s == null) {
      res.status(400).send("Bad Request");
      return;
  }
  return res.json(s);
});

app.put('/secret/:id', (req, res) => {
  if (req.session.user == undefined) {
      res.status(403).send("Unauthorized");
      return;
  }

  let s = Secret.findByID(req.params.id);
  if (s == null) {
      res.status(404).send("Not found");
      return;
  }
  if (s.owner != req.session.user) {
      res.status(403).send("Unauthorized");
      return;
  }
  s.update(req.body.secret);

  res.json(s.id);
});

app.delete('/secret/:id', (req, res) => {
  if (req.session.user == undefined) {
      res.status(403).send("Unauthorized");
      return;
  }

  let s = Secret.findByID(req.params.id);
  if (s == null) {
      res.status(404).send("Not found");
      return;
  }

  if (s.owner != req.session.user) {
      res.status(403).send("Unauthorized");
      return;
  }

  s.delete();
  res.json(true);
})

app.use('/', indexRouter);
app.use('/users', usersRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

