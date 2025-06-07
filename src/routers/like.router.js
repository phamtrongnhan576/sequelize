import express from "express";
import likeResController from "../controllers/likeRes.controller";

const likeRouter = express.Router();

likeRouter.post("/like", likeResController.like);
likeRouter.delete("/unlike", likeResController.unlike);
likeRouter.get("/restaurant/:res_id", likeResController.getLikesByRestaurant);
likeRouter.get("/user/:user_id", likeResController.getLikesByUser);

export default likeRouter;
