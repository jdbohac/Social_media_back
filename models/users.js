const mongoose = require("mongoose");

const Users = new mongoose.Schema(
{
  user_name: String,
  password: String,
  image: String,
  bio: String,
  skills: [String]
}
);

const userSchema = mongoose.model("Users", Users);
module.exports = userSchema;
