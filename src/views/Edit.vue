<template>
  <div class="container home">
    <Navbar />
    <EditEachRestaurant />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/NavBar/Navbar.vue";
import EditEachRestaurant from "@/components/Restaurant/EditEachRestaurant.vue";
export default {
  name: "Edit",
  components: {
    Navbar,
    EditEachRestaurant,
  },
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

<style lang="scss"></style>
