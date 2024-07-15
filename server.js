const express = require('express')
const routes = require('./controllers')

const { MongoClient } = require('mongodb')

const app = express();
const PORT = process.env.PORT || 3001;