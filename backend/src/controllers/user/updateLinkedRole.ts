import axios from 'axios';
import config from '../../config';
import { Request, Response } from 'express';

export const updateLinkedRole = async (discordId: string, verifiedWallet: boolean): Promise<void> => {
  try {
    await axios.patch(
      `https://discord.com/api/v10/applications/${config.discord.clientId}/users/${discordId}/metadata`,
      {
        properties: {
          verified_wallet: verifiedWallet,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bot ${config.discord.botToken}`,
        },
      }
    );
  } catch (error) {
    console.error('Failed to update linked role:', error);
    throw new Error('Failed to update linked role');
  }
};
