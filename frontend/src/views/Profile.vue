<template>
     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">

      <!-- Navbar -->
   <nav class="navbar navbar-expand-lg navbar-light rose">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link :to="{name: 'Forum', path: '/api/posts/'}">Forum</router-link>
                    <!-- <a class="nav-link" href="./forum.html">Publication</a> -->
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name: 'Profile', path: '/api/users/myprofile'}">Mon compte</router-link>
                    <!-- <a class="nav-link" href="./compte.html">Mon compte</a> -->
                    </li>
                    <li class="nav-item">
                    <a class="nav-link disabled" href="#">Notification</a>
                    </li>
                </ul>
            </div>
  </nav>
   <!-- Navbar -->

   <!-- Editer profil -->
   <div class="color">
    <div class="card p-3 m-2">

<div class="w-75">
            <div>
                <button @click="logout()" class="btn deco">Déconnexion</button>
            </div>

        <div class="card-body rounded-circle m-3 red"><img src="../assets/icon.svg" alt="photo de profil"></div>

        <div>
            <p>{{user.email}} {{user.username}} {{user.role}}</p>
        </div>

        <!-- <div>
          <p>{{ user.email }} {{ user.username }} {{ user.role }} </p>
        </div> -->

        <div class="col row cote">
            <p>Nom:</p>
            <form action="">
                    <div class="col">
                      <input type="text" class="form-control" id="nom">
                    </div>
            </form>

            <p>Prenom</p>
            <form action="">
                <div class="col">
                    <input type="text" class="form-control" id="prenom">
                </div>
            </form>
        </div>
        
        <div class="col row cote">
            <p>Poste:</p>
            <form action="">
                <div class="col">
                    <input type="text" class="form-control" id="poste">
                </div>
            </form>


            <p>Service:</p>
            <form action="">
                <div class="col">
                    <input type="text" class="form-control" id="service">
                </div>
            </form>
        </div>

        <div class="all">
            <form class="m-4">
                <div class="form-group">
                  <label for="ajoutImg">Ajouter une image de profil</label>
                  <input type="file" class="form-control-file" id="addpicture">
                </div>
            </form>
        </div>
</div>

        <button type="button" class="btn fs-5">Editer</button>

        <div class="delete m-2 d-flex justify-content-center">
            <button type="button" class="btn rouge text-white">Supprimer mon compte</button>
        </div>
      </div>
      
    </div>

    <!-- Footer -->
    <footer>
        <!-- Copyright -->
 <div class="text-center p-4 text-black" style="background-color: rgb(255, 215, 215);">
   © 2021 Copyright – Groupomania
 </div>
 <!-- Copyright -->
   </footer>

<router-view />
</template>

<script>
import { mapState } from 'vuex'

export default ({
   name: 'Profile',
   mounted: function () {
       console.log(this.$store.state.user);
       if (this.$store.state.user.id == -1) {
           this.$router.push('/api/users/login');
           return;
       }
       this.$store.dispatch('getUserInfos');
   },
   computed: {
       ...mapState({
           user: 'usersInfos'
       })
   },
   methods: {
       logout: function () {
           this.$store.commit('logout');
           this.$router.push('/api/users/login');
       }
   }
})
</script>

<style scoped>

.deco {
    display: flex;
    justify-content: flex-end;
    align-content: flex-end;
}

.rose {
    background-color: rgb(255, 215, 215) !important;
}

.color {
    background-color: orange;
    display: flex;
    justify-content: center;
    align-items: center;
}

.rounded-circle {
    width: 100px;
    height: 100px;
}

.card {
    display: flex;
    justify-content: center;
    align-items: center;
}

.nom {
    display: flex;
    justify-content: space-evenly;
    width: 14%;
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


.post {
    background-color: lightblue;
}

.vert {
    background-color: bisque;
    width: 100%;
}

.rounded {
    background-color: rgb(30, 183, 210);
}

.petit {
    height: 180%;
}

.contenu {
    background-color: chocolate;
    width: 100%;
    height: 100%;
    padding: 20px;
}

.all {
    width: 100%;
    background-color: pink;
}

.red {
    background-color: plum;
}


</style>