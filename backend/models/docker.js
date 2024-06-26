module.exports = (sequelize, DataTypes) => {
    const Docker = sequelize.define('Docker', {
        Docker_ID: {
            type: DataTypes.STRING(19),
            allowNull: false,
            primaryKey: true
        },
        AriketaZemb: {
            type: DataTypes.BIGINT(20),
            allowNull: false
        },
        Estado: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: 'activo'
        },
        Flag: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        user: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'users', // Nombre del modelo al que pertenece la clave foránea
                key: 'userid' // Nombre de la columna en la tabla de usuarios
            }
        }
    }, {
        timestamps: false,
        tableName: 'docker' // Asegúrate de que el nombre de la tabla es correcto
    });

    Docker.associate = function(models) {
        Docker.belongsTo(models.User, { foreignKey: 'user' });
    };

    return Docker;
};
