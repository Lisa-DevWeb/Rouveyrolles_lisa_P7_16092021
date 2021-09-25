<template>
     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">

 <div id="page_bloc">  

    <form @submit="postData" class="container color d-flex justify-content-center">
        <div class="card w-75 p-3 m-2">
            <h1>Ajouter une publication</h1>
        <div class="post">
            <div>
                <h2>Titre du post</h2>
                <form action="">
                    <div class="col">
                        <input type="text" name="title" v-model="newPost.title" class="form-control" id="service">
                    </div>
                </form>
            </div>

            <div>
            <h2>Description</h2>
                <div class="form-group">
                    <textarea name="content" v-model="newPost.content" class="form-control" id="texta" rows="3"></textarea>
                </div>
            </div>

            <div>
                <form class="m-4">
                    <div class="form-group">
                      <label for="File">Ajouter un fichier</label>
                      <input @change="onfileSelected" type="file" name="attachment" ref="file" class="form-control-file" id="addPicture" accept=".jpg, .jpeg, .gif, .png">
                    </div>
                </form>
            </div>
        </div>

        <div class="flex">
        <button type="submit" class="plane"><fa icon="paper-plane"/></button>
        </div>

    </div>
    </form>
 </div>

</template>

<script>
import authHeader from '../main'
import { mapState } from 'vuex'
import axios from 'axios'

export default ({
    name: 'addPost',

    data: function () {
        return {
            newPost: {
                title: null,
                content: null,
                attachment: null,
            }
        }
    },
    methods: {
        onfileSelected() {
            this.attachment = this.$refs.file.files[0];
        },
        postData(e) {

            console.log(this.newPost);
            e.preventDefault()

             const fd = new FormData();
             fd.append("title", this.newPost.title);
             fd.append("content", this.newPost.content);
             fd.append("attachment", this.attachment);
             console.log("test recup", fd.get("title"));
             console.log("Test recup", fd.get("content"));

            axios.post("http://localhost:3000/api/posts/new", fd, { headers: {Authorization: authHeader()} })
            .then(
                alert('Envoyé avec succès. Pour voir votre publication, cliquez sur le bouton indiqué'),
                // window.location.reload(),
                data => this.newPost = data
                )
            .catch(error => console.log('error', error));

            console.log(new Headers);           
        }

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
#page_bloc {
    width: 80%;
    margin: auto;
}

.plane {
    background-color: rgb(255, 215, 215);
    color: rgb(253, 45, 1);
    border-style : none; 
    font-size: 1.3em;
    border-radius: 15px;
    width: 120px;
}

.flex {
    display: flex;
    align-content: center;
    justify-content: center;
}

form input {
    display: flex;
    flex-wrap: wrap;
}

.form-group {
    overflow: hidden;
}
</style>
