const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Posts = new Schema(
   {
    date:String,
    likes:Number,
    image:[String],
    tags:[String],
    text:String
  } 
);

const postSchema = mongoose.model("Posts", Posts)
module.exports = postSchema