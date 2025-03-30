import { z } from 'zod';

export const createBookingDTO = z.object({
    hotelId: z.string(),
    checkIn: z.string(),
    checkOut: z.string(),
    customer_name: z.string(),
    phone: z.string(),
    rooms_count: z.number(),
})