import { omit } from "lodash";
import { DocumentDefinition, FilterQuery } from "mongoose";
import UserModel, { UserDocument } from "../model/user.model";

export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    return await UserModel.create(input);
  } catch (e: unknown) {
    throw new Error(e as string);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: UserDocument["email"]; // -> string
  password: string;
}) {
  const user = await UserModel.findOne({ email }); // should call lean(), but then no access to methods on user. 

  if (!user) return false;

  const isValid: boolean = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>){
  return UserModel.findOne(query).lean();
}

export async function deleteUser(query: FilterQuery<UserDocument>) {
  return UserModel.deleteOne(query).lean();
}