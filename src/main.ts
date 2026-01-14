import { createApp } from 'vue'
import { createAuth0 } from '@auth0/auth0-vue'
import App from './App.vue'
import router from './router'
import { Capacitor } from '@capacitor/core'
const app = createApp(App)

app.use(router)

const redirect_uri = Capacitor.getPlatform() === 'web'
    ? `http://${import.meta.env.VITE_APP_DOMAIN}/callback`
    : `${import.meta.env.VITE_APP_ID}://${import.meta.env.VITE_APP_DOMAIN}/capacitor/${import.meta.env.VITE_APP_ID}/callback`

app.use(
    createAuth0({
        domain: import.meta.env.VITE_AUTH0_DOMAIN,
        clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
        useRefreshTokens: true,
        useRefreshTokensFallback: false,
        authorizationParams: {
            redirect_uri,
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
    })
)

app.mount('#app')
