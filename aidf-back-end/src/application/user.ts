import User from "../infrastructure/schemas/User";
import { Request, Response } from "express";
// create user - http://localhost:5000/api/users/
export const createUser = async (req:Request, res:Response) => {
  const user = req.body;

  // Validate the request data
  if (!user.name || !user.email) {
    res.status(400).json({
      message: "Please enter all required fields",
    });
    return;
  }

  // Add the user
  const userdata = await User.create({
    name: user.name,
    email: user.email,
  });

  // Return the response
  res.status(201).json({ success: true, message: "user created", data: userdata});
  return;
};

export const getAllUsers = async(req:Request, res:Response)=>{
const users = await User.find();
res.status(200).json({success:true, data: users});
}
