import express from "express";
import likeRouter from "./like.router";
import orderRouter from "./order.router";
import rateRouter from "./rate.router";

const rootRouter = express.Router();

rootRouter.use("/like", likeRouter);
rootRouter.use("/order", orderRouter);
rootRouter.use("/rate", rateRouter);

export default rootRouter;
