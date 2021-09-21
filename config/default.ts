export default {
  port: 3000,
  host: "localhost",
  dbURI: "mongodb://localhost:27017/node-auth-backend",
  saltWorkFactor: 10,
  accessTokenTimeToLive: "15m",
  refreshTokenTimeToLive: "1y",
  maxDescriptionLength: 5000,
  maxTitleLength: 200,
  maxMinutesLogged: 6000,
  // TODO: make private key env var
  privateKey: `
  -----BEGIN OPENSSH PRIVATE KEY-----
  ADD YOUR OWN
  -----END OPENSSH PRIVATE KEY-----`,
};
