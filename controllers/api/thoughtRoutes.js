const router = require('express').Router()
const { Thought, User } = require('../../models')

// Creates a thought attached to a user
router.post('/', async (req, res) => {
    const { userId } = req.body
    try {
        const thought = await Thought.create(req.body)
        const user = await User.findById(userId)
        user.thoughts.push(thought)
        const addThought = await User.findByIdAndUpdate(userId, {thoughts: user.thoughts}, { new: true })
        res.json(user)
    } catch(err) {
        console.log(err)
        res.status(500).send('Error creating thought')
    }
})

// Find all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find()
        res.json(thoughts)
    } catch(err) {
        console.log(err)
        res.status(500).send('Error finding thoughts')
    }
})

// Find a single thought by its id
router.get('/:thoughtId', async (req, res) => {
    const { thoughtId } = req.params
    try {
        const thought = await Thought.findById(thoughtId)
        res.json(thought)
    } catch(err) {
        console.log(err)
        res.status(500).send(`Error finding thought: ${thoughtId}`)
    }
})

// Change the data of a thought
router.put('/:thoughtId', async (req, res) => {
    const { thoughtId } = req.params
    try {
        const thought = await Thought.findByIdAndUpdate(thoughtId, req.body, { new: true })
        res.json(thought)
    } catch(err) {
        console.log(err)
        res.status(500).send(`Error updating thought: ${_id}`)
    }
})

// Delete a thought by its id
router.delete('/:thoughtId', async (req, res) => {
    const { thoughtId } = req.params
    try {
        const thought = await Thought.findByIdAndDelete(thoughtId)
        res.json(thought)
    } catch(err) {
        console.log(err)
        res.status(500).send(`Error deleting thought: ${thoughtId}`)
    }
})

// Adds reactions to thought posts
router.post('/:thoughtId/reactions', async (req, res) => {
    const { thoughtId } = req.params
    try {
        const thought = await Thought.findById(thoughtId)
        thought.reactions.push(req.body)
        const addThought = await Thought.findByIdAndUpdate(thoughtId, {reactions: thought.reactions}, { new: true })
        res.json(thought)
    } catch(err) {
        console.log(err)
        res.status(500).send('Error creating reaction')
    }
})

// Delete reaction by id on thought posts
router.delete('/:thoughtId/reactions', async (req, res) => {
    const { thoughtId } = req.params
    const { reactionId } = req.body
    try {
        const thought = await Thought.findById(thoughtId)
        const myReaction = thought.reactions.id(reactionId, { new: true }).deleteOne()
        await thought.save()
        res.json(thought)
    } catch(err) {
        console.log(err)
        res.status(500).send(`Error deleting reaction: ${thoughtId}`)
    }
})

module.exports = router