"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBookingsForHotel = exports.getAllBookings = exports.createBooking = void 0;
const Booking_1 = __importDefault(require("../infrastructure/schemas/Booking"));
const mongoose_1 = __importDefault(require("mongoose"));
const booking_1 = require("../domain/dtos/booking");
const not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
const express_1 = require("@clerk/express");
// post - create new booking -
const createBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const booking = booking_1.createBookingDTO.safeParse(req.body);
        if (!booking.success) {
            throw new not_found_error_1.default(booking.error.message);
        }
        const userId = (_a = req === null || req === void 0 ? void 0 : req.auth) === null || _a === void 0 ? void 0 : _a.userId;
        // Add the booking 
        const bookingData = yield Booking_1.default.create({
            hotelId: booking.data.hotelId,
            userId: userId,
            checkIn: booking.data.checkIn,
            checkOut: booking.data.checkOut,
            roomNumber: booking.data.roomNumber,
        });
        // Return the response
        res.status(201).json({ success: true, message: "booking added", data: bookingData });
        return;
    }
    catch (error) {
        // console.log(`createBooking Error: ${error.message}`);
        next(error);
    }
});
exports.createBooking = createBooking;
// get all booking - 
const getAllBookings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield Booking_1.default.find();
        res.status(200).json({ data: bookings });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.getAllBookings = getAllBookings;
const getAllBookingsForHotel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const hotelId = req.params.hotelId;
    // Validate hotelId
    if (!mongoose_1.default.Types.ObjectId.isValid(hotelId)) {
        res.status(400).json({ message: "Invalid hotel ID" });
        return;
    }
    try {
        // const bookings = await Booking.find({ hotelId: hotelId }).populate("userId", "name email");
        const bookings = yield Booking_1.default.find({ hotelId: hotelId });
        const bookingWithUser = yield Promise.all(bookings.map((el) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield express_1.clerkClient.users.getUser(el.userId);
            return { _id: el._id, hotelId: el.hotelId, checkIn: el.checkIn, checkOut: el.checkOut, roomNumber: el.roomNumber, user: { id: user.id, firstName: user === null || user === void 0 ? void 0 : user.firstName, lastName: user === null || user === void 0 ? void 0 : user.lastName } };
        })));
        res.status(200).json({ success: true, data: bookingWithUser });
    }
    catch (error) {
        console.error("Error fetching bookings:", error);
        // res.status(500).json({ message: "Internal server error" });
        next(error);
    }
});
exports.getAllBookingsForHotel = getAllBookingsForHotel;
