/**
 * Created by Aliaksandr_Zanouski on 10/14/2014.
 */
var express = require('express');
var postCtrl = require('../app/controllers/postController');
var router = express.Router();

module.exports = router;

router.get('/', postCtrl.getPosts);
router.get('/:id', postCtrl.getById);
router.post('/', postCtrl.createNewPost);
router.put('/:id', postCtrl.updatePost);
router.delete('/:id', postCtrl.deletePost);