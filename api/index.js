const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

var corsOptions = {
  origin: "http://localhost:8081"
}
app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true }))

const db = require("./models")
const Role = db.role;
db.sequelize.sync();



require('./routes/auth.routes')(app);
require('./routes/anime.routes')(app);


app.get('/', (request, response) => {
  response.json({info: 'Main endpoint'})
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server start on port + ${PORT}`)
})
