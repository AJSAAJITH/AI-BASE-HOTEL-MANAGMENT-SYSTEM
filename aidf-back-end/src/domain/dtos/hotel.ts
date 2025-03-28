// DTO  - domain transwer object
import { z } from "zod"

export const createHotelDTO = z.object({
    name: z.string(),
    location: z.string(),
    image: z.string(),
    price: z.number(),
    description: z.string()
});