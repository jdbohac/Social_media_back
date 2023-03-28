//___________________
//Dependencies
//___________________
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = mongoose.connection;
require("dotenv").config();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const postController = require('./controllers/posts-controller.js')
const userController = require('./controllers/users-controller.js')
app.use('/', postController)
app.use('/user', userController)
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.listen(PORT, () => console.log("Listening on port:", PORT));
mongoose.connect(MONGODB_URI);
