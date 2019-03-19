var Campground = require("../models/campground");
var Comment = require("../models/comment");
var Review = require("../models/review");
// all the middleware goes here 
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
  if(req.isAuthenticated()){
        //if they are logged in, we're going to find their campground
     Campground.findById(req.params.id, function(err, foundCampground){
         if(err || !foundCampground){
                req.flash("error", "Campground not found")
                res.redirect("back");
          } else {
                // if user is loggedIn, does user own the campground? Check the author.id and user.id
                // compare mongoose ObjectId & String
                if(foundCampground.author.id.equals(req.user.id) || req.user.isAdmin) {
                    next();
                    //if they don't own it redirect back
                } else {
                 req.flash("error", "You don't have permisson to do that")
                 res.redirect("back");
               }
             }
          });
      } else {
            req.flash("error", "you need to be loggedin to do that")
            res.redirect('back');
      }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    // is user logged in 
   if(req.isAuthenticated()){
        //if they are logged in, we're going to find their campground
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
                // if user is loggedIn, does user own the comment? Check the author.id and user.id
                // compare mongoose ObjectId & String
                if(foundComment.author.id.equals(req.user.id) || req.user.isAdmin) {
                    next();
                    //if they don't own it redirect back
            } else {
                 req.flash("error", "you dont have permisson");
                 res.redirect("back");
               }
             }
          });
       } else {
            req.flash("error", "you need to be loggedin to do that")
            res.redirect('back');
        }
}

//middleware function defined to check if user is loggedin or not 
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
     }
     req.flash("error", "you need to be logged in to do that");
     res.redirect("/login");
}


middlewareObj.checkReviewOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Review.findById(req.params.review_id, function(err, foundReview){
            if(err || !foundReview){
                res.redirect("back");
            }  else {
                // does user own the comment?
                if(foundReview.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

//hecks if the user already reviewed the campground and disallows further actions if they did.
middlewareObj.checkReviewExistence = function (req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id).populate("reviews").exec(function (err, foundCampground) {
            if (err || !foundCampground) {
                req.flash("error", "Campground not found.");
                res.redirect("back");
            } else {
                // check if req.user._id exists in foundCampground.reviews
                var foundUserReview = foundCampground.reviews.some(function (review) {
                    return review.author.id.equals(req.user._id);
                });
                if (foundUserReview) {
                    req.flash("error", "You already wrote a review.");
                    return res.redirect("back");
                }
                // if the review was not found, go to the next middleware
                next();
            }
        });
    } else {
        req.flash("error", "You need to login first.");
        res.redirect("back");
    }
};

module.exports = middlewareObj