var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//connect DB
mongoose.connect('mongodb://group10:12345678@ds211588.mlab.com:11588/stmvc');

//create a schema
var stmvcSchema = new mongoose.Schema({
    latitude: String,
    longitude: String,
    speed: String
});

var Stmvc = mongoose.model('Stmvc', stmvcSchema);

module.exports = function (app) {
    // load index page
    app.get('/', urlencodedParser, function (req, res) {
        res.render('index');
    });
    // load login page
    app.get('/login', urlencodedParser, function (req, res) {
        res.render('login-registration');
    });
    // rout for gprs data
    app.post('/gprs/:lat/:lon/:speed', urlencodedParser, function (req, res) {
        data = {
            "latitude": req.params.lat,
            "longitude": req.params.lon,
            "speed": req.params.speed
        };
        Stmvc(data).save(function (err) {
            if (err) throw err;
            console.log('item saved');
        });
        res.redirect('/dashboard');
        if (!req.body) return res.sendStatus(400);
        //res.send(data);
        console.log(data);
    });

    app.delete('/dashboard', function (req, res) {

    });

    app.put('/dashboard', function (req, res) {

    });

};