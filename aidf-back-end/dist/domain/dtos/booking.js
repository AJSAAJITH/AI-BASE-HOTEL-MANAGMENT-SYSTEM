"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookingDTO = void 0;
const zod_1 = require("zod");
exports.createBookingDTO = zod_1.z.object({
    hotelId: zod_1.z.string(),
    checkIn: zod_1.z.string(),
    checkOut: zod_1.z.string(),
    roomNumber: zod_1.z.number()
});
