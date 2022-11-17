const { authJwt } = require('../middleware');
const controller = require('../controllers/anime.controller');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/get/all", controller.allAccess);

  app.get("/get/user",[authJwt.verifyToken], controller.userBoard);

  app.get("/get/moderator",[authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard);

  app.get("/get/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

}
