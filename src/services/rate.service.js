import { BadrequestException } from "../../common/helpers/exception.helper";
import initModels from "../models/init-models";

export default (sequelize) => {
    const { RateRes, User, Restaurant } = initModels(sequelize);

    const rate = async ({ user_id, res_id, amount }) => {
        const user = await User.findOne({
            where: { user_id, isDeleted: false },
        });
        const restaurant = await Restaurant.findOne({
            where: { res_id, isDeleted: false },
        });
        if (!user || !restaurant) {
            throw new BadrequestException(
                "Người dùng hoặc nhà hàng không tồn tại"
            );
        }

        const existingRate = await RateRes.findOne({
            where: { user_id, res_id, isDeleted: false },
        });
        if (existingRate) {
            throw new BadrequestException(
                "Người dùng đã đánh giá nhà hàng này"
            );
        }

        return await RateRes.create({
            user_id,
            res_id,
            amount,
            date_rate: new Date(),
        });
    };

    const getRatesByRestaurant = async (res_id) => {
        const restaurant = await Restaurant.findOne({
            where: { res_id, isDeleted: false },
        });
        if (!restaurant) {
            throw new BadrequestException("Nhà hàng không tồn tại");
        }

        return await RateRes.findAll({
            where: { res_id, isDeleted: false },
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["user_id", "full_name"],
                    where: { isDeleted: false },
                },
            ],
        });
    };

    const getRatesByUser = async (user_id) => {
        const user = await User.findOne({
            where: { user_id, isDeleted: false },
        });
        if (!user) {
            throw new BadrequestException("Người dùng không tồn tại");
        }

        return await RateRes.findAll({
            where: { user_id, isDeleted: false },
            include: [
                {
                    model: Restaurant,
                    as: "re",
                    attributes: ["res_id", "res_name"],
                    where: { isDeleted: false },
                },
            ],
        });
    };

    return { rate, getRatesByRestaurant, getRatesByUser };
};
