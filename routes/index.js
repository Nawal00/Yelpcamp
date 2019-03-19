var express  = require("express");
var router   = express.Router();
var passport = require("passport");
var User     = require("../models/user");
var Campground = require("../models/campground");

////// CAMPGROUND ROUTES \\\\\\
router.get("/", function(req, res){
   res.render("landing.ejs");
});


////// AUTH ROUTES \\\\\\

router.get("/register", function(req, res){
    res.render("register.ejs", {page: "register"});
});

// //handling user signup
// router.post("/register", function(req, res){
//     var newUser = new User({username: req.body.username});
//     User.register(newUser, req.body.password, function(err, user){
//         if(err){ 
//             console.log(err);
//             req.flash("error", err.message);
//             return res.render('register.ejs');
//         }
//         passport.authenticate("local")(req, res, function(){
//             req.flash("success", "Welcome to YelpCamp " + user.username)
//             res.redirect("/campgrounds");
//         });
//     });
// });

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({
        username: req.body.username, 
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
        email: req.body.email, 
        avatar: req.body.avatar
        });
        
    if(req.body.adminCode === "admincode1"){
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
//after the user is created, log the user in, store the info in session, use the serialize method and we are specify we are using local strategy
        passport.authenticate("local")(req, res, function(){
          req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
          res.redirect("/campgrounds"); 
        });
    });
});

// SHOW LOG IN FORM - ROUTES 
router.get("/login", function(req, res){
    res.render("login.ejs", {page: "register"});
});

//LONGIN LOGIC
//middleware - code that runs before final code - sit bettwen begining and end of the route
router.post("/login", passport.authenticate("local", 
  {
        successRedirect: "/campgrounds", 
        failureRedirect: "/login"
  }),   function(req, res){
});

//LOGOUT route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/campgrounds");
});

//USER profiles 
router.get("/users/:id", function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err) {
            req.flash("error", "Something went wrong");
            res.redirect("/");
        } 
        Campground.find().where("author.id").equals(foundUser._id).exec(function(err,campgrounds){
          if(err) {
             req.flash("error", "Something went wrong");
             res.redirect("/"); 
            }
            res.render("user/show.ejs", {user: foundUser, campgrounds: campgrounds});
        });
    });
});

module.exports = router;