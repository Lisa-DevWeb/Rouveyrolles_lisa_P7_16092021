import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if (user && user.token) {
        // return { Authorization: user.token };
        return user.token;
    } else {
        return {};
    }
}

createApp(App).use(router).use(store).mount('#app')