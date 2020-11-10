var express = require('express')
var createError = require('http-errors');
var path = require('path');
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var router = express.Router()
const PORT = process.env.PORT || 3000;


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://host:NGNxDF1XwElvEQ0c@cluster0.gbvl6.mongodb.net/regional1?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true });


app.use('/', router);
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get('/api/hello', (req, res) => {
  res.json('hello world')
})

router.get('/query',  (req, res) => {
  let result;
  client.connect(err => {

    const collection = client.db("regional1").collection("stage1");

    var query = {name:'Bacon'};

    collection.find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
    });

    client.close();
  });
  res.status(200).send("yes")

})




app.post('/lookup', function(req,res) {

  client.connect(err => {

    const collection = client.db("regional1").collection("stage1");

    var query = {name:req.body.name};;

    collection.find(query).toArray(function(err, result) {
      if (err) throw err;
      else res.json(result)
    });

    client.close();
  });

})



app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = router;
