<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';

const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

const login = () => {
  loginWithRedirect({
    async openUrl(url) {
      // Use Capacitor Browser plugin to open the login page
      // needed for iOS to properly handle the redirect back
      const { Browser } = await import('@capacitor/browser');
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
            const { Browser } = await import('@capacitor/browser');
            await Browser.open({ url, windowName: '_self' });
        }
    });
};
</script>

<template>
  <div class="login-container">
    <h1>Login</h1>
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
    text-align: left;
    background: #f4f4f4;
    padding: 1rem;
    overflow: auto;
}
</style>
