import { FilterQuery, LeanDocument, UpdateQuery } from "mongoose";
import config from "config";
import Session, { SessionDocument } from "../model/session.model";
import { UserDocument } from "../model/user.model";
import { decode, sign } from "./utils/jwt.utils";
import { get } from "lodash";
import { findUser } from "./user.service";

export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({ user: userId, userAgent });

  return session.toJSON();
}

export async function createAccessToken({
  user,
  session,
}: {
  user:
    | Omit<UserDocument, "password">
    | LeanDocument<Omit<UserDocument, "password">>
    | LeanDocument<SessionDocument>;
  session:
    | Omit<UserDocument, "password">
    | LeanDocument<Omit<UserDocument, "password">>
    | LeanDocument<SessionDocument>;
}) {
  const accessToken = sign(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTimeToLive") }
  );
  return accessToken;
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const refreshTokenDecoded = decode(refreshToken).decoded;

  // make sure token was decoded
  if (!refreshTokenDecoded || !get(refreshTokenDecoded, "_id")) return false;

  const session = await Session.findById(get(refreshTokenDecoded, "_id"));

  // check if session still valid
  if (!session || !session?.valid) return false;

  const user = await findUser({ _id: session.user });

  // make sure user was found
  if (!user) return false;

  const accessToken = createAccessToken({ user, session });
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return Session.updateOne(query, update);
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return Session.find(query).lean();
}
