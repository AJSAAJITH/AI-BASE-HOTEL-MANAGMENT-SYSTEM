"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_1 = require("../application/booking");
const authentication_middleware_1 = require("./middleware/authentication_middleware");
const bookingsRouter = express_1.default.Router();
bookingsRouter.route("/").get(booking_1.getAllBookings).post(authentication_middleware_1.isAuthenticated, booking_1.createBooking);
bookingsRouter.route("/hotels/:hotelId").get(booking_1.getAllBookingsForHotel);
exports.default = bookingsRouter;
