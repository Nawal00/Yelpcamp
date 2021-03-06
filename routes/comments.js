//express router
var express = require("express");
var router  = express.Router({mergeParams: true}); //merges params id between campground and comments
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// COMMENTS ROUTE - new 
router.get('/new', middleware.isLoggedIn, function(req, res){
     // find campground by id
     console.log(req.params.id);
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else {
            res.render("comments/new.ejs", {campground: campground});
        }
    });
});

//COMMENTS CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           req.flash('err', 'Something went wrong!');
           res.redirect("/campgrounds");
       }else {
          //create new comments 
          Comment.create(req.body.comment, function(err, comment){
              if(err){
                  console.log(err); 
              }else {
                  // add username & id to comment 
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  //save comment
                  comment.save();
                  //connect new comment to campground
                  campground.comments.push(comment);
                  campground.save();
                  console.log(comment);
                  //redirect campground show page
                  req.flash("success", "successfully added comment")
                  res.redirect("/campgrounds/" + campground._id);
              }
          });
       }
   });
});

// COMMENTS EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "No campground found");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment){
             if(err){
                res.redirect("back");
             } else {
                res.render("comments/edit.ejs", {campground_id: req.params.id, comment: foundComment});
             }
        });
    });
});

//COMMENTS UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComments){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" + req.params.id)
        }
    });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else{
            req.flash("sucess", "Comment deleted")
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


module.exports = router;
