<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">

<form @submit="postComment" action="">
        <div class="container mt-4">
            <div class="card">
                <div class="card-header">

                    <div class="orange">
                            <div>
                                <div class="d-flex flex-row center flex-wrap">
                                <input type="text" 
                                v-model="newCom.comments"
                                name="comments">
                                <button type="submit" class="plane m-2"><fa icon="paper-plane"/>
                                </button>
                                </div>
                            </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="color">
                        <div class="coulor container">
                            <div class="d-flex row">
                                <div class="d-flex justify-content-center flex-wrap"><img class="rounded-circle" src="../assets/icon.svg" width="40"></div>
                                <div class="">
                                <p class="card-text">Eodem tempore etiam Hymetii praeclarae indolis viri negotium est actitatum, cuius hunc novimus esse textum.</p>
                                </div>
                            </div>

                        </div>
                            <div class="reply px-4"> <small>supprimer</small> <span class="dots"></span> <small>Répondre</small> <span class="dots"></span> </div>
                    </div>
                </div>
            </div>
        </div>
</form>

</template>

<script>
import authHeader from '../main'
import { mapState } from 'vuex'

export default ({
   name: 'commentaire',

   data: function () {
       return {
           comments: [],
           newCom: {
               comments: null,
           }
       }
   },
   methods: {
    postComment() {
            // let id = newCom.PostId;
          const fd = new FormData();
          fd.append("comments", this.newCom.comments);

         fetch(`http://localhost:3000/api/posts/:id/comment`, { 
            method:'POST', 
            headers: {Authorization: authHeader()} })
         .then(() => {
             alert('Envoyé avec succès'),
             data => this.newCom = data
         })
         .catch(error => console.log('error', error))
    },
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

.container {
    background-color: white;
    width: 70%;
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
    width: 90px;
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
