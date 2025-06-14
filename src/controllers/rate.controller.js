import {
    responseSuccess,
    responseError,
} from "../common/helpers/response.helper";
import rateService from "../services/rate.service";

const rateController = {
    rate: async (req, res, next) => {
        try {
            const result = await rateService(req.sequelize).rate(req.body);
            const response = responseSuccess(
                result,
                "Đánh giá thành công",
                201
            );
            res.status(response.statusCode).json(response);
        } catch (error) {
            const response = responseError(error.message, error.code || 500);
            res.status(response.statusCode).json(response);
        }
    },

    getRatesByRestaurant: async (req, res, next) => {
        try {
            const result = await rateService(
                req.sequelize
            ).getRatesByRestaurant(req.params.res_id);
            const response = responseSuccess(
                result,
                "Lấy danh sách đánh giá theo nhà hàng thành công"
            );
            res.status(response.statusCode).json(response);
        } catch (error) {
            const response = responseError(error.message, error.code || 500);
            res.status(response.statusCode).json(response);
        }
    },

    getRatesByUser: async (req, res, next) => {
        try {
            const result = await rateService(req.sequelize).getRatesByUser(
                req.params.user_id
            );
            const response = responseSuccess(
                result,
                "Lấy danh sách đánh giá theo người dùng thành công"
            );
            res.status(response.statusCode).json(response);
        } catch (error) {
            const response = responseError(error.message, error.code || 500);
            res.status(response.statusCode).json(response);
        }
    },
};

export default rateController;
