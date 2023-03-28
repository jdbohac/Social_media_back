const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = express();
const Users = require('../models/users.js')
router.use(cors());
router.use(express());
router.use(express.json());


router.get("/", (req, res) => {
  Users.find({}).then((foundUser) => {
    res.send(foundUser);
  });
});

router.post("/", (req, res) => {
  console.log(req.body);
  Users.create(req.body).then((createdUser) => {
    res.json(createdUser);
  });
});

router.delete("/:id", (req, res) => {
  Users.findByIdAndRemove(req.params.id).then((deletedUser) => {
    res.json(deletedUser);
  });
});

router.put("/:id", (req, res) => {
  Users.findByIdAndUpdate(req.params.id, req.body).then((updatedUser) => {
    res.json(updatedUser);
  });
});


module.exports = router;
