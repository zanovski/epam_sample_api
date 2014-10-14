/**
 * Created by Aliaksandr_Zanouski on 10/7/2014.
 */
var mongoose = require('mongoose');
var fs = require('fs');

mongoose.connect('mongodb://root:root@ds063859.mongolab.com:63859/sample_blog');
mongoose.set('debug', true);

fs.readdirSync('./app/models').forEach(function(fileName) {
    require(__dirname + '/app/models/' + fileName);
});