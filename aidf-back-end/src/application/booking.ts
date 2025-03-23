import Booking from "../infrastructure/schemas/Booking";
import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import { createBookingDTO } from "../domain/dtos/booking";
import ValidateError from "../domain/errors/not-found-error";
import { clerkClient } from "@clerk/express";
// post - create new booking -
export const createBooking = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const booking = createBookingDTO.safeParse(req.body);
    if (!booking.success) {
      throw new ValidateError(booking.error.message);
    }
    const userId = req?.auth?.userId;

    // Add the booking 
    const bookingData = await Booking.create({
      hotelId: booking.data.hotelId,
      userId: userId,
      checkIn: booking.data.checkIn,
      checkOut: booking.data.checkOut,
      roomNumber: booking.data.roomNumber,
    });

    // Return the response
    res.status(201).json({ success: true, message: "booking added", data: bookingData });

    return;
  } catch (error) {
    // console.log(`createBooking Error: ${error.message}`);
    next(error);
  }
};

// get all booking - 
export const getAllBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({ data: bookings });
    return;
  } catch (error) {
    next(error);
  }
};



export const getAllBookingsForHotel = async (req: Request, res: Response, next: NextFunction) => {
  const hotelId = req.params.hotelId;

  // Validate hotelId
  if (!mongoose.Types.ObjectId.isValid(hotelId)) {
    return res.status(400).json({ message: "Invalid hotel ID" });
  }

  try {
    // const bookings = await Booking.find({ hotelId: hotelId }).populate("userId", "name email");
    const bookings = await Booking.find({ hotelId: hotelId });
    const bookingWithUser = await Promise.all(bookings.map(async (el) => {
      const user = await clerkClient.users.getUser(el.userId);
      return { _id: el._id, hotelId: el.hotelId, checkIn: el.checkIn, checkOut: el.checkOut, roomNumber: el.roomNumber, user: { id: user.id, firstName: user?.firstName, lastName: user?.lastName } }
    })
    );
    res.status(200).json({ success: true, data: bookingWithUser });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    // res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};
