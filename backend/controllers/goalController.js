import expressAsyncHandler from "express-async-handler"
import Goal from "../models/goalModel.js"


// @desc:       get all goals
// @route:      GET /api/goals
// @access:     Private
export const getAllGoals = expressAsyncHandler(async (req, res) => {

    const goals = await Goal.find()
    try {
        return res.status(200).json({
            message: "You got your goals!",
            goals
        })
    } catch (error) {
        return res.status(403).json({
            message: "Error"
        })
    }
})


// @desc:       create a goal
// @route:      POST /api/goals
// @access:     Private
export const createGoal = expressAsyncHandler(async (req, res) => {
    try {

        const { text, title } = req.body

        const goal = await new Goal({
            text,
            title,
            user: req.user._id
        })

        const doc = await goal.save()
        return res.status(200).json({
            message: "You got your goals!",
            goal: doc,
        })
    } catch (error) {
        return res.status(403).json({
            message: "Error" + error
        })
    }
})


// @desc:       upate a goal
// @route:      PUT /api/goals
// @access:     Private
export const updateGoal = expressAsyncHandler(async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id)

        if (!goal) {
            res.status(400).json({ message: "Can't find a goal" })
            throw new Error("Can't find a goal")
        }

        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            text: req.body.text,
        })

        return res.status(200).json({
            message: `Was updated ${req.params.id}`,
            goal: updatedGoal
        })
    } catch (error) {
        return res.status(403).json({
            message: "Error"
        })
    }
})


// @desc:       delete a goal
// @route:      PUT /api/goals
// @access:     Private
export const deleteGoal = expressAsyncHandler(async (req, res) => {
    try {

        const deletedGoal = await Goal.findByIdAndDelete(req.params.id)

        return res.status(200).json({
            message: `Was deleted ${deletedGoal._id}`,
        })
    } catch (error) {
        return res.status(403).json({
            message: "Error"
        })
    }
})