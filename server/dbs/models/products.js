import mongoose from 'mongoose'

const Schema = mongoose.Schema
const Products = new Schema({
  count: {
    type: Number,
    require: true
  },
  pois: {
    type: Array,
    require: true
  }
})
export default mongoose.model('Products', Products)
