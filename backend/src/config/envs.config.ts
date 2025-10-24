import "dotenv/config";

const envs = {
  PORT: process.env.PORT,
  TYPE: process.env.DB_TYPE,
  HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
};

export default envs;
