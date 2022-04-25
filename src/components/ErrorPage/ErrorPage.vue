<template>
  <div class="container page-not-found">
    <h1>Ops, This Page Is Not Found</h1>
    <button @click="goHome()" type="button" class="btn btn-secondary">
      Visit Home Page
    </button>
  </div>
</template>
<script>
export default {
  name: "ErrorPage",
  methods: {
    goHome() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
