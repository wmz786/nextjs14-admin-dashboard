import { User } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const addUser = async (formData) => {
  "use server";
  const data = Object.fromEntries(formData);
  try {
    connectToDB();
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
