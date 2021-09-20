import { Request, Response } from "express";
import { get, omit } from "lodash";
import { createUser, deleteUser, findUser } from "../service/user.service";
import log from "../logger";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    
    return res.status(201).send(omit(user.toJSON(), "password"));
  } catch (e: unknown) {
    log.error(`Create User Handler Error: ${e as string}`);
    return res.status(409).send((e as Error).message);
  }
}
