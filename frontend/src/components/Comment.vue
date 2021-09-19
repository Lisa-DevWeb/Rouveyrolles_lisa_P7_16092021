<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">

    <div class="container mt-4">
        <div class="">
            <div class="col-md-8">
                <div class="col p-3 commentaire">
                    <div class="d-flex justify-content-between align-items-start">
                        <div class="user d-flex flex-row align-items-center"> <img src="../assets/icon.svg" width="30" class="user-img rounded-circle mr-2"> <span><small class="font-weight-bold text-primary">Nom_User</small> <small class="font-weight-bold">C'est cool</small></span> </div>
                    </div>
                    <div class="action d-flex justify-content-between mt-2 align-items-center">
                        <div class="reply px-4"> <small>supprimer</small> <span class="dots"></span> <small>Répondre</small> <span class="dots"></span> </div>
                        <div class="icons align-items-center"> <i class="fa fa-star text-warning"></i> <i class="fa fa-check-circle-o check-icon"></i> </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

export default ({
   name: 'commentaire',
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
