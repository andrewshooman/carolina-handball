var express = require('express')
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var router = express.Router()
const PORT = process.env.PORT || 3000;

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://host:NGNxDF1XwElvEQ0c@cluster0.gbvl6.mongodb.net/rl_stats?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true });


app.use('/', router);
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

router.get('/api/hello', (req, res) => {
  res.json('hello world')
})

router.get('/query',  (req, res) => {
  client.connect(err => {

    const collection = client.db("rl_stats").collection("player_stats");

    var query = {name:'Bacon'};

    collection.find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
    });

    client.close();
  });
})

// app.get('/', function (req, res) {
//   res.send('GET request to the homepage')
// })



app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});