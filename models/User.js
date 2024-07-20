const { Schema, model } = require('mongoose')
const Thought = require('./Thought')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }
})

userSchema.add({ friends: []})

const User = model('User', userSchema)

module.exports = User