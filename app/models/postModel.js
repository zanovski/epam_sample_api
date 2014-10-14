/**
 * Created by Aliaksandr_Zanouski on 10/14/2014.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var postSchema = new Schema({
    title: String,
    body: String,
    date: {type: Date, default: Date.now()},
    author: String,
    image: String
});

mongoose.model('Post', postSchema);