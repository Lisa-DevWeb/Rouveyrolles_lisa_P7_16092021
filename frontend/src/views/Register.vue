<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">

<div id="page_bloc">
     <!-- Formulaire -->
    <section class="bg-image" v-if="mode == 'create'">
        <div class="mask d-flex align-items-center gradient-custom-3">
          <div class="container">
            <div class="row d-flex justify-content-center align-items-center p-3">
              <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                <div class="card" style="border-radius: 15px;">
                  <div class="card-body">
                    <h1 class="text-center mb-3">S'inscrire</h1>
      
                    <form>

                    <div class="form-outline">
                        <label class="form-label" for="">Nom</label>
                        <input v-model="username" type="text" id="lastName" class="form-control form-control-lg" />
                    </div>

                    <div class="form-outline">
                        <label class="form-label" for="">Prénom</label>
                        <input type="text" id="firstName" class="form-control form-control-lg" />
                    </div>

                      <div class="form-outline">
                        <label for="form-label">Service (Choisissez-en une):</label>
                        <select v-model="role" class="form-control" id="sel1">
                          <option>Administratif</option>
                          <option>Comptabilité</option>
                          <option>Communication</option>
                          <option>Commercial</option>
                          <option>Logistique</option>
                          <option>Marketing</option>
                          <option>Production</option>
                          <option>Ressources Humaines</option>
                        </select>
                      </div>

                    <div class="form-outline">
                        <label class="form-label" for="">Poste occupé</label>
                        <input type="text" id="travail" class="form-control form-control-lg" />
                    </div>
    
                      <div class="form-outline mb-4">
                        <label class="form-label" for="">Email</label>
                        <input v-model="email" type="email" id="mail" class="form-control form-control-lg" />
                      </div>
      
                      <div class="form-outline mb-4">
                        <label class="form-label" for="">Mot de passe</label>
                        <input v-model="password" type="password" id="mdp--password" class="form-control form-control-lg" />
                      </div>
      
                      <div class="form-check d-flex justify-content-center mb-3">
                        <div>
                           <p class="card__subtitle phrase">Vous possédez déjà un compte ? <router-link to="/api/users/login"  @click="switchToLogin()">Se connecter</router-link></p>
                        </div>
                      </div>

                      <div class="form-row m-2 rouge" v-if="mode == 'create' && status == 'error_create'">
                        Adresse mail déjà utilisée
                      </div>
      
                      <div class="d-flex justify-content-center">
                        <button @click="createAccount()" type="button" class="btn btn-block btn-lg gradient-custom-3 text-body rose button"> 
                          <span v-if="status == 'loading'">Création en cours...</span>
                          <span v-else>S'inscrire</span>
                          </button>
                      </div>
      
                    </form>
      
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    <!-- Fin du formulaire -->

    <footer>
         <!-- Copyright -->
  <div class="text-center p-4 text-white footer">
    © 2021 Copyright – Groupomania
  </div>
  <!-- Copyright -->
    </footer>
</div>

      <router-view />
</template>

<script>
import { mapState } from 'vuex'

export default {
   name: 'Create',
   data: function() {
     return {
       mode: 'create',
       email: '',
       username: '',
       password: '',
       role: '',
     }
   },
   mounted: function () {
      if (this.$store.state.user.id != -1) {
           this.$router.push('/api/users/myprofile');
           return;
       }
   },
   computed: {
     ...mapState(['status'])
   },
   methods: {
     switchToCreateAccount: function() {
       this.mode = 'create';
     },
     switchToLogin: function() {
       this.mode = 'login';
     },
     createAccount: function() {
        const self = this;
        this.$store.dispatch('createAccount', {
          username: this.username,
          role: this.role,
          email: this.email,
          password: this.password
        }).then(function () {
            self.$router.push('/api/users/myprofile');
        }, function(error) {
          console.log(error);
        })
     },
   }
}
</script>


<style scoped>
#page_bloc {
    width: 80%;
    margin: auto;
}

.btn {
    background-color: rgb(255, 215, 215) !important;
}

.card__action {
  text-decoration: underline;
  color: #0000EE;
}

.rouge {
  color: rgb(253, 45, 1);
  margin-top: 0;
  padding-top: 0;
}

.phrase {
  margin: 0;
  padding: 0;
}

.footer {
    background-color: rgb(18, 36, 65);
}

</style>
