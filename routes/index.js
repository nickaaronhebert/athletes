var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Athlete = mongoose.model('Athlete');

router.get('/athletes', function(req, res, next) {
  Athlete.find(function(err, athletes){
    if(err){ return next(err); }
    res.json(athletes);
  });
});

router.post('/athletes', function(req, res, next) {
  var athlete = new Athlete(req.body);
  athlete.save(function(err, athlete){
    if(err){ return next(err); }
    res.json(athlete);
  });
});

router.param('athlete', function(req, res, next, id) {
  var query = Athlete.findById(id);
  query.exec(function (err, athlete){
    if (err) { return next(err); }
    if (!athlete) { return next(new Error("can't find athlete")); }
    req.athlete = athlete;
    return next();
  });
});

router.put('/athletes/:athlete/upvote', function(req, res, next) {
  req.athlete.upvote(function(err, athlete){
    if (err) { return next(err); }
    res.json(athlete);
  });
});

router.put('/athletes/:athlete/upwin', function(req, res, next) {
  req.athlete.upwin(function(err, athlete){
    if (err) { return next(err); }
    res.json(athlete);
  });
});

router.put('/athletes/:athlete/uploss', function(req, res, next) {
  req.athlete.uploss(function(err, athlete){
    if (err) { return next(err); }
    res.json(athlete);
  });
});



module.exports = router;
