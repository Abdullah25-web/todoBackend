var express = require("express");
var router = express.Router();

const Task = require("../models/modal");
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/api/tasks", async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
    });
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
});

module.exports = router;
