import { BadrequestException } from "../../common/helpers/exception.helper";
import initModels from "../models/init-models";

export default (sequelize) => {
    const { LikeRes, User, Restaurant } = initModels(sequelize);

    const like = async ({ user_id, res_id }) => {
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

        const existingLike = await LikeRes.findOne({
            where: { user_id, res_id, isDeleted: false },
        });
        if (existingLike) {
            throw new BadrequestException("Người dùng đã like nhà hàng này");
        }

        return await LikeRes.create({
            user_id,
            res_id,
            date_like: new Date(),
        });
    };

    const unlike = async ({ user_id, res_id }) => {
        const like = await LikeRes.findOne({
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
        const restaurant = await Restaurant.findOne({
            where: { res_id, isDeleted: false },
        });
        if (!restaurant) {
            throw new BadrequestException("Nhà hàng không tồn tại");
        }

        return await LikeRes.findAll({
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

    const getLikesByUser = async (user_id) => {
        const user = await User.findOne({
            where: { user_id, isDeleted: false },
        });
        if (!user) {
            throw new BadrequestException("Người dùng không tồn tại");
        }

        return await LikeRes.findAll({
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

    return { like, unlike, getLikesByRestaurant, getLikesByUser };
};
