import Sequelize from "sequelize";

export default (sequelize, DataTypes) => {
    const Food = sequelize.define(
        "food",
        {
            food_id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            food_name: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            image: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            desc: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            type_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "food_type",
                    key: "type_id",
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
            tableName: "food",
            timestamps: true,
            paranoid: true,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "food_id" }],
                },
                {
                    name: "type_id",
                    using: "BTREE",
                    fields: [{ name: "type_id" }],
                },
            ],
        }
    );

    return Food;
};
