import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import config from '../../config';
import { CustomSession } from '../../types/session';

export function getAuthUrl(req: Request, res: Response) {
  const state = uuid();
  (req.session as CustomSession).state = state;

  const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${config.discord.clientId}&redirect_uri=${encodeURIComponent(
    config.discord.redirectUri,
  )}&response_type=code&scope=identify%20guilds.join&state=${state}`;

  res.json({ authUrl });
}

