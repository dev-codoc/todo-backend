import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Todo from '../models/Todo';

export const createTodo = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description } = req.body;
    const todo = await Todo.create({
      user: req.user._id,
      title,
      description
    });
    res.status(201).json(todo);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getTodos = async (req: AuthRequest, res: Response) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateTodo = async (req: AuthRequest, res: Response) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedTodo);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteTodo = async (req: AuthRequest, res: Response) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const toggleTodo = async (req: AuthRequest, res: Response) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.json(todo);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
