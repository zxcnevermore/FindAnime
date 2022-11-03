const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 5000
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({info: 'Main endpoint'})
})

app.get('/anime', db.getAnime)
app.get('/anime/:id', db.getAnimeById)

app.listen(port, () => {
  console.log(`Server start on port + ${port}`)
})
