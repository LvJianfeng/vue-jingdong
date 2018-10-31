const mongoose = require('mongoose')

/* 建表 */
let personSchema = new mongoose.Schema({
	name: String,
	age: Number
})

/* 建模型 */
module.exports = mongoose.model('Person', personSchema)
