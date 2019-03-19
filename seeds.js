var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
         name:"Cloud Rest", 
         image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRno0DQ52teRZNVHloMUyGQ_3_7b_keLgjh90x6_2XG1QdWYOAogA",
         description:"orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.!", 
         location: "London", 
         rating: 2
    },
    {
         name:"The Camp Heaven", 
         image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy7KkDeRfHX0XEhquvjR3vrY-Z2dmIZDzPDenI_FwyEcQyO942",
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.!",
         location: "Wales, UK", 
         rating: 5
    }, 
    {
         name:"Mountain Morning", 
         image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIvldRPYPyIAliIjuFO48KGi4l0_OqjqdwFPQYxgkJPYp-quPqyQ",
         description:"Blah 2orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.!",
         location: "Washington",
         rating: 1
   },
   {
         name:"Everest Base Camp", 
         image:"https://www.rei.com/adventures/assets/adventures/images/trip/gallery/asia/ebc_07",
         description:"Blah 2orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.!",  
         location: "Grand Canyon", 
         rating: 4
   },
   {     
         name:"Scotland Camping", 
         image:"https://assets.bedful.com/images/b34ea8dc1faabe5d98998e77e4ffc430911e39e9/large.jpg",
         description:"Blah 2orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.!",  
         location: "Scotland",
         rating: 5
   }, 
   {
         name:"Cloud Rest", 
         image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRno0DQ52teRZNVHloMUyGQ_3_7b_keLgjh90x6_2XG1QdWYOAogA",
         description:"orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.!", 
         location: "London", 
         rating: 2
    },
     {
         name:"Mountain Morning", 
         image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIvldRPYPyIAliIjuFO48KGi4l0_OqjqdwFPQYxgkJPYp-quPqyQ",
         description:"Blah 2orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.!",
         location: "Washington",
         rating: 1
   },
   {
         name:"The Camp Heaven", 
         image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy7KkDeRfHX0XEhquvjR3vrY-Z2dmIZDzPDenI_FwyEcQyO942",
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.!",
         location: "Wales, UK", 
         rating: 5
    }, 
    {
         name:"The Lodge", 
         image:"https://media.wired.com/photos/599b4cfd4fa6fc733c11e30d/master/pass/iStock-820873602.jpg",
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.!",
         location: "Dover, UK", 
         rating: 2
    }
];

function seedDB(){
      //Remove all campgrounds
      Campground.deleteMany({}, function(err){
        if(err){
            console.log("ERROR");
        } else{
        console.log("removed campgrounds");
        //add camprgounds
        data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else{
                    console.log("added a campground");
                    //create a comment
                    Comment.create({
                        text: "This place is great but wish there was internet",
                        author: "Homer"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        } else { 
                            campground.comments.push(comment);
                            campground.save();
                            console.log("create new comment");
                        }
                    });
                }
             });
         });
      }
   });  
    //add few comments
}

//export function seedDB to app.js
module.exports = seedDB;
