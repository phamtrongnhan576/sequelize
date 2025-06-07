import { BadrequestException } from "../common/helpers/exception.helper";
import initModels from "../models/init-models";

export default (sequelize) => {
    const { like_res, user, restaurant } = initModels(sequelize);

    const like = async ({ user_id, res_id }) => {
        const userLike = await user.findOne({
            where: { user_id, isDeleted: false },
        });
        const restaurantLike = await restaurant.findOne({
            where: { res_id, isDeleted: false },
        });
        if (!userLike || !restaurantLike) {
            throw new BadrequestException(
                "Người dùng hoặc nhà hàng không tồn tại"
            );
        }

        const existingLike = await like_res.findOne({
            where: { user_id, res_id, isDeleted: false },
        });
        if (existingLike) {
            throw new BadrequestException("Người dùng đã like nhà hàng này");
        }

        return await like_res.create({
            user_id,
            res_id,
            date_like: new Date(),
        });
    };

    const unlike = async ({ user_id, res_id }) => {
        const like = await like_res.findOne({
            where: { user_id, res_id, isDeleted: false },
        });
        if (!like) {
            throw new BadrequestException("Không tìm thấy lượt like");
        }

        await like.update({
            isDeleted: true,
            deletedAt: new Date(),
            deletedBy: user_id,
        });
        return { message: "Unlike thành công" };
    };

    const getLikesByRestaurant = async (res_id) => {
        const restaurantLike = await restaurant.findOne({
            where: { res_id, isDeleted: false },
        });
        if (!restaurantLike) {
            throw new BadrequestException("Nhà hàng không tồn tại");
        }

        return await like_res.findAll({
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

    const getLikesByUser = async (user_id) => {
        const userLike = await user.findOne({
            where: { user_id, isDeleted: false },
        });
        if (!userLike) {
            throw new BadrequestException("Người dùng không tồn tại");
        }

        return await like_res.findAll({
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

    return { like, unlike, getLikesByRestaurant, getLikesByUser };
};
