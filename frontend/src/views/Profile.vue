<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
    crossorigin="anonymous"
  />

  <div id="page_bloc">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light">
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

    <!-- Editer profil -->
    <div class="background">
      <div class="card m-2">
        <div class="w-75 hidden">
          <div class="flexbox">
            <button @click="logout()" class="btn m-2">Déconnexion</button>
          </div>

          <div class="card m-2 blc">
            <h1 class="m-2">Vos coordonées</h1>

            <div
              class="d-flex justify-content-center align-items-center content"
            >
              <div class="rounded-circle">
                <img src="../assets/icon.svg" alt="photo de profil" />
              </div>
            </div>

            <div class="col">
              <div class="d-flex flex-wrap justify-content-center flex-column">
                <p>{{ user.username }}</p>
                <p>{{ user.email }}</p>
                <p>{{ user.role }}</p>
              </div>
            </div>
          </div>

          <div class="all">
            <form class="m-4">
              <div class="form-group">
                <label for="ajoutImg" class="p-2 text-white"
                  >Ajouter une image de profil</label
                >
                <input type="file" class="form-control-file input" id="addpicture" />
              </div>
            </form>
          </div>
        </div>

        <button type="button" class="btn fs-5 disabled">Editer</button>

        <div class="delete m-2 d-flex justify-content-center">
          <button
            @click="deleteUser"
            type="button"
            class="btn rouge text-white"
          >
            Supprimer mon compte
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer>
      <div
        class="text-center p-4 text-black"
        style="background-color: rgb(255, 215, 215)"
      >
        © 2021 Copyright – Groupomania
      </div>
    </footer>
  </div>

  <router-view />
</template>

<script>
import { mapState } from "vuex";
import authHeader from "../main";

export default {
  name: "Profile",
  mounted: function () {
    if (this.$store.state.user.id == -1) {
      this.$router.push("/api/users/login");
      return;
    } //Si l'id de l'utilisateur est -1, il est considéré comme déconnecté. Dans ce cas, il es redirigé vers la page de connexion
    this.$store.dispatch("getUserInfos");//Récupération des informations de l'utilisateur
  },
  computed: {
    ...mapState({
      user: "usersInfos",
    }),
     isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
  methods: {
    //Fonction déconnexion
    logout: function () {
      this.$store.commit("logout");//Appel de la mutation logout depuis le store
      this.$router.push("/api/users/login");//Redirection vers la page de connexion
    },
    //Fonction pour supprimer le compte de l'utilisateur et supression dans la base de données
    deleteUser() {
      let userId = localStorage.getItem("user");
      console.log(userId)

        fetch("http://localhost:3000/api/users/delete", { method:'DELETE', headers: {Authorization: authHeader()} })
        .then(localStorage.removeItem("user"))
        .then((location.href = "/"), alert('Votre compte a été supprimé avec succès'));
    },
  },
};
</script>

<style scoped>
#page_bloc {
  width: 80%;
  margin: auto;
}

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

.flexbox {
  display: flex;
  justify-content: flex-end;
  align-content: flex-end;
}

.card {
    background-color: rgb(209, 81, 90);
}

.blc {
    background-color: white;
}

h1, p {
  margin: 0;
}

h1 {
  font-size: 1.3em;
}

.background {
  display: flex;
  justify-content: center;
  align-items: center;
}

.rounded-circle {
  width: 100px;
  height: 100px;
}

.hidden {
   overflow: hidden; 
}

.card {
  display: flex;
  justify-content: center;
  align-items: center;
}

.delete {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-end;
}

.btn {
  background-color: rgb(255, 215, 215) !important;
}

.rouge {
  background-color: rgb(253, 45, 1) !important;
}
</style>