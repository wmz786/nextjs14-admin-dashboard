"use server";

import { Product, User } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

export const addUser = async (formData) => {
  const data = Object.fromEntries(formData);
  try {
    connectToDB();
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    const newUser = new User(data);
    await newUser.save();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create user");
  }
  //for refetching data
  revalidatePath("/dashboard/users");

  redirect("/dashboard/users");
};

export const addProduct = async (formData) => {
  const data = Object.fromEntries(formData);
  try {
    connectToDB();
    const newProduct = new Product(data);
    await newProduct.save();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create product");
  }
  //for refetching data
  revalidatePath("/dashboard/products");

  redirect("/dashboard/products");
};

export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDB();
    await Product.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete product");
  }
  //for refetching data
  revalidatePath("/dashboard/products");
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete user");
  }
  //for refetching data
  revalidatePath("/dashboard/products");
};
