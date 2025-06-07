import Sequelize from "sequelize";

export default (sequelize, DataTypes) => {
    const User = sequelize.define(
        "user",
        {
            user_id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            full_name: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            deletedBy: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            sequelize,
            tableName: "user",
            timestamps: true,
            paranoid: true,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "user_id" }],
                },
            ],
        }
    );

    return User;
};
