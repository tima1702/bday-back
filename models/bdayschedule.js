'use strict';
module.exports = (sequelize, DataTypes) => {
  const BdaySchedule = sequelize.define(
    'BdaySchedule',
    {
      date: DataTypes.DATEONLY,
      isCongratulate: DataTypes.BOOLEAN,
      bdayId: DataTypes.INTEGER,
    },
    {},
  );
  BdaySchedule.associate = function(models) {
    // associations can be defined here
  };
  return BdaySchedule;
};
