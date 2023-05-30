import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { hexToU8a, u8aToHex } from '@polkadot/util';
import { Session } from 'express-session';


// Initialize the Polkadot API
export async function initApi(): Promise<ApiPromise> {
  const wsProvider = new WsProvider('wss://rpc.polkadot.io');
  const api = await ApiPromise.create({ provider: wsProvider });
  return api;
}

// Generate a random message for the user to sign
export function generateMessage(): string {
  const messageBytes = new Uint8Array(32);
  crypto.getRandomValues(messageBytes);
  return u8aToHex(messageBytes);
}

// Verify the signature of the message
export async function verifySignature(api: ApiPromise, address: string, message: string, signature: string): Promise<boolean> {
  const keyring = new Keyring({ type: 'sr25519' });
  const publicKey = hexToU8a(address);
  const signedMessage = hexToU8a(signature);

  // Retrieve the account's public key
  const account = keyring.addFromAddress(address);

  // Verify the signature
  const isValid = account.verify(hexToU8a(message), signedMessage, publicKey);

  return isValid;
}
