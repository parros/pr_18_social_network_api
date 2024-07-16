const router = require('express').Router()
const { User } = require('../../models')

router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body)
        console.log(user)
        res.json(user)
    } catch(err) {
        console.log(err)
        res.status(500).send('Error creating user')
    }

})

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch(err) {
        console.log(err)
        res.status(500).send('Error finding users')
    }

})

router.get('/:_id', async (req, res) => {
    const { _id } = req.params
    try {
        const user = await User.findById(_id)
        res.json(user)
    } catch(err) {
        console.log(err)
        res.status(500).send(`Error finding user: ${_id}`)
    }

})

router.put('/:_id', async (req, res) => {
    const { _id } = req.params
    try {
        const user = await User.findByIdAndUpdate(_id, req.body)
        res.json(user)
    } catch(err) {
        console.log(err)
        res.status(500).send(`Error updating user: ${_id}`)
    }

})

module.exports = router