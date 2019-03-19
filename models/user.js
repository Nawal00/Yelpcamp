var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose"); //package

var UserSchema= new mongoose.Schema({
    name: String, 
    password: String, 
    avatar: String, 
    firstName: String, 
    lastName: String, 
    email: String, 
    isAdmin: {type: Boolean, default: false}
});

// gives user model pre-made methods that passport-local-mongoose has available 
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);