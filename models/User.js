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
        validate: {
            validator: function(userEmail) {
                return /^([a-zA-Z\d_\.+-]+)@([a-zA-Z\d\.-]+)\.([a-z\.]{2,6})$/g.test(userEmail)
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, {
    toJSON:{
        virtuals: true
    },
    id: false
})

userSchema.virtual('friendCount')
    .get(function() {
        return this.friends.length
    })

const User = model('User', userSchema)

module.exports = User