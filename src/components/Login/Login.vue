<template>
  <div class="container">
    <img src="@/assets/logo.png" class="logoImg rounded d-block mx-auto" />
    <form @click.prevent>
      <div class="row g-3 align-items-center">
        <h1 class="text-center">Login</h1>
        <div class="col-auto d-block mx-auto">
          <input
            type="email"
            id="emailIs"
            class="form-control"
            placeholder="Enter your Email"
            v-model="email"
          />
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <input
            type="password"
            id="passIs"
            class="form-control"
            placeholder="Enter your Password"
            aria-describedby="passwordHelpInline"
            v-model="password"
          />
        </div>
      </div>
      <br />

      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <button @click="login()" class="form-control btn btn-primary">
            Login
          </button>
          &nbsp; &nbsp;
          <button @click="signUp()" class="form-control btn btn-primary">
            Sign Up Now
          </button>
        </div>
      </div>
      <br />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    signUp() {
      this.$router.push({ name: "Signup" });
    },
    async login() {
      let result = await axios.get(
        `http://localhost:3000/users?email=${this.email}&password=${this.password}`
      );
      console.log("user clicked in login", this.email, this.password);
      console.log(result);
      if (result.status == 200 && result.data.length > 0) {
        localStorage.setItem("user-info", JSON.stringify(result.data[0]));
        this.$router.push({ name: "Home" });
      }
    },
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>
