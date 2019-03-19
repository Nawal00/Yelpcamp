require('dotenv').config();

var express               = require("express"),
    app                   = express(),
    mongoose              = require("mongoose"),
    flash                 = require("connect-flash"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    LocalStrategy         = require("passport-local"),
    methodOverride        = require("method-override"),
    passportLocalMongoose = require("passport-local-mongoose"),
    Campground            = require("./models/campground"),
    Comment               = require("./models/comment"),
    seedDB                = require("./seeds")

//requiring routes
var commentRoutes     = require("./routes/comments"),
    reviewRoutes      = require("./routes/reviews"),
    campgroundRoutes  = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index")

mongoose.connect("mongodb://localhost/yelp_camp_v11", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method")); 
app.use(flash());
seedDB();

// create a session (ID/Object) for every user unencode or decode the session
// middleware configuration with Express so our web server can use passport
app.use(require("express-session")({ 
    secret: "Rusty is the best and the cutest dog in the world",
    resave: false, 
    saveUninitialized: false
}));

app.locals.moment = require('moment'),
//need to use these 2 lines any time we use passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to pass currentUser/req.user to every route/flash message
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});



//// Routes & shorter route decloration for /comments & campground \\\\\
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started....");
});