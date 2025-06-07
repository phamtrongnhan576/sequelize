import express from "express";
import orderController from "../controllers/order.controller";

const orderRouter = express.Router();

orderRouter.post("/order", orderController.order);

export default orderRouter;
