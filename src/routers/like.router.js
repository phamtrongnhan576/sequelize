import express from "express";
import likeController from "../controllers/like.controller";

const likeRouter = express.Router();

likeRouter.post("/like", likeController.like);
likeRouter.delete("/unlike", likeController.unlike);
likeRouter.get("/restaurant/:res_id", likeController.getLikesByRestaurant);
likeRouter.get("/user/:user_id", likeController.getLikesByUser);

export default likeRouter;
