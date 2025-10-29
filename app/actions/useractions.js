"use server"
import mongoose from "mongoose"
import Payments from "@/models/Payments"
import User from "../../models/User";


export const fetchPayment = async (username) => {
    await mongoose.connect("mongodb://localhost:27017/getmeachai");
    const user = await User.findOne({ username }).lean();
    if (!user) return [];
    
    // Then find payments made to this user
    const pd = await Payments.find({ 
        to_user: user.name,
        done: true 
    }).sort({ amount: -1 });
    
    return JSON.parse(JSON.stringify(pd));
}

export const fetchAllPayment = async () => {
    await mongoose.connect("mongodb://localhost:27017/getmeachai");
    const user = await User.findOne().lean();
    if (!user) return [];
    
    // Then find payments made to this user
    const pd = await Payments.find({ 
        to_user: user.name,
        done: true 
    }).sort({ amount: -1 });
    
    return JSON.parse(JSON.stringify(pd));
}

export const fetchUser = async (username) => {
  if (!username) return null;
  await mongoose.connect("mongodb://localhost:27017/getmeachai");
  const user = await User.findOne({ username }).lean();
  return user ? JSON.parse(JSON.stringify(user)) : null;
}

export async function updateUser(email, updatedData) {
    await mongoose.connect("mongodb://localhost:27017/getmeachai");
    await User.updateOne({email: email}, updatedData)
    console.log(updatedData)
}

export const fetchUserByEmail = async (email) => {
  if (!email) return null;
  await mongoose.connect("mongodb://localhost:27017/getmeachai");
  const user = await User.findOne({ email }).lean();
  return user ? JSON.parse(JSON.stringify(user)) : null;
}

export const fetchAllUser = async () => {
  await mongoose.connect("mongodb://localhost:27017/getmeachai");
  const users = await User.find().lean();
  return JSON.parse(JSON.stringify(users));
};
