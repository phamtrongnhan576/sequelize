import Sequelize from "sequelize";

export default (sequelize, DataTypes) => {
    const SubFood = sequelize.define(
        "sub_food",
        {
            sub_id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            sub_name: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            sub_price: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            food_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "food",
                    key: "food_id",
                },
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
            tableName: "sub_food",
            timestamps: true,
            paranoid: true,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "sub_id" }],
                },
                {
                    name: "food_id",
                    using: "BTREE",
                    fields: [{ name: "food_id" }],
                },
            ],
        }
    );

    return SubFood;
};
