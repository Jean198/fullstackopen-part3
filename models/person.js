
const mongoose = require('mongoose');

const password = process.env.Password
const url = process.env.DATABASE_URI

console.log('connecting to', url)

mongoose.connect(url).then(result => {
    console.log('connected to the database')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema(
    {
        name: String,
        number: String,

    }
)

personSchema.set('toJSON', {                     //Removing underscores from ids and _v......
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports=mongoose.model('persons', personSchema)

