const mongoose = require('mongoose')

const habitSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Please add a habit value'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Habit', habitSchema)