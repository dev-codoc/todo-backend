import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { createTodo, getTodos, updateTodo, deleteTodo, toggleTodo } from '../controllers/todoController';

const router = express.Router();

router.use(protect);

router.route('/').post(createTodo).get(getTodos);
router.route('/:id').put(updateTodo).delete(deleteTodo);
router.patch('/:id/toggle', toggleTodo);

export default router;