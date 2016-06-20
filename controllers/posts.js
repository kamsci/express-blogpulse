var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /posts - create a new post
router.post('/', function(req, res) {
  db.post.create({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId
  })
  .then(function(post) {
    res.redirect('/');
  })
  .catch(function(error) {
    // res.status(400).render('main/404');
  });
});

// GET /posts/new - display form for creating new posts
router.get('/new', function(req, res) {
  db.author.findAll()
  .then(function(authors) {
    res.render('posts/new', { authors: authors });
  })
  .catch(function(error) {
    // res.status(400).render('main/404');
  });
});

// GET /posts/:id - display a specific post and its author
router.get('/:id', function(req, res) {
  db.post.find({
    where: { id: req.params.id },
    include: [db.author, db.comment]
  })
  .then(function(post) {
    if (!post) throw Error();
    // res.send(post);
    res.render('posts/show', { post: post });
  })
  .catch(function(error) {
    res.status(404).render('main/404');
  });
});

// GET /posts/comment - display form for creating a new comment
router.post('/:id/comment', function(req, res) {
  // res.send(req.body);
// write new comment to DB
  db.comment.create( {
    content: req.body.userComment,
    firstName: req.body.userCommentFName,
    lastName: req.body.userCommentLName,
    postId: req.params.id
  }).then (function(comment) {
    res.redirect("/posts/" + req.params.id);
  }). catch(function(error) {
    res.status(404).render('main/404');
  });
});

module.exports = router;
