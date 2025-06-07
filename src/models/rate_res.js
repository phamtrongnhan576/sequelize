import Sequelize from "sequelize";

export default (sequelize, DataTypes) => {
    const RateRes = sequelize.define(
        "rate_res",
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
            res_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: "restaurant",
                    key: "res_id",
                },
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            date_rate: {
                type: DataTypes.DATE,
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
            tableName: "rate_res",
            timestamps: true,
            paranoid: true,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "user_id" }, { name: "res_id" }],
                },
                {
                    name: "res_id",
                    using: "BTREE",
                    fields: [{ name: "res_id" }],
                },
            ],
        }
    );

    return RateRes;
};
