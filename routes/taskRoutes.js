const express = require("express");
const router = express.Router();
const taskController = require("../Controllers/taskController");

router.post("/todos", taskController.createTask);
router.get("/todos/getTasks", taskController.showTasks);
router.put("/todos/updateTasks/:id", taskController.updateTask);
router.patch("/todos/completed/:id", taskController.completeTask);
router.delete("/todos/deleteTasks/:id", taskController.deleteTask);

module.exports = router;
