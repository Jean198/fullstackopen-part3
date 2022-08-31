const mongoose = require('mongoose');

require('dotenv').config();

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

const url = `mongodb+srv://Jean:${password}@democluster.rafje.mongodb.net/fullstackOpen`

mongoose.connect(url)

const personSchema = new mongoose.Schema(
    {
        name: String,
        number: String,

    }
)

const Person = mongoose.model('persons', personSchema)




if (personName && personNumber) {
    const person = new Person({
      name: personName,
      number: personNumber
    })

    person.save().then(() => {
      console.log(`Added ${personName} number ${personNumber} to phonebook`)
      mongoose.connection.close()
    })


  } else {
    Person.find({}).then(result => {
      console.log('phonebook:')
      result.forEach(person => console.log(person.name, person.number))
      mongoose.connection.close()
    })

  }