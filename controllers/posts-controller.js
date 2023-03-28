const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Posts = require("../models/posts.js");
const router = express();
// app.use('/', blogController)
router.use(cors());
router.use(express());
router.use(express.json());

router.get("/", (req, res) => {
  Posts.find({}).then((foundPost) => {
    res.send(foundPost);
  });
});

router.post("/", (req, res) => {
  console.log(req.body);
  Posts.create(req.body).then((createdModel) => {
    res.json(createdModel);
  });
});

router.delete("/:id", (req, res) => {
  Posts.findByIdAndRemove(req.params.id).then((deletedModel) => {
    res.json(deletedModel);
  });
});

router.put("/:id", (req, res) => {
  Posts.findByIdAndUpdate(req.params.id, req.body).then((updatedModel) => {
    res.json(updatedModel);
  });
});

module.exports = router