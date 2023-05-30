import { Request, Response } from 'express';
import axios from 'axios';
import config from '../../config';
import models, { initModels } from '../../models';
import { CustomSession } from '../../types/session';

export const handleAuthCallback = async (req: Request, res: Response): Promise<void> => {
  const code = req.query.code as string;
  const state = req.query.state as string;

  // Check if the state matches the stored state to prevent CSRF attacks
  if ((req.session as CustomSession).state !== state) {
    res.status(400).json({ error: 'Invalid state' });
    return;
  }
  try {
    // Exchange the authorization code for tokens
    const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', null, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: {
        client_id: config.discord.clientId,
        client_secret: config.discord.clientSecret,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: config.discord.redirectUri,
        scope: 'identify email',
      },
    });

    const accessToken = tokenResponse.data.access_token;
    const refreshToken = tokenResponse.data.refresh_token;

    // Get the user's Discord information
    const userResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userData = userResponse.data;

    // Save the user's Discord information and tokens in the database
    const { User } = initModels(config.database);
    await User.upsert({
      id: userData.id,
      discordId: userData.id,
      discordUsername: userData.username,
      discordDiscriminator: userData.discriminator,
      discordAvatar: userData.avatar,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to handle the OAuth callback' });
  }
};
