<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
    crossorigin="anonymous"
  />
  <div id="page_bloc">
    <!-- Formulaire -->
    <section class="bg-image" v-if="mode == 'create'">
      <div class="mask d-flex align-items-center gradient-custom-3">
        <div class="container">
          <div class="row d-flex justify-content-center align-items-center p-3">
            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
              <div class="card" style="border-radius: 15px">
                <div class="card-body">
                  <h1 class="text-center mb-3">S'inscrire</h1>

                  <form method="post" @click="checkForm">

                    <div class="form-outline">
                      <label class="form-label" for="username"
                        >Nom et prénom</label
                      >
                      <input
                        v-model="username"
                        type="text"
                        name="username"
                        id="username"
                        class="form-control form-control-lg"
                      />
                    </div>

                    <div class="form-outline">
                      <label for="form-label" class="space"
                        >Service (Choisissez-en une):</label
                      >
                      <select
                        v-model="role"
                        name="role"
                        class="form-control"
                        id="role"
                      >
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

                    <div class="form-outline mb-4">
                      <label class="form-label space" for="">Email</label>
                      <input
                        v-model="email"
                        type="email"
                        name="email"
                        id="email"
                        class="form-control form-control-lg"
                      />
                    </div>

                    <div class="form-outline mb-4">
                      <label class="form-label" for="">Mot de passe</label>
                      <input
                        v-model="password"
                        type="password"
                        name="password"
                        id="password"
                        class="form-control form-control-lg"
                      />
                    </div>

                    <div class="form-check d-flex justify-content-center mb-3">
                      <div>
                        <p class="card__subtitle sentence">
                          Vous possédez déjà un compte ?
                          <router-link
                            to="/api/users/login"
                            @click="switchToLogin()"
                            >Se connecter</router-link
                          >
                        </p>
                      </div>
                    </div>

                     <div class="error m-2" v-for="error in formErrors" v-bind:key="error.id">
                        {{error}}
                    </div>

                    <div class="d-flex justify-content-center">
                      <button
                        @click="createAccount()"
                        type="button"
                        class="
                          btn btn-block btn-lg
                          gradient-custom-3
                          text-body
                          rose
                          button
                          m-2
                        "
                      >
                        <span v-if="status == 'loading'"
                          >Création en cours...</span
                        >
                        <span
                          type="submit"
                          class="send-button btn"
                          value="submit"
                          v-else
                          >S'inscrire</span
                        >
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
import { mapState } from "vuex";


export default {
  name: "Create",
  data: function () {
    return {
      mode: "create",
      email: null,
      username: null,
      password: null,
      role: null,
      formErrors: [],
    };
  },
  mounted: function () {
    if (this.$store.state.user.id != -1) {
      this.$router.push("/api/users/myprofile");
      return;
    } //Si l'id de l'utilisateur n'est pas -1, il est considéré comme étant connecté. Redicretion vers la page de profil
  },
  computed: {
    ...mapState(["status"]),
  },
  methods: {
    switchToCreateAccount: function () {
      this.mode = "create";
    },
    switchToLogin: function () {
      this.mode = "login";
    },
    //Verifier les champs du Formulaire. S'ils sont vide, l'erreur est indiqué à l'utilisateur
    checkForm: function (e) {
      this.formErrors = [];

      if(!this.username) {
        this.formErrors.push("Veuillez inscrire votre nom")
      }
      if(!this.role) {
        this.formErrors.push("Veuillez sélectionner un service")
      }
      if(!this.email) {
        this.formErrors.push("Veuillez indiquer une adresse-mail")
      }
      if(!this.password) {
        this.formErrors.push("Veuillez indiquer un mot de passe. Mot de passe requis : 8 caractères minimun. -Inclure au moins 1 lettre minuscule - 1 lettre majuscule - 1 chiffre - 1 caractère spécial = !@#$%^&*")
      }

      e.preventDefault();
    },
    //Pour faire des appel à l'API, on appelle l'action CreateAccount depuis le store. Fonction pour créer un compte utilisateur
    createAccount: function () {
      const self = this;
      this.$store
        .dispatch("createAccount", {
          username: this.username,
          role: this.role,
          email: this.email,
          password: this.password,
        })
        .then(
          function () {
            self.$router.push("/api/users/myprofile");//Une fois connecté, l'utilisateur est redirigé sur la page profil
          },
        );
    },
  },
};
</script>

<style scoped>
#page_bloc {
  width: 80%;
  margin: auto;
}

.error {
  color:rgb(253, 45, 1);
}

.btn {
  background-color: rgb(255, 215, 215) !important;
}

.space {
  margin-top: 15px;
}

.sentence {
  margin: 0;
  padding: 0;
}

.footer {
  background-color: rgb(18, 36, 65);
}
</style>
