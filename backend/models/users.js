module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      userid: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      username: {
          type: DataTypes.STRING(45),
          allowNull: false,
          unique: true,
      },
      password: {
          type: DataTypes.STRING(45),
          allowNull: false,
      },
      ariketa_activa: {
          type: DataTypes.STRING(19),
          allowNull: true,
      }
  },{
      timestamps: false,
      tableName: 'users' // Asegúrate de que el nombre de la tabla es correcto
  });

  User.associate = function(models) {
      User.hasMany(models.Docker, { foreignKey: 'user' });
  };

  return User;
};
