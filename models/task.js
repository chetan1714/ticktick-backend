import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "tt_users", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
}, { timestamps: true, collection: 'tt_tasks' });

const Task = mongoose.model("Task", taskSchema);

export default Task;
