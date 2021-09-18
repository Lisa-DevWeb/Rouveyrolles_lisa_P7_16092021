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
                    <label for="exampleFormControlTextarea1">Example textarea</label>
                    <textarea name="content" v-model="newPost.content" class="form-control" id="texta" rows="3"></textarea>
                </div>
            </div>

            <div>
                <form class="m-4">
                    <div class="form-group">
                      <label for="exampleFormControlFile1">Ajouter un fichier</label>
                      <input type="file" name="attachment" class="form-control-file" id="addPicture">
                    </div>
                </form>
            </div>
        </div>

        <button type="submit"><fa icon="paper-plane"/></button>

    </div>
    </form>
 </div>

</template>

<script>
import authHeader from '../main'
import { mapState } from 'vuex'
// import authHeader from '../main'

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
        postData(e) {
            console.log(this.posts);
             console.log(authHeader());

            e.preventDefault()

            const myHeaders = new Headers({'Authorization': authHeader()});

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                redirect: 'follow',
                credentials: 'same-origin'
            };

            console.log(requestOptions)

            fetch("http://localhost:3000/api/posts/new", {requestOptions})
                .then(response => response.json())
                // .then(data => this.posts = data)
                .catch(error => console.log('error', error));


        }

        //  console.log(authHeader());

        //     const myHeaders = new Headers({'Authorization': authHeader()});

        //     var requestOptions = {
        //         method: 'GET',
        //         headers: myHeaders,
        //         redirect: 'follow',
        //         credentials: 'same-origin'
        //     };

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
</style>
