//Vuex est un gestionnaire d'état (« state management pattern ») et une bibliothèque pour des applications Vue.js. IL sert de zone de stockage de données centralisée pour tous les composants. 
import { createStore } from 'vuex'

//Axios permet d'effectuer des requêtes (POST, GET, PUT, DELETE)
const axios = require('axios');

//Création de la route racine
const instance = axios.create({
    baseURL: 'http://localhost:3000/api/users/'
  });
 
let user = localStorage.getItem('user');
if (!user) {
  user = {
    id: -1,
    email: '',
    username: '',
    password: '',
    role: '',
    isAdmin: '',
    latent: '',
    token: '',
  };
} else {
  try {
      user = JSON.parse(user);
      instance.defaults.headers.common['Authorization'] = user.token;
  } catch(ex) {
    user = {
      id: -1,
      email: '',
      username: '',
      password: '',
      role: '',
      isAdmin: '',
      latent: '',
      token: '',
    };
  }
}

// Create a new store instance.
const store = createStore({
    state: {
      status: '',
      user: user,
      usersInfos: {
        id: '',
        email: '',
        username: '',
        role: '',
        isAdmin: '',
        latent: '',
        token: '',
      },
      postInfos: {
        id: '',
        userId: '',
        title: '',
        content: '',
        attachment: '',
      },
      // posts: [],
    },
    //Pour modifier l'état, il faut acter une mutation. 
    mutations: {
      setStatus: function (state, status) {
        state.status = status;
      },
      logUser: function (state, user) {
        instance.defaults.headers.common['Authorization'] = user.token;
        localStorage.setItem('user', JSON.stringify(user));
        state.user = user;
      },
      usersInfos: function (state, usersInfos) {
        state.usersInfos = usersInfos;
      },
      postInfos: function (state, postInfos) {
        state.postInfos = postInfos;
      },
      logout: function (state) {
        state.user = {
          id: -1,
          token: '',
        }
        localStorage.removeItem('user');
      },
    },
    //Les actions actent les mutations
    actions: {
      login: ({commit}, usersInfos) => { //Récupération du commit pour exécuter la mutation lors de la création du compte
        commit('setStatus', 'loading');
        return new Promise((resolve, reject) => {
          console.log(usersInfos);
          instance.post('/login', usersInfos)
          .then(function (response) {
            alert('Bienvenue !');
            commit('setStatus', '');
            commit('logUser', response.data);
            resolve(response);
          })
          .catch(function (error) {
            commit('setStatus', 'error_login');
            reject(error);
          });
        })
      },      

      createAccount: ({commit}, usersInfos) => {
        commit('setStatus', 'loading');
        return new Promise((resolve, reject) => {
          commit;
          console.log(usersInfos);
          instance.post('/signup', usersInfos)
          .then(function (response) {
            alert('Bienvenue !');
            commit('setStatus', 'created');
            commit('logUser', response.data);
            resolve(response);
          })
          .catch(function (error) {
            commit('setStatus', 'error_create');
            reject(error);
          });
        })
      },

      getUserInfos: ({commit}) => {
        instance.get('/myprofile')
          .then(function (response) {
            commit('usersInfos', response.data.user);
          })
          .catch(function () {
          });
      },

      getPostInfos: ({commit}) => {
        instance.get('/user/:id')
        .then(function (response) {
          commit('postInfos','logUser', response.data)
          console.log(response.data);
        })
        .catch(function() {
        })
      },

    },
    
})

export default store;