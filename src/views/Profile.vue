<template>
  <div class="container">
    <Navbar />
    <form @click.prevent>
      <div class="row g-3 align-items-center">
        <h1 class="text-center">Update Profile</h1>
        <div class="col-auto d-block mx-auto">
          <div id="yourName" class="form-text">Your Name</div>
          <input
            type="text"
            class="form-control"
            placeholder="Enter Name"
            v-model="userName"
            disabled
            id="yourName"
            aria-describedby="yourName"
          />
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <div id="yourEmail" class="form-text">Your Email</div>
          <input
            type="email"
            class="form-control"
            placeholder="Enter Your Email"
            v-model="userEmail"
            disabled
            id="yourEmail"
            aria-describedby="yourEmail"
          />
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <div id="yourPass" class="form-text">Your Password</div>
          <input
            type="password"
            class="form-control"
            placeholder="Enter Your Password"
            v-model="userPassword"
            disabled
            id="yourPass"
            aria-describedby="yourPass"
          />
        </div>
      </div>
      <br />

      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <button @click="updateProfile()" class="form-control btn btn-primary">
            Click to Update
          </button>
        </div>
      </div>
      <br />
    </form>
  </div>
</template>

<script>
// import axios from "axios";
import Navbar from "@/components/NavBar/Navbar.vue";
export default {
  name: "Profile",
  components: {
    Navbar,
  },
  data() {
    return {
      // userLoggedInObj: localStorage.getItem("user-info"),
      // userLoggedIn: JSON.parse(localStorage.getItem("user-info")),
      userName: "",
      userEmail: "",
      userId: "",
      userPassword: "",
      listOfResturants: [],
    };
  },
  methods: {
    updateProfile() {
      this.$router.push({ name: "UpdateProfile" });
    },
  },
  async mounted() {
    //validate if user is already signed up... if so redirect to home page and user can't visit sign up page...
    let user = localStorage.getItem("user-info");
    //if user is already signed up, open this home page, else route users to signup page
    if (!user) {
      this.$router.push({ name: "Signup" });
    }else{
      this.userName = JSON.parse(user).name;
      this.userEmail = JSON.parse(user).email;
      this.userId = JSON.parse(user).id;
      this.userPassword = JSON.parse(user).password;
    }
    //get list of restaurants
  },
};
</script>
