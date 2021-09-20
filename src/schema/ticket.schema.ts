import { object, string, ref, array, number } from "yup";
import config from "config";

const maxDescriptionLength = config.get("maxDescriptionLength") as number;
const maxTitleLength = config.get("maxTitleLength") as number;
const maxMinutesLogged = config.get("maxMinutesLogged") as number;

const payload = {
  body: object({
    title: string()
      .required("Title is required")
      .max(maxTitleLength, `Title max length is ${maxTitleLength}`),
    body: string()
      .required("Body is required")
      .max(
        maxDescriptionLength,
        `Descriptions max length is ${maxDescriptionLength}`
      ),
    logs: array().of(
      object({
        logger: string(), // * user ID
        minutes: number().max(
          maxMinutesLogged,
          `You can only log a maximum of ${maxMinutesLogged} minutes, create smaller tickets!`
        ),
      })
    ),
  }),
};

const params = {
  params: object({
    ticketId: string().required("Ticket id is required"),
  }),
};

export const createTicketSchema = object({
  ...payload,
});

export const updateTicketSchema = object({
  ...params,
  ...payload,
});

export const deleteTicketSchema = object({
  ...params,
});
