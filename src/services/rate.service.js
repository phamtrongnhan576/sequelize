import { BadrequestException } from "../common/helpers/exception.helper";
import initModels from "../models/init-models";

export default (sequelize) => {
    const { rate_res, user, restaurant } = initModels(sequelize);

    const rate = async ({ user_id, res_id, amount }) => {
        const userRate = await user.findOne({
            where: { user_id, isDeleted: false },
        });
        const restaurantRate = await restaurant.findOne({
            where: { res_id, isDeleted: false },
        });
        if (!userRate || !restaurantRate) {
            throw new BadrequestException(
                "Người dùng hoặc nhà hàng không tồn tại"
            );
        }

        const existingRate = await rate_res.findOne({
            where: { user_id, res_id, isDeleted: false },
        });
        if (existingRate) {
            throw new BadrequestException(
                "Người dùng đã đánh giá nhà hàng này"
            );
        }

        return await rate_res.create({
            user_id,
            res_id,
            amount,
            date_rate: new Date(),
        });
    };

    const getRatesByRestaurant = async (res_id) => {
        const restaurantRate = await restaurant.findOne({
            where: { res_id, isDeleted: false },
        });
        if (!restaurantRate) {
            throw new BadrequestException("Nhà hàng không tồn tại");
        }

        return await rate_res.findAll({
            where: { res_id, isDeleted: false },
            include: [
                {
                    model: user,
                    as: "user",
                    attributes: ["user_id", "full_name"],
                    where: { isDeleted: false },
                },
            ],
        });
    };

    const getRatesByUser = async (user_id) => {
        const userRate = await user.findOne({
            where: { user_id, isDeleted: false },
        });
        if (!userRate) {
            throw new BadrequestException("Người dùng không tồn tại");
        }

        return await rate_res.findAll({
            where: { user_id, isDeleted: false },
            include: [
                {
                    model: restaurant,
                    as: "re",
                    attributes: ["res_id", "res_name"],
                    where: { isDeleted: false },
                },
            ],
        });
    };

    return { rate, getRatesByRestaurant, getRatesByUser };
};
