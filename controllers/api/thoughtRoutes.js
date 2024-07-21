const router = require('express').Router()
const { Thought } = require('../../models')

console.log(Thought)

router.post('/', async (req, res) => {
    try {
        const thought = await Thought.create(req.body)
        res.json(thought)
    } catch(err) {
        console.log(err)
        res.status(500).send('Error creating thought')
    }
})

router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find()
        res.json(thoughts)
    } catch(err) {
        console.log(err)
        res.status(500).send('Error finding thoughts')
    }
})

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

router.post('/:thoughtId/reactions', async (req, res) => {
    const { thoughtId } = req.params
    try {
        const thought = await Thought.findById(thoughtId)
        const reaction = await Thought.reaction.create(req.body)
        res.json(reaction)
    } catch(err) {
        console.log(err)
        res.status(500).send('Error creating thought')
    }
})

router.delete('/:thoughtId/reactions', async (req, res) => {
    const { thoughtId } = req.params
    try {
        const thought = await Thought.findByIdAndDelete(thoughtId)
        res.json(thought)
    } catch(err) {
        console.log(err)
        res.status(500).send(`Error deleting thought: ${thoughtId}`)
    }
})

module.exports = router