"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHotelDTO = void 0;
// DTO  - domain transwer object
const zod_1 = require("zod");
exports.createHotelDTO = zod_1.z.object({
    name: zod_1.z.string(),
    location: zod_1.z.string(),
    image: zod_1.z.string(),
    price: zod_1.z.number(),
    description: zod_1.z.string()
});
