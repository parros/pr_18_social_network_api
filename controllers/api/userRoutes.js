const router = require('express').Router()
const { User } = require('../../models')
const { updateSearchIndex } = require('../../models/User')

router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body)
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

router.delete('/:_id', async (req, res) => {
    const { _id } = req.params
    try {
        const user = await User.findByIdAndDelete(_id)
        res.json(user)
    } catch(err) {
        console.log(err)
        res.status(500).send(`Error deleting user: ${_id}`)
    }
})

router.post('/:_id/friends/:_friend', async (req, res) => {
    const { _id, _friend } = req.params
    try {
        const friend = await User.findById(_friend)
        const user = await User.findById(_id)
        if (user.friends.includes(friend._id.toString() === false)){
            const friendId = friend._id.toString()
            user.friends.push(friendId)
            const updateFriends = await User.updateOne({_id: user._id}, {friends: user.friends})
            res.json(user)
        } else {
            console.log(`${friend.username} is already a friend!`)
            res.json(user)
        }
    } catch(err) {
        console.log(err)
        res.status(500).send(`Error updating user: ${_id}`)
    }
})

router.delete('/:_id/friends/:_friend', async (req, res) => {
    const { _id, _friend } = req.params
    try {
        const friend = await User.findById(_friend)
        const user = await User.findById(_id)
        const friendId = friend._id.toString()
        console.log(friendId)
        await User.deleteOne({_id: user._id}, {friends: friendId})
        res.json(user)
    } catch(err) {
        console.log(err)
        res.status(500).send(`Error updating user: ${_id}`)
    }
})

module.exports = router