const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      maxlength: [40, 'Name should be under 40 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      validate: [validator.isEmail, "Please enter a valid email."],
      unique: true,
    },
    phone: {
        type: String,
        required: [true, 'Please add a password'],
        length: [10, 'Phone number should be of 10 digits'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: [6, 'Password should be atleast of 6 char'],
    },
  },
  {
    timestamps: true,
  }
)
//encrypt password before save
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) 
        return next()
    this.password = await bcrypt.hash(this.password, 10)
    
})

// validate the password with passed on user password
userSchema.methods.isValidPassword = async function(usersendPassword) {
    return await bcrypt.compare(usersendPassword, this.password)
}

//create and return jwt tocken
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
    })
}

module.exports = mongoose.model('User', userSchema)