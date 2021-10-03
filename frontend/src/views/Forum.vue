<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
    crossorigin="anonymous"
  />

  <div id="page_bloc">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light rose">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              :to="{ name: 'Forum', path: '/api/posts/' }"
              class="link forum"
              ><fa icon="home"
            /></router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'Profile', path: '/api/users/myprofile' }"
              class="link linkUser"
              ><fa icon="user"
            /></router-link>
          </li>
        </ul>
      </div>
    </nav>
    <!-- Navbar -->

    <!-- Container -->
    <addPost />

    <section class="container center">
      <div class="col">
        <h3 class="d-flex justify-content-center p-3">
          Dernières participations
        </h3>
      </div>

      <div>
        <button v-on:click="getPost()" class="post m-2">
          Voir les publications
        </button>
      </div>

      <div
        v-for="post in posts"
        :key="post.id"
        class="card m-3 p-1 blue contain"
      >
        <div class="col picture">
          <div class="cross" v-if="isAdmin">
            <button v-on:click="deletePost(post.id)" class="delete">
              <fa icon="trash" />
            </button>
          </div>

          <div class="d-flex flex-direction-row flex-wrap head">
            <img
              src="../assets/icon.svg"
              alt="logo"
              class="rounded rounded-circle img-fluid"
            />

            <div class="flex-wrap p-2 name">
              <div>{{ post.User.username }}</div>
            </div>
          </div>
        </div>

        <div
          class="
            col
            d-flex
            justify-content-center
            flex-column flex-wrap
            contain
          "
        >
          <div class="color">
            <p
              v-if="post.title != null"
              class="d-flex justify-content-center blc"
            >
              {{ post.title }}
            </p>
            <div v-if="post.content != null" class="col commentaire blc">
              {{ post.content }}
            </div>
            <div v-if="post.attachment != null">
              <img
                v-bind:src="post.attachment"
                alt=""
                class="image img-fluid size"
              />
            </div>
          </div>

          <commentaire v-bind:PostId="post.id" />
        </div>
      </div>
    </section>

    <footer>
      <div
        class="text-center p-4 text-black"
        style="background-color: rgb(255, 215, 215)"
      >
        © 2021 Copyright – Groupomania
      </div>
    </footer>
  </div>
</template>

<script>
//Importation des components qui permettent de faire une publicaition(post et comment)
import addPost from "../components/Postcreate.vue";
import commentaire from "../components/Comment.vue";
//Importation de vuex et de authHeader permettant l'authorization lors des requêtes
import { mapState } from "vuex";
import authHeader from "../main";

export default {
  name: "Forum",
  components: {
    addPost,
    commentaire,
  },
  data: function () {
    return {
      posts: [],
    };
  },
  methods: {
    //Récupération des publications
    getPost() {
      fetch("http://localhost:3000/api/posts/getPosts", {
        method: "GET",
        headers: { Authorization: authHeader() },
      })
        .then((response) => response.json())
        .then((data) => (this.posts = data))
        .catch((error) => console.log("error", error));
    },
    //Supprimer une publication
    deletePost(id) {
      
      fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "DELETE",
        headers: { Authorization: authHeader() },
      })
        .then((result) => {
          alert("Votre publication a bien été supprimée"),
            result.json().then((response) => {
              console.warn(response), window.location.reload();
            });
        })
        .catch((error) => console.log(error));
    },
  },
  mounted: function () {
    this.$store.dispatch("getUserInfos"); //Récupération des infos de l'utilisateur
  },
  computed: {
    ...mapState({
      user: "usersInfos",
      userlog: "logUser",
    }),
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
};
</script>

<style scoped>
.forum,
.linkUser {
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
  border-style: none;
  background-color: rgb(18, 36, 65);
  color: white;
}

.center {
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
  margin: 0;
  padding: 5px;
}

.cross {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
}

.post {
  background-color: rgb(209, 81, 90);
  color: white;
  border-radius: 15px;
  border-style: none;
  padding: 13px;
  -webkit-transform: scale(1);
  transform: scale(1);
  -webkit-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
}

.post:hover {
  -webkit-transform: scale(1.3);
  transform: scale(1.1);
}

.picture {
  padding-bottom: 10px;
}

.image {
  object-fit: cover;
}

.contain,
.blue {
  background-color: rgb(18, 36, 65) !important;
  object-fit: contain;
}

.contain {
  object-fit: contain;
}

.card {
  border-radius: 10px;
  object-fit: contain;
  background-color: rgb(18, 36, 65);
}

.rouded,
.rounded-circle {
  height: 80px;
}
</style>