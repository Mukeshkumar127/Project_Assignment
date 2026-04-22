const Task = require("../models/Task");

exports.create = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    user: req.user.id
  });
  res.json(task);
};

// exports.getAll = async (req, res) => {
//   const tasks = await Task.find({ user: req.user.id });
//   res.json(tasks);
// };

exports.getAll = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find().populate("user", "email");
    } else {
      tasks = await Task.find({ user: req.user.id });
    }

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
};

// exports.delete = async (req, res) => {
//   await Task.findByIdAndDelete(req.params.id);
//   res.json({ msg: "Deleted" });
// };

exports.delete = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (req.user.role === "admin" || task.user.toString() === req.user.id) {
      await task.deleteOne();
      return res.json({ msg: "Deleted" });
    }

    res.status(403).json({ msg: "Not allowed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};