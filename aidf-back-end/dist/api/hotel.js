"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hotel_1 = require("../application/hotel");
const authentication_middleware_1 = require("./middleware/authentication_middleware");
const authorization_middleware_1 = require("./middleware/authorization-middleware");
const embedding_1 = require("../application/embedding");
const retrieveIndexes_1 = require("../application/retrieveIndexes");
const hotelsRouter = express_1.default.Router();
hotelsRouter.route("/").get((req, res, next) => {
    next();
}, hotel_1.getAllHotels)
    .post(authentication_middleware_1.isAuthenticated, authorization_middleware_1.isAmdin, hotel_1.createHotel);
hotelsRouter
    .route("/:id")
    .get(hotel_1.getHotelById)
    .put(hotel_1.updateHotel)
    .delete(hotel_1.deleteHotel);
hotelsRouter.route('/llm').post(hotel_1.genarateResponce);
hotelsRouter.route('/emberdding/create').post(embedding_1.createEmberdding);
hotelsRouter.route('/search/retrieve').get(retrieveIndexes_1.retrieve);
exports.default = hotelsRouter;
