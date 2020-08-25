const bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users', {
		user_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		password: DataTypes.STRING(255)
	},  {
        freezeTableName: true,
        instanceMethods: {
            generateHash(password) {
                return bcrypt.hash(password, bcrypt.genSaltSync(8));
            },
            validPassword(password) {
                return bcrypt.compare(password, this.password);
            }
        }
    });
};
