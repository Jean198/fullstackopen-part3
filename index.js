const express=require("express");
const mongoose = require('mongoose');
const app=express();
const morgan=require('morgan')
const cors = require('cors')

require('dotenv').config(); // Import this line before the next line!!!
const Person=require('./models/person')


app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

const PORT = process.env.PORT || 3001

morgan.token('person', function(req, res){return JSON.stringify(req.body)})
const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :person')
app.use(requestLogger)

app.get("/api/persons", (req,res)=>{
  Person.find({}).then(persons=>{
    res.json(persons)
  })
})

app.get("/api/persons/:id", (req,res)=>{
    const id=Number(req.params.id);
    const person= persons.find((person=>person.id===id))
    if(person){
        res.json(person)
    }else{
        res.status(404).end()
    }
})

app.delete("/api/persons/:id", (req,res)=>{
    const id=req.params.id
    console.log(id)
   Person.findByIdAndRemove(id)
   .then(result=>{
    res.status(204).end()
   })
   .catch(err=>xonsole.log(err))
})

app.put("/api/persons/:id", (req,res, next)=>{
  const newPerson=req.body
  console.log(newPerson)
  console.log(req.params.id)
  Person.findByIdAndUpdate(req.params.id,newPerson, {new:true} )
  .then(updatedPerson=> {
    response.json(updatedPerson)
  })
  .catch(error => next(error))
})

app.post('/api/persons',(req,res)=>{
  const person=req.body;
  if (person.name==="" || !person.number==="") {
    console.log('name or number missing')
    return res.status(401).json({
      error: 'name or number missing'
    })
  }
/*
  if (persons.find(pers => pers.name === newPerson.name)) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }
  */
  const newPerson = new Person({
    name: person.name,
    number: person.number
  })
  newPerson.save().then(() => {
    console.log(`Added ${person.name} number ${person.number} to phonebook`)
  })
})
app.listen(PORT, (console.log(`server running on port ${PORT}`)))
