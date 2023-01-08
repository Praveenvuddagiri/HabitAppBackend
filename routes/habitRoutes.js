const express = require('express')
const router = express.Router()
const {
  getHabits,
  setHabit,
  updatedHabit,
  deleteHabit,
  getAllUsers
} = require('../controllers/habitController')

const { protect } = require('../middlewares/authMiddleware')

router.route('/').get(protect, getHabits).post(protect, setHabit)
router.route('/:id').delete(protect, deleteHabit).put(protect, updatedHabit)
router.route('/getAllUsers').get(protect, getAllUsers)
module.exports = router