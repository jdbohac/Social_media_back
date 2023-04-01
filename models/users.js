const mongoose = require("mongoose");

const Users = new mongoose.Schema(
{
  name: {type: String},
  username: {type: String, required: true},
  password: {type: String, required: true},
  image: String,
  bio: String,
  skills: [String],
}, {timestamps: true}
);

const userSchema = mongoose.model("Users", Users);
module.exports = userSchema;
