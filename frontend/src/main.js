import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    
    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}

createApp(App).use(router).use(store).mount('#app')
