import dotenv from "dotenv";

dotenv.config();

const databaseUrl = process.env.DB;
const port = process.env.PORT;
const env = process.env.NODE_ENV;

const configs = {
  databaseUrl,
  port,
  twilioSid,
  twilioAuthToken,
  twilioPhone,
  env,
};

export default configs;
