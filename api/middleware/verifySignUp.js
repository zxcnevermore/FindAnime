const db = require('../models')
const ROLES = db.ROLES;
const User = db.user;


chekLoginOrEmail = (req, res, next) => {
  User.findOne({
    where: {
      login: req.body.login
    }
  }).then(user => {
    if(user){
      res.status(400).send({
        message: "Failed! Login is already in use!"
      });
      return;
    }
  })

  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if(user) {
      res.status(400).send({
        message: "Failed! Enail is already in use!"
      });
      return
    }

    next();
  });
};

checkRoleExisted = (req, res, next) => {
  if(req.body.roles) {
    for (let i = 0; i < req.body.roles.lenth; i++) {
      if(!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  next();
}

const verifySignUp = {
  chekLoginOrEmail: chekLoginOrEmail,
  checkRoleExisted: checkRoleExisted
}

module.exports = verifySignUp;
