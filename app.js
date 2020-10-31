var express = require('express');
var bodyParser = require('body-parser');
var stmvcController = require('./controllers/stmvcController');

var app = express();

app.use(bodyParser.json());

//set up template
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controller
stmvcController(app);

//listen to port
app.listen(process.env.PORT || 3030);
console.log('you are listening to port 3030');
