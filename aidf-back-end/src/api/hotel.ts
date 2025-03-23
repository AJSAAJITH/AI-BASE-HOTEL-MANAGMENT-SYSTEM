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

export default hotelsRouter;
