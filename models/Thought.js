const { Schema, model } = require('mongoose')

const reactionSchema = new Schema({
    reactionId: {

    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: formatDate
    }
})

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: formatDate
    },
    username: {
        type: String,
        required: true
    },
    reactions:{
        type: Array
    }
})

function formatDate(date) {
    const dateFormat = new Date(date)
    const formatedDate = dateFormat.toDateString()
    return formatedDate
}

const Thought = model('Thought', thoughtSchema)

module.exports = Thought