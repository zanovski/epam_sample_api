/**
 * Created by Aliaksandr_Zanouski on 10/14/2014.
 */
module.exports = function() {
    return function(req, res, next) {
        res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.set('Access-Control-Allow-Origin', '*');

        next();
    };
};