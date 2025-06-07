import {
    responseSuccess,
    responseError,
} from "../common/helpers/response.helper";
import orderService from "../services/order.service";

const orderController = {
    order: async (req, res, next) => {
        try {
            const result = await orderService(req.sequelize).orderFood(
                req.body
            );
            const response = responseSuccess(
                result,
                "Đặt hàng thành công",
                201
            );
            res.status(response.statusCode).json(response);
        } catch (error) {
            const response = responseError(error.message, error.code || 500);
            res.status(response.statusCode).json(response);
        }
    },
};

export default orderController;
