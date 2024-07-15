const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/social_network_db')

module.exports = mongoose.connection