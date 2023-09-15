const Task = require("../models/modal");
//CREATE
exports.createTask = async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      completed: false,
    });
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
};
//READ
exports.showTasks = async (req, res) => {
  try {
    const todos = await Task.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Error fetching todos" });
  }
};
//UPDATE
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        title: req.body.title ? req.body.title : "No Title Added",
        description: req.body.description
          ? req.body.description
          : "No Description Added",
      },

      {
        new: true, //RETURN NEW VALUE
      }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
};

//DELETE
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndRemove(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
};

exports.completeTask = async (req, res) => {
  const id = req.params.id;
  try {
    const taskToUpdate = await Task.findById(id);
    if (!taskToUpdate) {
      return res.status(404).json({ error: "Task not found" });
    }
    taskToUpdate.completed = !taskToUpdate.completed;
    await taskToUpdate.save();
    const updatedTask = taskToUpdate.toObject();
    res.json({ task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal server error : " + error.message });
  }
};
