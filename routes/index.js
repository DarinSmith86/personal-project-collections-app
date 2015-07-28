require('dotenv').load();
var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var posts = db.get('posts');


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', function (req, res, next) {
    posts.find({}, function (err, docs) {
        res.render('index', {posts: docs});
    })
});


router.post('/', function (req, res, next) {
    posts.insert(req.body);
    res.redirect('/');
  });

  router.get('/new', function (req, res, next) {
      res.render('new');
    });

  router.post('/new', function (req, res, next) {
    posts.insert(req.body);
    res.redirect('/');
  })



module.exports = router;
