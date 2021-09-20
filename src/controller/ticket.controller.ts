import { Request, Response } from "express";
import { get, omit } from "lodash";
import { createUser, deleteUser, findUser } from "../service/user.service";
import log from "../logger";
import {
  createTicket,
  deleteTicket,
  findAndUpdate,
  findTicket,
} from "../service/ticket.service";

export async function createTicketHandler(req: Request, res: Response) {
  try {
    const userId = get(req, "user._id");
    const body = req.body;

    const ticket = await createTicket({ ...body, createdBy: userId });

    return res.send(ticket);
  } catch (e: unknown) {
    log.error(`createTicketHandler Error: ${e as string}`);
    return res.status(409).send((e as Error).message);
  }
}

export async function updateTicketHandler(req: Request, res: Response) {
  try {
    const ticketId = get(req, "params.ticketId");
    const update = req.body;
    const userId = get(req, "user._id");

    const ticket = await findTicket({ ticketId });

    if (!ticket) return res.sendStatus(404);
    if (String(ticket.createdBy) !== String(userId)) return res.sendStatus(401);

    const updatedTicket = await findAndUpdate({ ticketId }, update, {
      new: true,
    });

    return res.send(updatedTicket);
  } catch (e: unknown) {
    log.error(`updateTicketHandler Error: ${e as string}`);
    return res.status(409).send((e as Error).message);
  }
}

export async function getTicketHandler(req: Request, res: Response) {
  try {
    const ticketId = get(req, "params.ticketId");
    const ticket = await findTicket({ ticketId });

    if (!ticket) return res.sendStatus(404);

    return res.send(ticket);
  } catch (e: unknown) {
    log.error(`getTicketHandler Error: ${e as string}`);
    return res.status(409).send((e as Error).message);
  }
}

export async function deleteTicketHandler(req: Request, res: Response) {
  try {
    const ticketId = get(req, "params.ticketId");
    const userId = get(req, "user._id");

    // make sure that the ticket exists
    const ticket = await findTicket({ ticketId });

    if (!ticket) return res.sendStatus(404);
    if (String(ticket.createdBy) !== String(userId)) return res.sendStatus(401);

    await deleteTicket({ ticketId: ticketId });

    return res.sendStatus(200);
  } catch (e: unknown) {
    log.error(`deleteTicketHandler Error: ${e as string}`);
    return res.status(409).send((e as Error).message);
  }
}
