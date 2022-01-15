module.exports = (sequelize, Sequelize) => {
    const Trip = sequelize.define("trip", {
      date: {
        type: Sequelize.DATE
      },
      title: {
        type: Sequelize.STRING
      },
      number: {
        type: Sequelize.INTEGER
      },
      distance: {
          type: Sequelize.INTEGER
      }
    },
    {
      timestamps: false
    });
  
    return Trip;
  };