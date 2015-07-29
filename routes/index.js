require('dotenv').load();
var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var posts = db.get('posts');
var spotify = require('spotify');


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

router.post('/coverSearch', function(req,res,next){
  spotify.search({ type: 'track', query: req.body.albumCover}, function(err, data) {
      if ( err ) {
          console.log('Error occurred: ' + err);
          return;
      }

      // Do something with 'data'
      // console.log(data.tracks.items);
      // console.log(data.tracks.items[0].album.images[0].url);
      res.render('new', {albumCover: data.tracks.items[0].album.images[0].url, albumCover2: data.tracks.items[1].album.images[0].url,albumCover3: data.tracks.items[2].album.images[0].url})
  });

})

router.get('/show/:id', function(req,res, next){
  posts.findOne({_id: req.params.id}, function(err,docs){
    console.log(docs);
    res.render('show', docs);
  })
})

router.post('/posts/:id/delete', function(req,res,next){
  posts.remove({_id: req.params.id}, function(err,doc){
    if(err) console.log(err);
    res.redirect('/');
  })
})

//   var spotify = require('spotify');
//
// spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
//     if ( err ) {
//         console.log('Error occurred: ' + err);
//         return;
//     }
//
//     // Do something with 'data'
//     console.log(data.tracks.items);
// });



module.exports = router;
