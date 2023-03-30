
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const bodyParser = require("body-parser")


const app = express();

// using bodyparser middleware to receive form data
const urlencodedParser = bodyParser.urlencoded({extended:false})
app.use(bodyParser.json(), urlencodedParser)

const db = mongoose.connection;
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const postController = require('./controllers/posts-controller.js')
const userController = require('./controllers/users-controller.js')



app.use('/', postController)
app.use('/user', userController)
app.use(cors())
app.use(express());
app.use(express.json())
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


app.listen(PORT, () => console.log("Listening on port:", PORT));
mongoose.connect(MONGODB_URI);
