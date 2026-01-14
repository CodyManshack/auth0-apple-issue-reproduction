<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';

const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

const envVars = {
  VITE_AUTH0_DOMAIN: import.meta.env.VITE_AUTH0_DOMAIN,
  VITE_AUTH0_CLIENT_ID: import.meta.env.VITE_AUTH0_CLIENT_ID,
  VITE_APP_DOMAIN: import.meta.env.VITE_APP_DOMAIN,
  VITE_APP_ID: import.meta.env.VITE_APP_ID,
  REDIRECT_URI: Capacitor.getPlatform() === 'web'
    ? `http://${import.meta.env.VITE_APP_DOMAIN}/callback`
    : `${import.meta.env.VITE_APP_ID}://${import.meta.env.VITE_APP_DOMAIN}/capacitor/${import.meta.env.VITE_APP_ID}/callback`
};

const login = () => {
  loginWithRedirect({
    async openUrl(url) {
      // Use Capacitor Browser plugin to open the login page
      // needed for iOS to properly handle the redirect back
      await Browser.open({ url, windowName: '_self' });
    }
  });
};

const handleLogout = () => {
    logout({ 
        logoutParams: { 
            returnTo: window.location.origin 
        },
        async openUrl(url) {
            await Browser.open({ url, windowName: '_self' });
        }
    });
};
</script>

<template>
  <div class="login-container">
    <h1>Login</h1>
    
    <div class="debug-section">
      <h3>Environment Variables (Debug)</h3>
      <pre>{{ envVars }}</pre>
    </div>
    
    <div v-if="isAuthenticated">
      <p>Welcome, {{ user?.name }}</p>
      <pre>{{ JSON.stringify(user, null, 2) }}</pre>
      <button @click="handleLogout">Log out</button>
    </div>
    <div v-else>
      <p>You are not logged in.</p>
      <button @click="login">Log in</button>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  padding: 2rem;
  text-align: center;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
pre {
    text-align: middle;
    background: #f4f4f4;
    padding: 1rem;
    overflow: auto;
}
</style>
