const { Schema, model, ObjectId } = require('mongoose')

const reactionSchema = new Schema({
    reactionId: {
        type: ObjectId
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
        default: Date.now
    }
}, {
    toObject:{
        virtuals: true
        }
}
)

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ reactionSchema ]
}, {
    toObject:{
    virtuals: true
    }
})

thoughtSchema.virtual('formatDate')
    .get(function () {
        const dateFormat = new Date(this.createdAt)
        return dateFormat
    })

reactionSchema.virtual('formatDate')
    .get(function () {
        const dateFormat = new Date(Date.now)
        return dateFormat
    })

const Thought = model('Thought', thoughtSchema)

module.exports = Thought