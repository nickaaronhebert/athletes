var mongoose = require('mongoose');
var AthleteSchema = new mongoose.Schema({
  firstName: {type:String, default: ""},
  lastName: {type:String, default: ""},
  team: {type:String, default: ""},
  imgURL: {type:String, default: ""},
  wins: {type: Number, default: 0},
  losses: {type: Number, default: 0},
  upvotes: {type: Number, default: 0},
});
AthleteSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};
AthleteSchema.methods.upwin = function(cb) {
  this.wins += 1;
  this.save(cb);
};
AthleteSchema.methods.uploss = function(cb) {
  this.losses += 1;
  this.save(cb);
};
mongoose.model('Athlete', AthleteSchema);