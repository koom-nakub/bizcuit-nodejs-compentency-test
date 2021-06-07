var express = require('express')
var router = express.Router()
var BeerModel = require('../models/beer')
var _ = require('lodash')

router.get('/random', async (req, res) => {
  try {
    let response = {}
    const rawBeer = await BeerModel.find()
    if (!_.isEmpty(rawBeer)) {
      const random = Math.floor(Math.random() * rawBeer.length)
      const rawData = rawBeer[random]
      const { randomCount, _id, uid, brand, name, style, hop, yeast, malts, ibu, alcohol, blg } = rawData
      await BeerModel.findOneAndUpdate({ _id: _id }, { $inc: { randomCount: 1 } })
      response = {
        id: _id,
        uid,
        brand,
        name,
        style,
        hop,
        yeast,
        malts,
        ibu,
        alcohol,
        blg,
        randomCount,
      }
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
    res.status(201).json({ message: 'Created!!' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router
