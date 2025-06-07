import Sequelize from "sequelize";

export default (sequelize, DataTypes) => {
    const Restaurant = sequelize.define(
        "restaurant",
        {
            res_id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            res_name: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            image: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            desc: {
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
            tableName: "restaurant",
            timestamps: true,
            paranoid: true,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "res_id" }],
                },
            ],
        }
    );

    return Restaurant;
};
