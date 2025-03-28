import express from "express";
import {
  getAllHotels,
  getHotelById,
  createHotel,
  deleteHotel,
  updateHotel,
  genarateResponce,
} from "../application/hotel";
import { isAuthenticated } from "./middleware/authentication_middleware";
import { isAmdin } from "./middleware/authorization-middleware";
import { createEmberdding } from "../application/embedding";
import { retrieve } from "../application/retrieveIndexes";


const hotelsRouter = express.Router();

hotelsRouter.route("/").get((req, res, next) => {
  next();
}, getAllHotels)
  .post(isAuthenticated, isAmdin, createHotel);

hotelsRouter
  .route("/:id")
  .get(getHotelById)
  .put(updateHotel)
  .delete(deleteHotel);

hotelsRouter.route('/llm').post(genarateResponce);
hotelsRouter.route('/emberdding/create').post(createEmberdding);
hotelsRouter.route('/search/retrieve').get(retrieve);

export default hotelsRouter;
