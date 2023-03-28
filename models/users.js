const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = new Schema({
  user_name: String,
  password: String,
  image: String,
  bio: String,
  skills: String
});

const userSchema = mongoose.model("Users", Users);
module.exports = userSchema;
