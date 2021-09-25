<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">

    <div class=" d-flex flex-column container-fluid">
            <div class="row">
                <div class="col p-3 icone"><fa icon="thumbs-up"/></div>
                <button v-on:click="getCom(PostId)" class="col p-3 icone"><fa icon="comment-dots"/></button>
                <div class="col p-3 icone"><fa icon="heart"/></div>
            </div>
                        
            <div>
            <div class="container colour">

                <form action="">
                    <div>

                        <div class="card text-center">
                            <div class="card-header">
                               <form action="">
                                   <input type="text" name="comments" class="container-fluid" placeholder="Ecrire un commentaire..">
                                    <button type="submit" class="plane m-2"><fa icon="paper-plane"/></button>
                               </form>
                               
                            </div>

                            <div class="card-body" v-for="message in messages" :key="message.id">
                                        <div class="color">
                                            <div class="coulor container">
                                                <div class="d-flex row">
                                                    <div class="d-flex justify-content-center flex-wrap"><img class="rounded-circle" src="../assets/icon.svg" width="40"></div>
                                                    <div class="">
                                                        <p class="author">{{ message.User.username }}</p>
                                                        <p class="card-text">{{ message.comments }}</p>
                                                    </div>
                                                </div>

                                            </div>
                                                <div class="reply px-4"> <small>supprimer</small> <span class="dots"></span> <small>Répondre</small> <span class="dots"></span> </div>
                                        </div>
                            </div>

                        </div>

                    </div>
                </form>

                    <!-- <form @submit="postComment" action="">
                        <div class="container colour">
                            <div class="card orange">
                                <div class="card-header">
                                    <div class="orange">
                                            <form @submit="postCom">
                                                <div class="d-flex flex-row center flex-wrap">
                                                <input type="text" 
                                                name="comments"
                                                >
                                                <button type="submit" class="plane m-2"><fa icon="paper-plane"/>
                                                </button>
                                                </div>
                                            </form>
                                    </div>
                                </div>

                                <div class="card-body" v-for="comment in comments" :key="comment.id">
                                    <div class="color">
                                        <div class="coulor container">
                                            <div class="d-flex row">
                                                <div class="d-flex justify-content-center flex-wrap"><img class="rounded-circle" src="../assets/icon.svg" width="40"></div>
                                                <div class="">
                                                    <p class="author">{{ comment.User.username }}</p>
                                                    <p class="card-text">{{ comment.comments }}</p>
                                                </div>
                                            </div>

                                        </div>
                                            <div class="reply px-4"> <small>supprimer</small> <span class="dots"></span> <small>Répondre</small> <span class="dots"></span> </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </form> -->

            </div>
            </div>
    </div>


</template>

<script>
import authHeader from '../main'
// import axios from 'axios'
import { mapState } from 'vuex'

export default ({
   name: 'commentaire',
   props: ['PostId'] ,

   data: function () {
       return {
           messages: [],
       }
    },
   methods: {
        getCom(id) {

                fetch(`http://localhost:3000/api/posts/${id}/comments`, { method:'GET', headers: {Authorization: authHeader()} })
                .then(function(res) {
                    if (res.ok) {
                    return res.json();
                    }
                })
                .then((response) => {
                    this.messages = response.message;
                    console.log(response.message)
                })
                // .then(function(value) {
                //     console.log(value);
                // })
                .catch(function(err) {
                    // Une erreur est survenue
                    console.log(err)
                });
        }
    //    postCom(e) {
    //        console.log(this.comments);
    //         e.preventDefault()
            
    //         //L'interface FormData permet de construire facilement un ensemble de paires clé/valeur représentant les champs du formulaire et leurs valeurs, qui peuvent ensuite être facilement envoyées en utilisant la méthode XMLHttpRequest.send() de l'objet XMLHttpRequest. 
    //         const formaData = new FormData();
    //         formaData.append('comments', this.newCom.comments);

    //         console.log(this.newCom.comments);

    //         axios.post("http://localhost:3000/api/posts/:id/comment", formaData,
    //         { headers: {Authorization: authHeader()} })
    //         .then(
    //             alert('Envoyé avec succès'),
    //             window.location.reload(),
    //             data => this.newCom = data
    //         )
    //         .catch(error => console.log('error', error))

    //    },
    
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
.colour {
    background-color: yellow !important;
}

.orange {
    background-color: thistle !important;
}

.container {
    background-color: white;
    width: 70%;
}

.icone {
    color:  white;
}

.card {
    border: none;
    box-shadow: 5px 6px 6px 2px #e9ecef;
    border-radius: 4px
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

.orange {
    background-color: violet !important;
}

/* .orange {
    background-color: orange !important;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
} */

.commentaire {
    background-color: grey;
}

.com {
    background-color: wheat;
    border-radius: 20px;
}

.plane {
    background-color: rgb(255, 215, 215);
    color: rgb(253, 45, 1);
    border-style : none; 
    font-size: 1em;
    border-radius: 15px;
    width: 65px;
    height: 30px;
    /* display: flex;
    justify-content: center;
    align-items: center; */
}

/* .commentaire {
    background-color: yellow !important;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
} */

.dots {
    height: 4px;
    width: 4px;
    margin-bottom: 2px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block
}

.badge {
    padding: 7px;
    padding-right: 9px;
    padding-left: 16px;
    box-shadow: 5px 6px 6px 2px #e9ecef
}

.user-img {
    margin-top: 4px
}

.check-icon {
    font-size: 17px;
    color: #c3bfbf;
    top: 1px;
    position: relative;
    margin-left: 3px
}

.form-check-input {
    margin-top: 6px;
    margin-left: -24px !important;
    cursor: pointer
}

.form-check-input:focus {
    box-shadow: none
}

.icons i {
    margin-left: 8px
}

.reply {
    margin-left: 12px
}

.reply small {
    color: #b7b4b4
}

.reply small:hover {
    color: green;
    cursor: pointer
}
</style>
