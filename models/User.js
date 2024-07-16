const { Schema, model } = require('mongoose')

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
    },
    thoughts: {
        type: Array
    },
    friends: {
        type: Array
    }
})

const User = model('User', userSchema)

module.exports = User