var express = require('express')
var router = express.Router()
var BeerModel = require('../models/beer')
var _ = require('lodash')

router.get('/random', async (req, res) => {
  try {
    let response = {}
    const beer = await BeerModel.findOne()
    if (!_.isEmpty(beer)) {
      //   // const rawData = await BeerModel.findByIdAndUpdate(beer._id,  })
      const rawData = beer
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
  console.log('payload', payload)
  const beer = new BeerModel(payload)
  const error = beer.validateSync()
  if (_.isUndefined(error)) {
    await beer.save()
    res.status(201).json({ message: 'Created!!' })
  } else {
    console.log('error', error)
    res.status(400).json({ message: 'Fail to create !!' })
  }
})

module.exports = router
