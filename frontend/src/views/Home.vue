<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
    crossorigin="anonymous"
  />

  <div id="page_bloc">
    <!-- Formulaire -->
    <section class="bg-image">
      <div class="mask d-flex align-items-center gradient-custom-3">
        <div class="container">
          <div class="row d-flex justify-content-center align-items-center p-3">
            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
              <div class="card" style="border-radius: 15px">
                <div class="card-body">
                  <h1 class="text-center mb-3">S'identifier</h1>

                  <form>
                    <div class="form-outline mb-4">
                      <label class="form-label" for="form3Example3cg"
                        >Email</label
                      >
                      <input
                        v-model="email"
                        type="email"
                        id="formail"
                        class="form-control form-control-lg"
                      />
                    </div>

                    <div class="form-outline mb-4">
                      <label class="form-label" for="form3Example4cg"
                        >Mot de passe</label
                      >
                      <input
                        v-model="password"
                        type="password"
                        id="form3Example4cg"
                        class="form-control form-control-lg"
                      />
                    </div>

                    <div class="form-check d-flex justify-content-center mb-3">
                      <div>
                        <p class="sentence" v-if="mode == 'login'">
                          Vous ne possédez pas encore de compte ?
                          <router-link
                            to="/api/users/signup"
                            @click="switchToCreateAccount()"
                            >Créer un compte</router-link
                          >
                        </p>
                      </div>
                    </div>

                    <div
                      class="form-row m-2 red"
                      v-if="mode == 'login' && status == 'error_login'"
                    >
                      Email et/ou mot de passe invalide
                    </div>

                    <div @click="login()" class="d-flex justify-content-center">
                      <button
                        type="button"
                        class="
                          btn btn-block btn-lg
                          gradient-custom-3
                          text-body
                          rose
                          button
                        "
                      >
                        <span v-if="status == 'loading'"
                          >Connexion en cours...</span
                        >
                        <span v-else>Se connecter</span>
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

    <!-- Footer -->
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
  name: "Login",
  data: function () {
    return {
      mode: "login",
      email: "",
      password: "",
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
    //Lors du clic ça nous renvoie sur les pages formulaire signup/login
    switchToCreateAccount: function () {
      this.mode = "create";
    },
    switchToLogin: function () {
      this.mode = "login";
    },
     //Pour faire des appel à l'API, on appelle l'action Login depuis le store. fonction pour connecter l'utilisateur
    login: function () {
      const self = this;
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(
          function () {
            self.$router.push("/api/users/myprofile");//Une fois connecté, l'utilisateur est redirigé sur la page profil
          },
          function (error) {
            console.log(error);
          }
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

.btn {
  background-color: rgb(255, 215, 215) !important;
}

.red {
  color: rgb(253, 45, 1);
  margin-top: 0;
  padding-top: 0;
}

.sentence {
  margin: 0;
  padding: 0;
}

.footer {
  background-color: rgb(18, 36, 65);
}
</style>
