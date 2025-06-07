import express from "express";
import rateController from "../controllers/rate.controller";

const rateRouter = express.Router();

rateRouter.post("/rate", rateController.rate);
rateRouter.get("/restaurant/:res_id", rateController.getRatesByRestaurant);
rateRouter.get("/user/:user_id", rateController.getRatesByUser);

export default rateRouter;
