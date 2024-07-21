const { Schema, model } = require('mongoose')

const reactionSchema = new Schema({
    reactionId: {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
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
        get: formatTime
    }
}, {
    toJSON:{
        getters: true
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
        default: Date.now,
        get: formatTime
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ reactionSchema ]
}, {
    toJSON:{
        getters: true
    },
    id: false
})

// Getter format date for thoughtSchema and reactionSchema
function formatTime(date) {
    const formatedDate = date.toDateString()
    return formatedDate
}

thoughtSchema.virtual('reactionCount')
    .get(function() {
        return this.reactions.length
    })

const Thought = model('Thought', thoughtSchema)

module.exports = Thought