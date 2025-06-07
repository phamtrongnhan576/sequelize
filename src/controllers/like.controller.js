import {
    responseSuccess,
    responseError,
} from "../common/helpers/response.helper";
import likeService from "../services/like.service";

const likeController = {
    like: async (req, res, next) => {
        try {
            const result = await likeService(req.sequelize).like(req.body);
            const response = responseSuccess(result, "Like thành công", 201);
            res.status(response.statusCode).json(response);
        } catch (error) {
            const response = responseError(error.message, error.code || 500);
            res.status(response.statusCode).json(response);
        }
    },

    unlike: async (req, res, next) => {
        try {
            const result = await likeService(req.sequelize).unlike(req.body);
            const response = responseSuccess(result, "Unlike thành công");
            res.status(response.statusCode).json(response);
        } catch (error) {
            const response = responseError(error.message, error.code || 500);
            res.status(response.statusCode).json(response);
        }
    },

    getLikesByRestaurant: async (req, res, next) => {
        try {
            const result = await likeService(
                req.sequelize
            ).getLikesByRestaurant(req.params.res_id);
            const response = responseSuccess(
                result,
                "Lấy danh sách like theo nhà hàng thành công"
            );
            res.status(response.statusCode).json(response);
        } catch (error) {
            const response = responseError(error.message, error.code || 500);
            res.status(response.statusCode).json(response);
        }
    },

    getLikesByUser: async (req, res, next) => {
        try {
            const result = await likeService(req.sequelize).getLikesByUser(
                req.params.user_id
            );
            const response = responseSuccess(
                result,
                "Lấy danh sách like theo người dùng thành công"
            );
            res.status(response.statusCode).json(response);
        } catch (error) {
            const response = responseError(error.message, error.code || 500);
            res.status(response.statusCode).json(response);
        }
    },
};

export default likeController;
