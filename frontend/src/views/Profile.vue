<template>
     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">

<div id="page_bloc">

       <!-- Navbar -->
   <nav class="navbar navbar-expand-lg navbar-light">
  
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

   <!-- Editer profil -->
   <div class="color">
    <div class="card p-3 m-2">

<div class="w-75">
        <div class="deco">
            <button @click="logout()" class="btn">Déconnexion</button>
        </div>

<div class="card m-2">
        <h1>Vos coordonées</h1>

        <div class="d-flex justify-content-center align-items-center content">
            <div class="rounded-circle profil">
                <img src="../assets/icon.svg" alt="photo de profil">
            </div>
        </div>
        
        <div class="col row cote">
             <div class="col row cote">
                    <div>
                        <p>{{user.username}} </p> 
                        <p>{{user.email}}</p>
                    </div>
                </div>

            <p>Poste:</p>
            <form action="">
                <div class="col">
                    <input type="text" class="form-control" id="poste">
                </div>
            </form>


            <p class="p-2">Service:</p>
            <form action="">
                <div class="col">
                    <input type="text" class="form-control" id="service">
                </div>
            </form>
        </div>
</div>

        <div class="all">
            <form class="m-4">
                <div class="form-group">
                  <label for="ajoutImg" class="p-2">Ajouter une image de profil</label>
                  <input type="file" class="form-control-file" id="addpicture">
                </div>
            </form>
        </div>
</div>

        <button type="button" class="btn fs-5 disabled">Editer</button>

        <div class="delete m-2 d-flex justify-content-center">
            <button @click="deleteUser" type="button" class="btn rouge text-white">Supprimer mon compte</button>
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
</div>

<router-view />
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import authHeader from '../main'

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
       },
       deleteUser() {
           let userId = localStorage.getItem('user');
           console.log(userId);

            axios.delete("http://localhost:3000/api/users/delete", { headers: {Authorization: authHeader()} })
            .then(localStorage.removeItem('user'))
            .then(location.href = "/")
       },
   }
})
</script>

<style scoped>
#page_bloc {
    width: 80%;
    margin: auto;
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

.deco {
    display: flex;
    justify-content: flex-end;
    align-content: flex-end;
}

.rose {
    background-color: rgb(255, 215, 215) !important;
}

.color {
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

</style>