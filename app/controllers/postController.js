/**
 * Created by Aliaksandr_Zanouski on 10/14/2014.
 */
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

exports.getPosts = function(req, res, next) {
    Post.find({}, function(err, posts) {
        if(err) {
            next(err);
        }else{
            res.json(posts);
        }
    })
};

exports.createNewPost = function(req, res, next) {
    Post.create(req.body, function(err, post) {
        if(err) {
            next(err);
        }else{
            res.status(201).json(post);
        }
    });
};

exports.updatePost = function(req, res, next) {
    var newPost = {};
    newPost.title = req.body.title;
    newPost.body = req.body.body;
    newPost.author = req.body.author;
    newPost.image = req.body.image;
    Post.findByIdAndUpdate(req.params.id, newPost, function(err, post) {
        if(err) {
            next(err);
        }else{
            res.json(post);
        }
    });
};

exports.deletePost = function(req, res, next) {
    Post.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            next(err);
        }else {
            res.end();
        }
    });
};

exports.getById = function(req, res, next) {
    Post.findById(req.params.id, function(err, post) {
        if(err) {
            next(err);
        }else {
            res.json(post);
        }
    });
};
