const asyncHandler = require('express-async-handler')

const Habit = require('../models/habit')
const User = require('../models/user')

const getHabits = asyncHandler(async (req, res) => {
  const habits = await Habit.find({ user: req.user.id })
  
  res.status(200).json(habits)
})

const setHabit = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }
  const count = await Habit.countDocuments({ user:req.user });
  if(count>=5){
    throw new Error('Maximum limit reached to store habits.')
  }
  const habit = await Habit.create({
    text: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(habit)
})

const updatedHabit = asyncHandler(async (req, res) => {
  const habit = await Habit.findById(req.params.id)

  if (!habit) {
    res.status(400)
    throw new Error('Habit not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (habit.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedHabit = await Habit.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedHabit)
})

const deleteHabit = asyncHandler(async (req, res) => {
  const habit = await Habit.findById(req.params.id)

  if (!habit) {
    res.status(400)
    throw new Error('Habit not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (habit.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await habit.remove()

  res.status(200).json({ id: req.params.id })
})

const getAllUsers = asyncHandler(async (req, res) => {
  
  
    // Check for user
    if (!req.user) {
      res.status(401)
      throw new Error('User not found')
    }
    

    const usersWithHabits = await User.aggregate([
      
      {
        $lookup: {
          from: "habits", 
          localField: "_id",
          foreignField: "user",
          as: "habits"
        }
      },
      { $project: { name:1, email: 1,phone:1, habits: { $map: { input: '$habits', as: 'h', in: '$$h.text' }  } } } 
    ]);
    const userHabits = await Habit.find({})
    res.status(200).json(usersWithHabits)
  })
module.exports = {
  getHabits,
  setHabit,
  updatedHabit,
  deleteHabit,
  getAllUsers,
}