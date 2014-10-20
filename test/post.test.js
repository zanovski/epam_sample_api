/**
 * Created by Aliaksandr_Zanouski on 10/20/2014.
 */
var should = require('should');
var mongoose = require('mongoose');
var sa = require('superagent');
require('../database');

describe('REST API', function() {

    describe('Data base model', function(done) {
        var Post = mongoose.model('Post');
        var id;
        it('create new Post in database', function(done) {
            Post.create({title: 'TEST', body: 'TEST', author: 'TEST'}, function(err, post) {
                if(err) {
                    done(err);
                }else{
                    id = post._id;
                    post.title.should.equal('TEST');
                    post.should.have.property('_id');
                    done();
                }
            });
        });
        after(function(done) {
            Post.findByIdAndRemove(id, done);
        });
    });

    describe('CRUD', function() {
        var host = 'http://localhost:3000';
        var id;

        it('Should get all posts', function(done) {
            sa
                .get(host + '/post')
                .end(function(err, res) {
                if(err) {
                    done(err);
                }else{
                    var posts = JSON.parse(res.text);
                    var post = posts[0];
                    id = post._id;
                    posts.length.should.be.ok;
                    (typeof post).should.equal('object');
                    post.should.have.property('title');
                    post.should.have.property('body');
                    done();
                }
            })
        });

        it('Should get one post by id', function(done) {
            sa
                .get(host + '/post/' + id)
                .end(function(err, res) {
                if(err) {
                    done(err);
                }else{
                    var post = JSON.parse(res.text);
                    (typeof post).should.equal('object');
                    post.should.have.property('title');
                    post.should.have.property('body');
                    post.should.have.property('date');
                    post.should.have.property('author');
                    done();
                }
            });
        });

        it('Should create post in database', function(done) {
            sa
                .post(host + '/post')
                .send({ title: 'TEST', body: 'TEST', author: 'TEST'})
                .set('Content-Type', 'application/json')
                .end(function(err, res) {
                    if(err) {
                        done(err);
                    }else{
                        var post = JSON.parse(res.text);
                        id = post._id;
                        post.title.should.equal('TEST');
                        done();
                    }
                });
        });

        it('Should update post in data base', function(done) {
            sa
                .put(host + '/post/' + id)
                .send({
                    title: 'UPDATED TITLE',
                    body: 'UPDATED BODY',
                    author: 'UPDATED AUTHOR',
                    image: 'UPDATED IMAGE'
                })
                .set('Content-Type', 'application/json')
                .end(function(err, res) {
                    if(err) {
                        done(err);
                    }else{
                        var post = JSON.parse(res.text);
                        post.title.should.equal('UPDATED TITLE');
                        post.body.should.equal('UPDATED BODY');
                        post.author.should.equal('UPDATED AUTHOR');
                        done();
                    }
                });
        });

        it('Should delete post from data base', function(done) {
            sa
                .del(host + '/post/' + id)
                .end(function(err, res) {
                    if(err) {
                        done(err);
                    }else{
                        res.status.should.equal(200);
                        done();
                    }
                })
        });
    });
});