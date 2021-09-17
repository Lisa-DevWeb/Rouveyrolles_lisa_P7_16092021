import { createStore } from 'vuex'

const axios = require('axios');

// Set config defaults when creating the instance
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
      // thePost: {},
      // postList: [{
      //   id: '',
      //   userId: '',
      //   title: '',
      //   content: '',
      //   attachment: '',
      //   isModerate: '',
      // }],
      // getters: {
      //   getPost(state) {
      //     return state.postList;
      //   },
      //   getthePost(state) {
      //     return state.thePost;
      //   }
      // }
      
    },
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
      logout: function (state) {
        state.user = {
          id: -1,
          token: '',
        }
        localStorage.removeItem('user');
      },
      // setThepost (state, post) {
      //   let postFound = {};
      //   state.postList.forEach((post) => {}) 
      // }

    },
    actions: {
      login: ({commit}, usersInfos) => {
        commit('setStatus', 'loading');
        return new Promise((resolve, reject) => {
          console.log(usersInfos);
          instance.post('/login', usersInfos)
          .then(function (response) {
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
            commit('setStatus', 'created');
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

    },
    
    modules: {

    }

})

export default store;