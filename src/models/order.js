import Sequelize from "sequelize";

export default (sequelize, DataTypes) => {
    const Order = sequelize.define(
        "order",
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: "user",
                    key: "user_id",
                },
            },
            food_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: "food",
                    key: "food_id",
                },
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            code: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            arr_sub_id: {
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
            tableName: "order",
            timestamps: true,
            paranoid: true,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "user_id" }, { name: "food_id" }],
                },
                {
                    name: "food_id",
                    using: "BTREE",
                    fields: [{ name: "food_id" }],
                },
            ],
        }
    );

    return Order;
};
