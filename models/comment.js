var mongoose = require("mongoose");
//Schema SETUP stucture of our data
var commentSchema = new mongoose.Schema({
    text: String,
    createdAt: {type: Date, default: Date.now},
    author: {
        id: { //id is ref to user model id
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model('Comment', commentSchema);

