import Sequelize from "sequelize";

export default (sequelize, DataTypes) => {
    const FoodType = sequelize.define(
        "food_type",
        {
            type_id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            type_name: {
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
            tableName: "food_type",
            timestamps: true,
            paranoid: true,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "type_id" }],
                },
            ],
        }
    );

    return FoodType;
};
