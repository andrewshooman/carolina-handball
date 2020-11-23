var express = require('express');
var router = express.Router();
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
