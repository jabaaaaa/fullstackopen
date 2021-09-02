const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const URL = process.env.MONGODB_URI

console.log('connecting to', URL)

mongoose.connect(URL)
  .then(console.log('connected to MongoDB'))
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personChema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  number: {
    type: String,
    required: true,
    minlength: 8
  }
})
personChema.plugin(uniqueValidator)

personChema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Person', personChema)