// const http = require('http')
const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())

let peopleList = 
[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// app.use(morgan('tiny'))

app.get('/api/persons',(req, res)=> {
    return res.json(peopleList)
})

app.use((request, response, next) => {
    request.reqTime = new Date()
    next()
})

app.get('/info',(req, res)=> {
    const personCount = peopleList.length
    const reqTime = req.reqTime
    // console.log(reqTime)
    return res.send(`<p>Phonebook has info for ${personCount} people <br><br>${reqTime} </p>`)
})

app.get('/api/persons/:id',(req, res) => {
const id = req.params.id
const person = peopleList.find(person => person.id === id)

if (!person) {
    return res.status(404).send('<p>Error, bitch</p>')
}

return res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    peopleList = peopleList.filter(person => person.id !== id)
    // console.log(peopleList)
    return res.send('Deleted!')
})

morgan.token('reqBody', function getBody (req) {
    const reqBody = JSON.stringify(req.body)
    return reqBody
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqBody'))

app.post('/api/persons',(req, res)=> {
    const body = req.body
    // console.log(peopleList)
    if(!body.name || !body.number) {
        return res.status(400).send({Error:"name/number must be present"})
    }

    if (peopleList.some(person => person.name === body.name)) {
        return res.status(400).send({Error:"name must be unique"})
    }

    // console.log(body.name, body.number)
    const person = {
        id: Number(Math.floor(Math.random() * 10000)),
        name: body.name,
        number: body.number
    }

    peopleList = peopleList.concat(person)
    return res.json(peopleList)
})

const port = 3001
app.listen(port)
console.log(`server is running on port ${port}`)