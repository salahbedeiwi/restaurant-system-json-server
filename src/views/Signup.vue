<template>
  <div class="container">
    <img src="@/assets/logo.png" class="logoImg rounded d-block mx-auto" />
    <SignUp />
  </div>
</template>

<script>
// @ is an alias to /src
import SignUp from "@/components/SignUp/SignUp.vue";
export default {
  name: "Signup",
  components: {
    SignUp,
  },
};
</script>
