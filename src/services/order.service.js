import { BadrequestException } from "../../common/helpers/exception.helper";
import initModels from "../models/init-models";

export default (sequelize) => {
    const { Order, User, Food } = initModels(sequelize);

    const order = async ({ user_id, food_id, amount, arr_sub_id }) => {
        const user = await User.findOne({
            where: { user_id, isDeleted: false },
        });
        const food = await Food.findOne({
            where: { food_id, isDeleted: false },
        });
        if (!user || !food) {
            throw new BadrequestException(
                "Người dùng hoặc món ăn không tồn tại"
            );
        }

        const code = `DH${Date.now()}`;
        return await Order.create({
            user_id,
            food_id,
            amount,
            code,
            arr_sub_id: arr_sub_id ? arr_sub_id.join(",") : "",
        });
    };

    return { order };
};
