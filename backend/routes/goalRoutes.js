import express from 'express';
import { getAllGoals, deleteGoal, updateGoal, createGoal } from '../controllers/goalController.js';
import protectAuth from "../middleware/authMiddleware.js"


const router = express.Router();

router.route('/')
    .post(protectAuth, createGoal)
    .get(protectAuth, getAllGoals)

router.route('/:id')
    .put(protectAuth, updateGoal)
    .delete(protectAuth, deleteGoal)

export default router