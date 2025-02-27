import mongoose from "mongoose";
import Task from "../models/task.js";
import { connectDB } from "../config/db.js";

export const createTask = async (req, res) => {
  try {
    await connectDB();

    const { title, description, completed } = req.body;

    if (!title || !description || completed === undefined) {
      return res.status(400).json({
        message: "title, description and completed are required",
      });
    }

    const newTask = new Task({
      user: new mongoose.Types.ObjectId(req.user._id), 
      title,
      description,
      completed,
    });

    const task = await newTask.save();
    console.log("Task Created:", task);
    res.status(201).json({task});
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Error creating task" });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    await connectDB();

    const tasks = await Task.find({ user: req.user._id });
    res.status(200).json({tasks});
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    await connectDB();

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const task = await Task.findById(id);

    if (task) {
      res.status(200).json({task});
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ message: "Error fetching task" });
  }
};

export const updateTask = async (req, res) => {
  try {
    await connectDB();

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (updatedTask) {
      res.status(200).json({task: updatedTask});
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Error updating task" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await connectDB();

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    if (deletedTask) {
      res.status(200).json({task: deletedTask}); 
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Error deleting task" });
  }
};
