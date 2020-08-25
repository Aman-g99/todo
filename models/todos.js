module.exports = function(sequelize, DataTypes) {
	return sequelize.define('todos', {
		todo_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
        },
        todo_message: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		user_id: {
			type: DataTypes.BIGINT,
			allowNull: true,
			references: {
				model: 'users',
				key: 'user_id'
			}
		}
	}, {
		tableName: 'todos'
	});
};
