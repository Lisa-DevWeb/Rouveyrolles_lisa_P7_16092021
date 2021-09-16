<template>
     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">

    <div class="container color">
    <div class="card w-75 p-3 m-2">
        <h1>Ajouter une publication</h1>
        <div class="post">
            <div>
                <h2>Titre du post</h2>
                <input type="text" class="form-control" v-model="titre">
                <form action="">
                    <div class="col">
                        <input type="text" class="form-control" id="service">
                    </div>
                </form>
            </div>

            <div>
            <h2>Description</h2>
                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Example textarea</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="description"></textarea>
                </div>
            </div>

            <div>
                <form class="m-4">
                    <div class="form-group">
                      <label for="exampleFormControlFile1">Ajouter une image de profil</label>
                      <input type="file" class="form-control-file" id="exampleFormControlFile1">
                    </div>
                </form>
            </div>
        </div>

    </div>
</div>
</template>

<script>

export default ({
    name: 'addPost',
})
</script>

<style scoped>

</style>
