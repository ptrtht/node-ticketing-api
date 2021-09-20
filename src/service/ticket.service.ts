import { omit } from "lodash";
import {
  DocumentDefinition,
  FilterQuery,
  PostMiddlewareFunction,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import TicketModel, { TicketDocument } from "../model/ticket.model";

export async function createTicket(input: DocumentDefinition<TicketDocument>) {
  return await TicketModel.create(input);
}

export async function findTicket(
  query: FilterQuery<TicketDocument>,
  options: QueryOptions = { lean: true }
) {
  return TicketModel.findOne(query, {}, options);
}

export async function findAndUpdate(
  query: FilterQuery<TicketDocument>,
  update: UpdateQuery<TicketDocument>,
  options: QueryOptions = { lean: true }
) {
  return TicketModel.findOneAndUpdate(query, update, options);
}

export async function deleteTicket(
  query: FilterQuery<TicketDocument>,
  options: QueryOptions = { lean: true }
) {
  return TicketModel.deleteOne(query, options);
}