const router = require('express').Router()
const { Thought } = require('../../models')

router.post('/', async (req, res) => {
    try {
        const thought = await Thought.create(req.body)
        console.log(thought)
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

router.get('/:_id', async (req, res) => {
    const { _id } = req.params
    try {
        const thought = await Thought.findById(_id)
        res.json(thought)
    } catch(err) {
        console.log(err)
        res.status(500).send(`Error finding thought: ${_id}`)
    }

})

router.put('/:_id', async (req, res) => {
    const { _id } = req.params
    try {
        const thought = await Thought.findByIdAndUpdate(_id, req.body)
        res.json(thought)
    } catch(err) {
        console.log(err)
        res.status(500).send(`Error updating thought: ${_id}`)
    }

})


module.exports = router