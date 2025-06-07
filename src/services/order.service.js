import { BadrequestException } from "../common/helpers/exception.helper";
import initModels from "../models/init-models";

export default (sequelize) => {
    const { order, user, food } = initModels(sequelize);

    const orderFood = async ({ user_id, food_id, amount, arr_sub_id }) => {
        const userOrder = await user.findOne({
            where: { user_id, isDeleted: false },
        });
        const foodOrder = await food.findOne({
            where: { food_id, isDeleted: false },
        });
        if (!userOrder || !foodOrder) {
            throw new BadrequestException(
                "Người dùng hoặc món ăn không tồn tại"
            );
        }

        const code = `DH${Date.now()}`;
        return await order.create({
            user_id,
            food_id,
            amount,
            code,
            arr_sub_id: arr_sub_id ? arr_sub_id.join(",") : "",
        });
    };

    return { orderFood };
};
