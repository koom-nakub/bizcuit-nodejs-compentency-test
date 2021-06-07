const mongoose = require('mongoose')
const Schema = mongoose.Schema

const beerSchema = new Schema({
  uid: { type: String, required: true, unique: true },
  brand: { type: String, required: true },
  name: { type: String, required: true },
  style: { type: String, required: true },
  hop: { type: String, required: true },
  yeast: { type: String, required: true },
  malts: { type: String, required: true },
  ibu: { type: String, required: true },
  alcohol: { type: String, required: true },
  blg: { type: String, required: true },
  randomCount: { type: Number, required: false, default: 0 },
})

const BeerModel = mongoose.model('BeerCraft', beerSchema)

module.exports = BeerModel
