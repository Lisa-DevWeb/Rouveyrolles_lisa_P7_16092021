import { createRouter, createWebHistory} from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Wall',
        component: () => import('../views/Accueil.vue'),
        meta: {
            title: 'Accueil | Groupomania',
        }
      },
    {
        name: 'Home',
        path: '/api/users/login',
        component: () => import('../views/Home.vue'),
        meta: {
            title: 'Connexion',
        }
    },
    {
        name: 'Inscription',
        path: '/api/users/signup',
        component: () => import('../views/Register.vue'),
        meta: {
            title: 'Inscription',
        }
    },
    {
        name: 'Forum',
        path: '/api/posts/',
        component: () => import('../views/Forum.vue'),
        meta: {
            title: 'Forum'
        }
    },
    {
        name: 'Profile',
        path: '/api/users/myprofile',
        component: () => import('../views/Profile.vue'),
        meta: {
            title: 'Profile'
        }
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

//from vue de Depart et to=vue d'arrivée
router.afterEach((to, from) => {
    console.log(from, to);
    document.title = to.meta.title
});

export default router;