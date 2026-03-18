import PocketBase from 'pocketbase';

const pocketbaseUrl = import.meta.env.VITE_POCKETBASE_URL;

if (!pocketbaseUrl) {
    throw new Error('Missing PocketBase environment variable: VITE_POCKETBASE_URL');
}

export const pb = new PocketBase(pocketbaseUrl);
