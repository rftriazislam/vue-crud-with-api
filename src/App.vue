<template>
  <Navbar />
  <router-view />
  <Footer />
</template>
<script>
import Navbar from "./components/main/Navbar.vue";

import Footer from "./components/main/Footer.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}
@import "~bootstrap/dist/css/bootstrap.css";
</style>
