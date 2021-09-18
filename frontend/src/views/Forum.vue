<template>
 <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">

 <div id="page_bloc">  

     <!-- Navbar -->
   <nav class="navbar navbar-expand-lg navbar-light rose">
  
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link :to="{name: 'Forum', path: '/api/posts/'}" class="link fofo"><fa icon="home"/></router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name: 'Profile', path: '/api/users/myprofile'}" class="link useer"><fa icon="user"/></router-link>
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

    <button v-on:click="updatePost()" class="publi m-2">Voir les publications</button>

    <div v-for="post in posts" v-bind:key="post.id" class="card m-3 p-2 bleu">

        <div class="col photo">
            <div class="container">
                <div class="row">
                  <div class="col-sm-2 d-flex justify-content-start">
                    <img src="../assets/icon.svg" alt="logo" class="rounded rounded-circle ">

                     <div class="col-sm-5 d-flex justify-content-center align-items-start flex-column name">
                    <div>{{ post.User.username }}</div>
                  </div>
                  </div>

                </div>
            </div>
        </div>

        <div class="col all">
            <div class="card d-flex justify-content-center flex-wrap">
                 <p class="d-flex justify-content-center m-3">{{ post.title }}</p>
                <div class="col commentaire m-2">{{ post.content }}</div>
                <div class="col img"><img src="" alt="">{{ post.attachment }}</div>
            </div>

             <div class="col barre">
                    <div class="d-flex flex-row justify-content-center">
                        <div class="col p-3 icone"><fa icon="thumbs-up"/></div>
                        <div class="col p-3 icone"><fa icon="comment-dots"/></div>
                        <div class="col p-3 icone"><fa icon="heart"/></div>
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
import authHeader from '../main'

export default ({
    name: 'Forum',
    components: {
        addPost
    },
    data: function () {
        return {
            posts: [],
        }
    },
    methods: {
        updatePost() {
            console.log(authHeader());

            const myHeaders = new Headers({'Authorization': authHeader()});

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow',
                credentials: 'same-origin'
            };

            console.log(requestOptions)

            fetch("http://localhost:3000/api/posts/getPosts", requestOptions)
                .then(response => response.json())
                .then(data => this.posts = data)
                .catch(error => console.log('error', error));
            
        }
    },
    mounted: function () {
    
    },

    computed: {
       ...mapState({
           user: 'usersInfos',
           userlog: 'logUser'
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

.fofo, .useer {
    color: rgb(209, 81, 90);
    margin-left: 40px;
    padding-top: 10px;
} 

.link {
    font-size: 1.7em;
    display: flex;
    justify-content: flex-end;
    align-content: flex-end;
}

#page_bloc {
    width: 80%;
    margin: auto;
}

.name {
    color: white;
    padding-left: 10px;
    display: flex;
    align-content: center;
    justify-content: center;
}

.publi {
    background-color: rgb(209, 81, 90);
    color: white;
    border-radius: 15px;
    border-style : none; 
    padding: 13px;
    -webkit-transform: scale(1);
	transform: scale(1);
	-webkit-transition: .3s ease-in-out;
	transition: .3s ease-in-out;
}

.publi:hover {
    -webkit-transform: scale(1.3);
	transform: scale(1.1);
}

.photo {
    padding-bottom: 10px;
}

.barre, .bleu {
    background-color: rgb(18, 36, 65) !important;
}

.icone {
    color: white;
    font-size: 1.3em;
}

.card {
    border-radius: 10px;
}

.rouded, .rounded-circle {
    height: 80px;
}
</style>