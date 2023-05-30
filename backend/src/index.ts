import express from 'express';
import session, { Store } from 'express-session';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import dotenv from 'dotenv';
import { initModels } from './models';
import config from './config';
import routes from './routes';
import { RedisStore } from 'connect-redis';


// Load environment variables from .env file
dotenv.config();

// Initialize Sequelize models
initModels(config.database);

// Create the Express application
const app = express();

// Configure Redis client and RedisStore
const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT as string, 10),
  password: process.env.REDIS_PASSWORD,
});

const RedisStore = connectRedis(session);

// Set up session middleware with RedisStore
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    store: new RedisStore({ client: redisClient }) as Store,
    cookie: { secure: process.env.NODE_ENV === 'production' },
  }),
);

// Middleware for parsing JSON data
app.use(express.json());

// Register routes
app.use('/', routes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
