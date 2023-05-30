import { Dialect } from 'sequelize';

interface DatabaseConfig {
  dialect: Dialect;
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
}

interface Config {
  discord: {
    clientId: string;
    clientSecret: string;
    botToken: string;
    redirectUri: string;
  };
  database: DatabaseConfig;
}

const config: Config = {
  discord: {
    clientId: process.env.DISCORD_CLIENT_ID as string,
    clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    redirectUri: process.env.DISCORD_REDIRECT_URI as string,
    botToken: process.env.DISCORD_BOT_TOKEN as string,
  },
  database: {
    dialect: process.env.DB_DIALECT as Dialect,
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_DATABASE as string,
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT as string, 10),
  },
};

export default config;
