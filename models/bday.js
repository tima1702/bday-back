module.exports = (sequelize, DataTypes) => {
  const Bday = sequelize.define(
    'Bday',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      data: DataTypes.JSONB,
      date: DataTypes.DATEONLY,
    },
    {
      hooks: {
        afterSave() {
          sequelize.query('CALL  "checkBdays"();');
        },
      },
    },
  );
  Bday.associate = function(models) {
    // associations can be defined here
  };

  return Bday;
};
