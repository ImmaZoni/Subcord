import { Request, Response } from 'express';
import { initModels } from '../../models';
import config from '../../config';

export const getUserData = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.userId;

  try {
    const { User } = initModels(config.database);
    const user = await User.findOne({ where: { discordId: userId } });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({
      discordId: user.discordId,
      discordUsername: user.discordUsername,
      discordDiscriminator: user.discordDiscriminator,
      discordAvatar: user.discordAvatar,
      polkadotAddress: user.walletAddress, // fix: use walletAddress instead of polkadotAddress
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get user data' });
  }
};
