const db = require('../models');
const Anime = db.anime;


exports.allAccess = (req, res) => {
  Anime.findAll({
    order:[
      ['id', 'ASC']
    ]
  }).then(anime =>{
    res.json({data:anime});
  })
}
exports.userBoard  = (req, res) => {
  res.status(200).send("User conntent")
}
exports.adminBoard  = (req, res) => {
  res.status(200).send("Admin content")
  }
exports.moderatorBoard  = (req, res) => {
  res.status(200).send("Moderator Content.");
}
