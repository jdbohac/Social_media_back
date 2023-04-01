require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = express();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require('../models/users.js')
router.use(cors());
router.use(express());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.post("/register", async (req, res)=>{
  const user = req.body

  // checking if username has been taken by another user already
  const takenUsername = await User.findOne({username: user.username})
  
  if (takenUsername){
    return res.json({message: "Username has been already taken"})
  }else {
    console.log(req.body.password)
    user.password = await bcrypt.hash(req.body.password, 10)

    const dbUser = new User({
      name: user.name,
      username: user.username,
      password: user.password, 
      image: user.image,
      bio: user.bio,
    })


    dbUser.save()
    .then(() => console.log('Saved successfully'))
    .catch((err) => console.log(err));
    res.json({message: "Success"})
  }
})

router.post("/login", (req, res)=>{
  const userLoggingIn = req.body
  testUser = User.findOne({username: userLoggingIn.username})
  // test = bcrypt.hash(testUser.password, 10)
  User.findOne({username: userLoggingIn.username}).then(dbUser => {
    if (!dbUser){
      return res.json({
        message: "Invalid Username or Password"
      })
    }    
    console.log(userLoggingIn.password)
    console.log(dbUser.password)
  
    bcrypt.compare(userLoggingIn.password, dbUser.password).then(isCorrect =>{
      if (isCorrect){
        const payload = {
          id: dbUser._id,
          username: dbUser.username,
        }
        jwt.sign(
          // payload is the info that we get when we decode the jwt later
          payload,
          process.env.JWT_SECRET,
          // equivalent to one day
          {expiresIn: 86400}, 
          (err, token) =>{
            if (err) {
              console.log(process.env.JWT_SECRET)
              return res.status(500).json({
                message: "Error signing token",
                error: err
              });
            }
            return res.json({
              message: "Success",
              token: "Bearer " + token
            })
          }
        )
      } else {
        return res.status(401).json({
          message: "Authentication failed"
        })
      }
    })
  })
})

function verifyJWT(req, res, next){
  const token = req.headers["x-access-token"]?.split(' ')[1]

  if(token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
      if (err) return res.json({
        isLoggedIn: false,
        message: "Failed to Authenticate"
      })
      req.user = {}
      req.user.id = decoded.id
      req.user.username = decoded.username
      next()
    })
  }else {
    res.json({message: "Incorrect Token Given", isLoggedIn: false})
  }
}

router.get("/getUsername", verifyJWT, (req, res)=>{
  res.json({isLoggedIn: true, username: req.user.username})
})

// =============== regular user routes for CRUD=================//

router.get("/user", (req, res) => {
  User.find({}).then((foundUser) => {
    res.json(foundUser);
  });
});

router.delete("/user/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id).then((deletdUser) => {
    res.json(deletdUser);
  });
});

router.put("/user/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body).then((updatedUser) => {
    res.json(updatedUser);
  });
});

module.exports = router;



