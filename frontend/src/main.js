import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp, faHeart, faCommentDots, faHome, faUser} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faThumbsUp, faHeart, faCommentDots, faHome, faUser)

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

createApp(App)
.component('fa', FontAwesomeIcon)
.use(router)
.use(store)
.mount('#app')