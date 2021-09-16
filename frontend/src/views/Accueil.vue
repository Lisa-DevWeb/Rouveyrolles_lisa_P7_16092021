<template>
    <div id="page_bloc">
        <h1>Bienvenue sur Groupomania</h1>
        <router-link to="/api/users/login" class="router-link-active"><img src="../assets/icon.svg" alt=""></router-link>
    </div>
</template>

<script>

export default ({
    name: 'Accueil',
})
</script>

<style scoped>
#page_bloc {
    width: 80%;
    margin: auto;
}

h1 {
    color: rgb(209, 81, 90);
    margin-top: 30px;
}

img {
    margin-top: 40px;
    height: 300px;
    width: auto;
    animation:spin 4s linear infinite;
    -webkit-animation:spin 4s linear infinite;
    -moz-animation:spin 4s linear infinite;
}

@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
</style>