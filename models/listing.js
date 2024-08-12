const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { required } = require("joi");
const { coordinates } = require("@maptiler/client");
const mapToken = process.env.MAP_TOKEN;

const listingSchema = new Schema({
    title: {
        type : String,
        required : true,
        trim:true,
       // minlength:1, 
    },
    description:{
        type : String,
        reqired :true,
        trim : true,
       // minlength:1     
    },
    image: {  
        url:String,
        filename:String,
    },    
    price:Number,
    location:{
        type : String,
        required : true,
        trim:true,
       // minlength:1
    },
    country:{
        type : String,
        required : true,
        trim:true,
       // minlength:1
    },
    reviews : [
        {
           type : Schema.Types.ObjectId,
           ref : "Review",
        },
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry:{
        type:{
            type:String,
            enum:["Point"],
            required:true
        },
        coordinates:{
            type:[Number],
            required:true,
        }
    }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}})
    }
})


const Listing = mongoose.model("Listing",listingSchema );
module.exports = Listing;