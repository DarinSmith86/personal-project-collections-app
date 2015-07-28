var express = require('express');
var router = express.Router();


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', function (req, res, next) {
    gifs.find({}, function (err, docs) {
        res.render('index', {gifs: docs});
    })
});

router.post('/', function (req, res, next) {
    gifs.insert(req.body);
    res.redirect('/gifs');
  });

module.exports = router;
