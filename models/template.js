'use strict';
module.exports = (sequelize, DataTypes) => {
  const Template = sequelize.define(
    'Template',
    {
      title: DataTypes.STRING,
      text: DataTypes.STRING,
      blocks: DataTypes.JSONB,
      attachments: DataTypes.JSONB,
    },
    {},
  );
  Template.associate = function(models) {
    // associations can be defined here
  };
  return Template;
};
