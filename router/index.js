/**
 * Created by Aliaksandr_Zanouski on 10/14/2014.
 */
var postAPI = require('./postApiRouter');

module.exports = function(app) {
    app.use('/post', postAPI);
};