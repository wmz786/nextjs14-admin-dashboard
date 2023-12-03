import { User } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

export const addUser = async (formData) => {
  "use server";
  const data = Object.fromEntries(formData);
  try {
    connectToDB();
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    const newUser = new User(data);
    await newUser.save();
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
  //for refetching data
  revalidatePath("/dashboard/users");

  redirect("/dashboard/users");
};
