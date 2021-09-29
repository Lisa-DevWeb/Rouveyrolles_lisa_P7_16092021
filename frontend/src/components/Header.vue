<template>
  <div id="page_bloc">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark infos">
      <a class="navbar-brand" href="#"
        ><router-link to="/">
          <img
            src="../assets/icon-left-font-monochrome-white.svg"
            alt="logo" /></router-link
      ></a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item d-flex">
            <a class="nav-link" href="#"
              ><router-link to="/api/users/login" class="router-link-active"
                >S'identifier</router-link
              ></a
            >
            <a class="nav-link" href="#"
              ><router-link to="/api/users/signup" class="router-link-active"
                >S'inscrire</router-link
              ></a
            >
          </li>
        </ul>
      </div>
    </nav>
  </div>

  <router-view />
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
#page_bloc {
  width: 80%;
  margin: auto;
}

.navbar {
  background-color: rgb(18, 36, 65);
}

nav img {
  height: 40px;
  padding-left: 20px;
}

.router-link-active {
  text-decoration: none;
  color: white;
  font-size: 1.2em;
}
</style>
