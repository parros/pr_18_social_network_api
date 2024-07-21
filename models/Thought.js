const { Schema, model } = require('mongoose')

const reactionSchema = new Schema({
    reactionId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
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
    toJSON:{
        virtuals: true
    },
    id: false
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
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ reactionSchema ]
}, {
    toJSON:{
        virtuals: true
    },
    id: false
})

thoughtSchema.virtual('formatDate')
    .get(function () {
        return this.createdAt.toDateString()
    })

reactionSchema.virtual('formatDate')
    .get(function () {
        return this.createdAt.toDateString()
    })

const Thought = model('Thought', thoughtSchema)

module.exports = Thought