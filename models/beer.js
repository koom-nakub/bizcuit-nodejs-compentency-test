const mongoose = require('mongoose')
const Schema = mongoose.Schema

const beerSchema = new Schema({
  uid: String,
  brand: String,
  name: String,
  style: String,
  hop: String,
  yeast: String,
  malts: String,
  ibu: String,
  alcohol: String,
  blg: String,
  randomCount: { type: Number, default: 0 },
})

const BeerModel = mongoose.model('Beer', beerSchema)

module.exports = BeerModel
