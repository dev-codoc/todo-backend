"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const todoController_1 = require("../controllers/todoController");
const router = express_1.default.Router();
router.use(authMiddleware_1.protect);
router.route('/').post(todoController_1.createTodo).get(todoController_1.getTodos);
router.route('/:id').put(todoController_1.updateTodo).delete(todoController_1.deleteTodo);
router.patch('/:id/toggle', todoController_1.toggleTodo);
exports.default = router;
