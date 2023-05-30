import { Request, Response } from 'express';
import { updateLinkedRole } from './updateLinkedRole';
import { initApi, verifySignature } from '../../utils/polkadot';
import models, { initModels } from '../../models';
import config from '../../config';
import { Session } from 'express-session';


export const linkPolkadotWallet = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.userId;
  const address = req.body.address;
  const message = req.body.message;
  const signature = req.body.signature;

  // Ensure all required parameters are present
  if (!address || !message || !signature) {
    res.status(400).json({ error: 'Missing required parameters' });
    return;
  }

  // Initialize Polkadot API
  const api = await initApi();

  // Verify the signature
  const isValid = await verifySignature(api, address, message, signature);

  if (!isValid) {
    res.status(400).json({ error: 'Invalid signature' });
    return;
  }

  const { User } = initModels(config.database);
  await User.update(
    {
      walletAddress: address,
    },
    {
      where: { discordId: userId },
    }
  );

  // Update the user's linked role metadata
  await updateLinkedRole(userId, true);

  res.json({ success: true });
};
