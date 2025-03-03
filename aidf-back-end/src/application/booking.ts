import Booking from "../infrastructure/schemas/Booking";
import mongoose from "mongoose";
import { Request, Response } from "express";
// post - create new booking -
export const createBooking = async (req:Request, res:Response) => {
  const booking = req.body;
  try {
    // Validate the request data
    if (
      !booking.hotelId ||
      !booking.userId ||
      !booking.checkIn ||
      !booking.checkOut ||
      !booking.roomNumber
    ) {
      res.status(400).json({
        message: "Please enter all required fields",
      });
      return;
    }

    // Add the booking 
    const bookingData = await Booking.create({
      hotelId: booking.hotelId,
      userId: booking.userId,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      roomNumber: booking.roomNumber,
    });

    // Return the response
    res.status(201).json({ success: true, message: "booking added", data: bookingData });
    return;
  } catch (error:any) {
    console.log(`createBooking Error: ${error.message}`);
  }
};

// get all booking - 
export const getAllBookings = async (req:Request, res:Response) => {
  const bookings = await Booking.find();
  res.status(200).json({ data: bookings });
  return;
};



export const getAllBookingsForHotel = async (req:Request, res:Response) => {
  const hotelId = req.params.hotelId;

  // Validate hotelId
  if (!mongoose.Types.ObjectId.isValid(hotelId)) {
    return res.status(400).json({ message: "Invalid hotel ID" });
  }

  try {
    const bookings = await Booking.find({hotelId: hotelId}).populate("userId", "name email");
    res.status(200).json({success:true, data: bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
