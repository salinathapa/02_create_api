const express = require('express');
const cors = require('cors');

// testing commit

const data = require('./data');

const app = express();

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Arsenal Players in Premier League');
  })

app.get('/players', (req, res) => {
    res.status(200).send(data)
  })

app.get('/players/:id', (req, res) => {
    const idx = req.params.id
    
    const foundPlayer = data[idx - 1]
    if (!foundPlayer) {
        res.status(404).send({ message: `Player with id ${idx} not found`})
    } else {
        res.send(foundPlayer)
    }
})

app.post('/players', (req, res) => {
    const createdPlayer = req.body;
    
    data.push(createdPlayer)
    res.status(201).send(createdPlayer)
})

app.patch('/players/:id', (req, res) => {
    const changedPlayer = req.body;
    const idx = req.params.id

    const foundPlayer = data[idx - 1]
    if (!foundPlayer) {
        res.status(404).send({ message: `Player with id ${idx} not found`})
    } else {
        data[idx - 1] = changedPlayer
        res.send(changedPlayer)
    }
})

app.delete('/players/:id', (req, res) => {
    const idx = req.params.id

    const deletedPlayer = data.splice(idx - 1, 1)
    if (!deletedPlayer) {
        res.status(404).send({ message: `Player with id ${idx} not found`})
    } else {
        res.send(deletedPlayer)
    }
})

module.exports = app;