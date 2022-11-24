const db = require('../models');
const Anime = db.anime;
const Op = db.Sequelize.Op;


const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? + (page - 1) * limit : 0;

  return {limit, offset};
}

const getPaginationData = (data, page, limit) => {
  const {count: totalItems, rows: anime} = data;
  const currentPage = page ? +page : 0;
  const totalPage = Math.ceil(totalItems / limit)

  return {totalItems, anime, totalPage, currentPage}
}


exports.allAccess = (req, res) => {
  const { size, page, title } = req.query
  console.log('params', size, page, title)
  var condition = title ? {title : {[Op.iLike]: `%${title}%`} } : null;

  const {limit, offset} = getPagination(page, size)
    if(page && size) {
      Anime.findAndCountAll({
        where: condition, limit, offset,
        order:[
          ['id', 'ASC']
        ]
      }).then(data =>{
        const response = getPaginationData(data, page, limit)
        res.send(response);
      })
    }
    else{
      res.status(411).json({message: "Params page,size required"})
    }

  }

exports.userBoard  = (req, res) => {
  res.status(200).send("all")
}
exports.adminBoard  = (req, res) => {
  res.status(200).send("Admin content")
  }
exports.moderatorBoard  = (req, res) => {
  res.status(200).send("Moderator Content.");
}
