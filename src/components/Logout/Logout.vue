<template>
  <div class="container">
    <h1>Logout</h1>
  </div>
</template>

<script>
export default {
  name: "Logout",
  //this method will run before page load
  mounted() {
    //validate if user is already signed up... if so redirect to home page and user can't visit sign up page...
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "Signup" });
    }
  },
};
</script>
