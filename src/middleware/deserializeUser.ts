import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import { reIssueAccessToken } from "../service/session.service";
import { decode } from "../service/utils/jwt.utils";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );
  // If the token is missing, next.
  if (!accessToken) return next();

  const accessTokenDecoded  = decode(accessToken).decoded;

  // if token can be decoded just add it to the user object, next
  if (accessTokenDecoded) {
    // @ts-ignore
    req.user = accessTokenDecoded; // <--- ts can't know what is in req, needs ignore.

    return next();
  }

  const refreshToken = get(req, "headers.x-refresh");
  const accessTokenExpired = decode(accessToken).expired;

  // if the access token is expired and the refresh token is present, generate new access token
  if (accessTokenExpired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    // if the new access token is valid
    if (newAccessToken) {
      // set as header so client can reuse
      res.setHeader("x-access-token", newAccessToken);

      const newAccessTokenDecoded = decode(newAccessToken).decoded;

      // @ts-ignore
      req.user = newAccessTokenDecoded;
    }

    // if the refreshToken is expired and the new access token is hence invalid:
    return next();
  }

  return next();
};


export default deserializeUser;