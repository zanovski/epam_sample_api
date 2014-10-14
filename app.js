/**
 * Created by Aliaksandr_Zanouski on 10/7/2014.
 */
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('./middlewares/CORS');
require('./database');

var app = express();

app.set('PORT', process.env.PORT || 3000);
app.set('env', process.env.NODE_ENV || process.argv[2] || 'production');
app.use(cors());
app.use(bodyParser.json());

app.listen(app.get('PORT'), function() {
    console.log('Server started on port: ' + app.get('PORT') + ' in mode: ' + app.get('env'));
});

require('./router')(app);

// error handling
if(app.get('env') === 'production') {
    //404
    app.use(function(req, res) {
        res.status(404).end();
    });
    //500
    app.use(function(err, req, res, next) {
        res.status(500).end();
    });
}else{
    app.use(require('errorhandler')());
}

process.on('uncaughtException', function(err) {
    console.log('>>>>> uncaughtException >>>>>>');
    console.log(err);
    console.log('>>>>> uncaughtException >>>>>>');
});