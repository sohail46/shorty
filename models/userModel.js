const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../sequelize');

const User = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, validate: { isAlpha: true } },
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
      unique: true,
    },
    password: DataTypes.STRING,
  },
  { underscored: true, createdAt: 'created_at', updatedAt: 'updated_at' }
);

User.addHook('beforeCreate', async (user, options) => {
  user.password = await bcrypt.hash(user.password, 10);
});

User.correctPassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// sequelize
//   .sync()
//   .then(() => {
//     console.log('users table created successfully!');
//   })
//   .catch((error) => {
//     console.error('unable to create table : ', error);
//   });

module.exports = User;
