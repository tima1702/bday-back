'use strict';
module.exports = (sequelize, DataTypes) => {
  const BdaySchedule = sequelize.define(
    'BdaySchedule',
    {
      date: DataTypes.DATEONLY,
      isCongratulate: DataTypes.BOOLEAN,
      bdayId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Bdays',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    },
    {},
  );
  BdaySchedule.associate = function(models) {
    // associations can be defined here
  };
  return BdaySchedule;
};
