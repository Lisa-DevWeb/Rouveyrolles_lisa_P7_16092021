<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
    crossorigin="anonymous"
  />

  <div class="d-flex flex-column container-fluid">
    <div class="row">
      <div class="col p-3 icone"><fa icon="thumbs-up" /></div>
      <div class="col p-3 icone"><fa icon="heart" /></div>
    </div>

    <div>
      <div class="container">
        <form action="">
          <div>
            <div class="card text-center">
              <div class="card-header">
                <form @submit.prevent="postCom(PostId)" action="" class="cote">
                  <input
                    v-model="newCom.comments"
                    type="text"
                    name="comments"
                    class="container-fluid"
                    placeholder="Ecrire un commentaire.."
                  />
                  <button type="submit" class="plane m-2">
                    <fa icon="paper-plane" />
                  </button>
                </form>

                <button
                  v-on:click="getCom(PostId)"
                  type="button"
                  class="btn btn-lg btn-block w-100 bordeau"
                >
                  <fa icon="comment-dots" />
                </button>
              </div>

              <div
                class="card-body"
                v-for="message in messages"
                :key="message.id"
              >
                <div class="color">
                  <div class="coulor container bleu">
                    <div class="d-flex row">
                      <div class="d-flex justify-content-start flex-wrap">
                        <img
                          class="rounded-circle m-2"
                          src="../assets/icon.svg"
                          width="40"
                        />
                        <p class="author">{{ message.User.username }}</p>
                      </div>
                      <div class="">
                        <p class="card-text">{{ message.comments }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="reply px-4">
                    <small>supprimer</small><span class="dots"></span>
                    <small>Répondre</small> <span class="dots"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import authHeader from "../main";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "commentaire",
  props: ["PostId"],

  data: function () {
    return {
      messages: [],
      newCom: {
        comments: "",
      },
    };
  },
  methods: {
    getCom(id) {
      fetch(`http://localhost:3000/api/posts/${id}/comments`, {
        method: "GET",
        headers: { Authorization: authHeader() },
      })
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then((response) => {
          this.messages = response.message;
          console.log(response.message);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    postCom(id) {
      axios
        .post(`http://localhost:3000/api/posts/${id}/comment`, this.newCom, {
          headers: { Authorization: authHeader() },
        })
        .then((response) => window.location.reload(), alert("Message envoyé"), console.log(response))
        .catch((error) => console.log(error));
    },
  },

  computed: {
    ...mapState({
      user: "usersInfos",
      userlog: "logUser",
    }),
  },
};
</script>

<style scoped>
.card-body {
  padding: 10px;
}

.author {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.card-text {
  padding-bottom: 5px;
}

.container {
  background-color: rgb(18, 36, 65);
  width: 70%;
}

.icone {
  color: white;
}

.card {
  border-radius: 4px;
  background-color: rgb(255, 215, 215);
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.textarea {
  margin-right: 10px;
}

.coulor {
  background-color: rgb(255, 215, 215);
  border-radius: 15px;
}

.com {
  background-color: wheat;
  border-radius: 20px;
}

.cote {
  display: flex;
  flex-direction: row;
  margin-bottom: 4px;
}

.bordeau {
  background-color: rgb(209, 81, 90);
  color: white;
}

.bleu {
  background-color: white;
}

.plane {
  background-color: rgb(18, 36, 65);
  color: white;
  border-style: none;
  font-size: 1em;
  border-radius: 15px;
  width: 65px;
  height: 30px;
}
</style>
