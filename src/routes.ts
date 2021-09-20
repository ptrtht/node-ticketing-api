import { Express, Request, Response } from "express";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  invalidateUserSessionHandler,
} from "./controller/session.controller";
import { createTicketHandler, deleteTicketHandler, getTicketHandler, updateTicketHandler } from "./controller/ticket.controller";
import { createUserHandler } from "./controller/user.controller";
import requiresUser from "./middleware/requiresUser";
import validateRequest from "./middleware/validateRequests";
import { createTicketSchema, deleteTicketSchema, updateTicketSchema } from "./schema/ticket.schema";
import {
  createUserSchema,
  createUserSessionSchema,
} from "./schema/user.schema";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  //! User methods
  // Register
  // // POST api/users
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  // TODO: implement delete user functionality

  // Login
  // // POST api/seassions
  app.post(
    "/api/sessions",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );

  // Get user sessions -> GET api/seassions
  app.get("/api/sessions", requiresUser, getUserSessionsHandler);

  // Logout
  // // DEL api/sessions
  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);

  //! Tickets

  // create a ticket
  app.post(
    "/api/tickets",
    [requiresUser, validateRequest(createTicketSchema)],
    createTicketHandler
  );

  // update a ticket
  app.put(
    "/api/tickets/:ticketId",
    [requiresUser, validateRequest(updateTicketSchema)],
    updateTicketHandler
  );

  // Get a specific ticket
  app.get(
    "/api/tickets/:ticketId",
    // requiresUser,
    getTicketHandler
  );

  // TODO: get all tickets assigned to user
  // TODO: get all tickets created by user

  // Delete a ticket
  app.delete(
    "/api/tickets/:ticketId",
    [requiresUser, validateRequest(deleteTicketSchema)],
    deleteTicketHandler
  );
}
