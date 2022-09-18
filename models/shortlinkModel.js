const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const userModel = require('./userModel');

const Shortlink = sequelize.define(
  'shortlinks',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    shortlink: {
      type: DataTypes.STRING,
      validate: { isLowercase: true },
      unique: 'shortlink_un',
    },
    user_id: {
      type: DataTypes.UUID,
      references: { model: userModel, key: 'id' },
      unique: 'shortlink_un',
    },
    url: { type: DataTypes.STRING, validate: { isUrl: true } },
    description: DataTypes.STRING,
    status: { type: DataTypes.ENUM('active', 'inactive') },
    tags: DataTypes.TEXT,
  },
  {
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        type: 'FULLTEXT',
        name: 'full_text_idx',
        fields: ['shortlink', 'description', 'tags'],
      },
    ],
  }
);

// sequelize
//   .sync()
//   .then(() => {
//     console.log('shortlinks table created successfully!');
//   })
//   .catch((error) => {
//     console.error('unable to create table : ', error);
//   });

module.exports = Shortlink;
