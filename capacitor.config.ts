import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: import.meta.env.VITE_APP_ID,
    appName: 'auth0-repro',
    webDir: 'dist',
};

export default config;
