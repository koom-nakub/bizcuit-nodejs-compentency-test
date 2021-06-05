var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const mongoose = require('mongoose')

var indexRouter = require('./routes/index')
var beerRouter = require('./routes/beer')

var app = express()

app.use(logger('dev'))
app.use(express.json())
mongoose.connect('mongodb://localhost:27017/node-api-101', {
  useNewUrlParser: true,
})

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/beer', beerRouter)

module.exports = app
