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

        <section class="container milieu">
            <div class="col">
                <h3 class="d-flex justify-content-center p-3">Dernières participations</h3>
            </div>

            <button v-on:click="getPost()" class="publi m-2">Voir les publications</button>

            <div v-for="post in posts" v-bind:key="post.id" class="card m-3 p-1 bleu">

                <div class="col photo">
                    <div class="cross">
                        <button class="delete"><fa icon="trash"/></button>
                    </div>

                    <div class="d-flex flex-direction-row flex-wrap head">
                        <img src="../assets/icon.svg" alt="logo" class="rounded rounded-circle img-fluid">

                            <div class="flex-wrap p-2 name">
                              <div>{{ post.User.username }}</div>
                            </div>
                    </div>
                </div>

                <div class="col d-flex justify-content-center flex-wrap barre">

                    <div class="m-2">
                        <p v-if="post.title != null" class="d-flex justify-content-center m-3 blc">{{ post.title }}</p>
                        <div v-if="post.content != null" class="col commentaire m-2 blc">{{ post.content }}</div>
                        <div v-if="post.attachment != null" class="card container-fluid">
                            <img v-bind:src="post.attachment" alt="" class="img-fluid image">
                        </div>
                    </div>

                    
                    <div class=" d-flex flex-column container-fluid">
                        <div class="row">
                            <div class="col p-3 icone"><fa icon="thumbs-up"/></div>
                            <div class="col p-3 icone"><fa icon="comment-dots"/></div>
                            <div class="col p-3 icone"><fa icon="heart"/></div>
                        </div>
                        
                        <div>
                                <commentaire/>
                        </div>
                    </div>

                </div>

            </div>

        </section>

        <footer>
            <div class="text-center p-4 text-black" style="background-color: rgb(255, 215, 215);">
            © 2021 Copyright – Groupomania
            </div>
        </footer>

    </div>
    
</template>

<script>
import addPost from '../components/Postcreate.vue'
import commentaire from '../components/Comment.vue';

import { mapState } from 'vuex'
import authHeader from '../main'

export default ({
    name: 'Forum',
    components: {
        addPost, 
        commentaire,
    },
    data: function () {
        return {
            posts: [],
        }
    },
    methods: {
        getPost() {
            console.log(authHeader());

            fetch("http://localhost:3000/api/posts/getPosts", { headers: {Authorization: authHeader()} })
                .then(response => response.json())
                .then(data => this.posts = data)
                .catch(error => console.log('error', error));
            
        },
        // deletePost(id) {
        //     this.posts.id = id;
        //     console.log(id);

        //     const myHeaders = new Headers({'Authorization': authHeader()});

        //     var requestOptions = {
        //         method: 'DELETE',
        //         headers: myHeaders,
        //         redirect: 'follow',
        //         credentials: 'same-origin'
        //     };

        //     fetch("http://localhost:3000/api/posts/:id", requestOptions)
        //         .then(response => response.json())
        //         .then(data => this.posts = data)
        //         .catch(error => console.log('error', error));
        // }
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

.delete {
    border-style : none; 
    background-color: rgb(18, 36, 65);
    color: white;
}

.milieu {
    width: 70%;
}

.head {
    margin-left: 10px;
}

.name {
    color: white;
    padding-left: 10px;
}

.blc {
    color: white;
}

.cross {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    width: 100%;
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

.image {
    height: 40%;
    object-fit: cover; 
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
    object-fit: contain;
    background-color: rgb(18, 36, 65);
}

.rouded, .rounded-circle {
    height: 80px;
}
</style>