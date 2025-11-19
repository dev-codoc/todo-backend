"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleTodo = exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const Todo_1 = __importDefault(require("../models/Todo"));
const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        const todo = await Todo_1.default.create({
            user: req.user._id,
            title,
            description
        });
        res.status(201).json(todo);
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.createTodo = createTodo;
const getTodos = async (req, res) => {
    try {
        const todos = await Todo_1.default.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(todos);
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.getTodos = getTodos;
const updateTodo = async (req, res) => {
    try {
        const todo = await Todo_1.default.findOne({ _id: req.params.id, user: req.user._id });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        const updatedTodo = await Todo_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.json(updatedTodo);
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.updateTodo = updateTodo;
const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo_1.default.findOne({ _id: req.params.id, user: req.user._id });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        await Todo_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: 'Todo deleted successfully' });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.deleteTodo = deleteTodo;
const toggleTodo = async (req, res) => {
    try {
        const todo = await Todo_1.default.findOne({ _id: req.params.id, user: req.user._id });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        todo.completed = !todo.completed;
        await todo.save();
        res.json(todo);
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.toggleTodo = toggleTodo;
