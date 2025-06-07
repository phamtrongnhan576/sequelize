import express from "express";
import rateResController from "../controllers/rateRes.controller";

const rateRouter = express.Router();

rateRouter.post("/rate", rateResController.rate);
rateRouter.get("/restaurant/:res_id", rateResController.getRatesByRestaurant);
rateRouter.get("/user/:user_id", rateResController.getRatesByUser);

export default rateRouter;
