<template>
 <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">

     <!-- Navbar -->
   <nav class="navbar navbar-expand-lg navbar-light rose">
        <a class="navbar-brand" href="#"><img src="../assets/icon-left-font-monochrome-black.svg" alt="logo" class="big"></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link :to="{name: 'Forum', path: '/api/posts/'}" class="link">Forum</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name: 'Profile', path: '/api/users/myprofile'}" class="link">Mon compte</router-link>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link disabled" href="#">Notification</a>
                    </li>
                </ul>
            </div>
  </nav>
   <!-- Navbar -->

<!-- Container -->
<addPost/>

<div class="container">
    <div class="col">
        <h3 class="d-flex justify-content-center p-3">Dernières participations</h3>
    </div>

    <button v-on:click="updatePost()">Mettre à jour</button>

    <div v-for="post in posts" v-bind:key="post.id" class="card">
        {{ post }}

        <div class="col vert">
            <div class="container">
                <div class="row">
                  <div class="col-sm-2 d-flex justify-content-center">
                    <img src="../assets/icon.svg" alt="logo" class="rounded rounded-circle ">
                  </div>

                  <div class="col-sm-5 d-flex justify-content-center align-items-start flex-column">
                    <div>Nom Prenom</div>
                    <div>Date</div>
                  </div>

                </div>
            </div>
        </div>

        <div class="col all">
            <p class="d-flex justify-content-center">Titre</p>
            <div class="card">
                <div class="col commentaire">Commentaire ou gif</div>
                <div class="col barre">
                    <div class="d-flex flex-row justify-content-center">
                        <div class="p-2">Comments</div>
                        <div class="p-2">Coeur</div>
                        <div class="p-2">LIKE</div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>

</div>

<footer>
    <!-- Copyright -->
<div class="text-center p-4 text-black" style="background-color: rgb(255, 215, 215);">
© 2021 Copyright – Groupomania
</div>
<!-- Copyright -->
</footer>
    
</template>

<script>
import addPost from '../components/Postcreate.vue'

import { mapState } from 'vuex'
import axios from 'axios'
import setAuthHeader from '../utils/setAuthHeader'

export default ({
    name: 'Forum',
    components: {
        addPost
    },
    data: function () {
        return {
        posts: ["", "", "", ""]
        }
    },
    methods: {
        updatePost() {
            

            // this.$store.dispatch('login', {
            // email: this.email,
            // password: this.password})

            axios.get('http://localhost:3000/api/posts/getPosts')
            .then((response) => {
                localStorage.setItem('token', response.data.token),
                setAuthHeader(response.data.token)
                this.$store.dispatch('getUserInfos');
                this.$store.commit('logUser');
            })
            .catch((err) => console.log(err.response))
        },            
   },
    mounted: function () {
        console.log(this.$store.state.user);
        // this.$store.dispatch('getPost');
        //  this.$store.commit('getPost')
        this.$store.dispatch('getUserInfos');
    },

    computed: {
       ...mapState({
           user: 'usersInfos'
       })
   },


    
})
</script>

<style scoped>
.router-link-active {
    text-decoration: none;
    display: flex;
    justify-content: space-around;
}
</style>