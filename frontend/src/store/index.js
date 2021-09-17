import { createStore } from 'vuex'

const axios = require('axios');

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'http://localhost:3000/api/users/'
  });

// const instancePost = axios.create({
//   racineURL: 'http://localhost:3000/api/posts/'
// });
 
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
      // infosUser: function (state, user, [id, email, username, role, isAdmin, latent]) {
      //   instancePost.defaults.headers.common['Authorization'] = user.token;
      //   state.user.id = id,  
      //   state.user.email = email,
      //   state.user.username = username,
      //   state.user.role = role,
      //   state.user.isAdmin = isAdmin,
      //   state.user.latent = latent,
      //   state.user.token = localStorage.getItem('token')
      // },

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

      // updatePost: ({commit}, usersInfos) => {
      //   const axiosInstance = axios.create({
      //       baseURL: 'http://localhost:3000/api/posts',
      //       headers: { Authorization: `Bearer ${token}` },
      //       });

      //       axiosInstance.get('/getPosts')

      //   commit('logUser', response.data);
      // }

      // getpost: ({commit}, infosUser) => {
      //   instancePost.get('http://localhost:3000/api/posts/getPosts', {
      //     headers: {
      //       Authorization: "Bearer" + localStorage.getItem("token")
      //     }
      //   })
      //   .then(function (response) {
      //     commit('infosUSer', response.data.user);
      //   })
      //   .catch(function () {
      //   });
      // },

      // getPost: ({commit}, infosUser) => {
      //   return new Promise((resolve, reject) => {
      //     console.log(infosUser);
      //     instancePost.get('http://localhost:3000/api/posts/getPosts', {
      //     headers: {
      //       Authorization: "Bearer" + localStorage.getItem("token")
      //     }
      //   })
      //     .then(function (response) {
      //       commit('infosUser', response.data);
      //       commit('logUser', response.data);
      //       resolve(response);
      //     })
      //     .catch(function (error) {
      //       reject(error);
      //     });
      //   })
      // }, 
    },
    
    modules: {

    }

})

export default store;