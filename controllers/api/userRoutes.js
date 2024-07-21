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

router.get('/:userId', async (req, res) => {
    const { userId } = req.params
    try {
        const user = await User.findById(userId)
        res.json(user)
    } catch(err) {
        console.log(err)
        res.status(500).send(`Error finding user: ${userId}`)
    }
})

router.put('/:userId', async (req, res) => {
    const { userId } = req.params
    try {
        const user = await User.findByIdAndUpdate(userId, req.body)
        res.json(user)
    } catch(err) {
        console.log(err)
        res.status(500).send(`Error updating user: ${userId}`)
    }
})

router.delete('/:userId', async (req, res) => {
    const { userId } = req.params
    try {
        const user = await User.findByIdAndDelete(userId)
        res.json(user)
    } catch(err) {
        console.log(err)
        res.status(500).send(`Error deleting user: ${userId}`)
    }
})

router.post('/:userId/friends/:friendId', async (req, res) => {
    const { userId, friendId } = req.params
    try {
        const user = await User.findById(userId)
        const friend = await User.findById(friendId)
            if (user.friends.includes(friendId) === false){
                user.friends.push(friend)
                const updateFriends = await User.findByIdAndUpdate(userId, {friends: user.friends}, {new: true})
                console.log(`${friend.username} added as a friend!`)
                res.json(user)
            } else {
                console.log(`${friend.username} is already a friend!`)
                res.json(user)
            }
    } catch(err) {
        console.log(err)
        res.status(500).send(`Error updating user: ${userId}`)
    }
})

router.delete('/:userId/friends/:friendId', async (req, res) => {
    const { userId, friendId } = req.params
    try {
        const friend = await User.findById(friendId)
        const user = await User.findById(userId)
        const newFriendId = friend._id.toString()
        console.log(friendId)
        await User.deleteOne({userId: user._id}, {friends: newFriendId})
        res.json(user)
    } catch(err) {
        console.log(err)
        res.status(500).send(`Error updating user: ${userId}`)
    }
})

module.exports = router