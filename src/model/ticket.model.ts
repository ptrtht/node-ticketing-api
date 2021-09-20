import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { UserDocument } from "./user.model";
import { nanoid } from "nanoid";
import { LogDocument, LogSchema } from "./log.model";

export interface TicketDocument extends mongoose.Document {
  createdBy: UserDocument["_id"];
  title: string;
  body: string;
  logs: LogDocument[];
  createdAt: Date;
  updatedAt: Date;
}

const TicketSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(10),
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, default: true },
    body: { type: String, default: true },
    logs: {
      type: [LogSchema],
      required: false,
      default: [],
    },
  },
  { timestamps: true }
);

const TicketModel = mongoose.model<TicketDocument>("Ticket", TicketSchema);

export default TicketModel;
