import { Router } from 'express';
import { getAuthUrl } from '../controllers/auth/getAuthUrl';
import { handleAuthCallback } from '../controllers/auth/handleAuthCallback';
import { linkPolkadotWallet } from '../controllers/user/linkPolkadotWallet';
import { getUserData } from '../controllers/user/getUserData';

const router = Router();

router.get('/auth/url', getAuthUrl);
router.get('/auth/callback', handleAuthCallback);
router.post('/user/:userId/polkadot/link', linkPolkadotWallet);
router.get('/user/:userId/data', getUserData);

export default router;
