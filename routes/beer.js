var express = require('express')
var router = express.Router()
var BeerModel = require('../models/beer')

router.get('/random', async (req, res) => {
  try {
    let response = []
    const beer = await BeerModel.findOne({ randomCount: 0 })

    if (beer !== null) {
      const newUpdate = {
        $set: {
          randomCount: 1,
        },
      }
      response = await BeerModel.findByIdAndUpdate(beer._id, newUpdate)
    }

    res.status(200).json(response)
  } catch (error) {
    console.log('error', error)
  }
})

router.post('/', async (req, res) => {
  const payload = req.body
  try {
    const beer = new BeerModel(payload)
    await beer.save()
    res.status(201).end()
  } catch (error) {
    console.log('error', error)
  }
})

module.exports = router
