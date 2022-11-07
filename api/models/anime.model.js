module.exports = (sequelize, Sequelize) => {
  const Anime = sequelize.define("anime", {
    title: {
      type: Sequelize.STRING
    },
    genres: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    episodes: {
      type: Sequelize.INTEGER
    },
    desc: {
      type: Sequelize.TEXT
    }
  },
  {
    timestamps: false
  }
  );
  return Anime;
};
