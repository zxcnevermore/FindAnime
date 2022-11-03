require('dotenv').config()

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
})


const getAnime = (request, response) => {
  const { page, size, title} = request.query
  if(page && size) {
    pool.query(`SELECT * FROM anime WHERE title ILIKE '%${title}%'
    ORDER BY id ASC LIMIT ${size} OFFSET ((${page} - 1) * ${size})`
    ,(error, results) => {
      if(error) {
        throw error
      }
    pool.query('SELECT * from anime', (err, res) => {
      if(err) {
        throw err
      }
      response.status(200).json({data:results.rows, totalData:res.rowCount})
    })
    })
  }
  else {
    response.status(411).json({message: "Params page,size required"})
  }
}

const getAnimeById = (request, response) => {
  const id = request.params.id
  pool.query(`SELECT * FROM anime WHERE id = ${id}`, (error, results) => {
    if(error){
      throw error
    }
    response.status(200).json({data:results.rows})
  })
}

module.exports = {
  getAnime,
  getAnimeById
}
