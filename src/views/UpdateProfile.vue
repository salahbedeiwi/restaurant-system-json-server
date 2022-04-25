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
            id="yourPass"
            aria-describedby="yourPass"
          />
        </div>
      </div>
      <br />

      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <button @click="updateProfile()" class="form-control btn btn-primary">
            Update Now
          </button>
        </div>
      </div>
      <br />
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "@/components/NavBar/Navbar.vue";
export default {
  name: "UpdateProfile",
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
  methods: {
    async updateProfile() {
      let result = await axios.put(
        `http://localhost:3000/users/${this.userId}`,
        {
          email: this.userEmail,
          name: this.userName,
          password: this.userPassword,
        }
      );
      console.log(result);
      if (result.status == 200) {
        // localStorage.clear(); //clear old data and update it with new data
        localStorage.setItem("user-info", JSON.stringify(result.data));
        console.log(JSON.stringify(result.data));
        this.$router.push({ name: "Profile" });
      }
    },
  },
};
</script>
