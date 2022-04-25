<template>
  <div class="sign-up-form">
    <div>
      <div class="row g-3 align-items-center">
        <h1 class="text-center">Sign Up</h1>
        <div class="col-auto d-block mx-auto">
          <input
            type="text"
            id="nameIs"
            class="form-control"
            placeholder="Enter your name"
            v-model="name"
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
          <button @click="signUp()" class="form-control btn btn-primary">
            Sign Up
          </button>
          &nbsp; &nbsp;
          <button @click="login()" class="form-control btn btn-primary">
            Login
          </button>
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <!-- Show Validatation here -->
          <p class="red" v-for="(err, i) in showError" :key="i">{{ err }}</p>
        </div>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
//call Axios API
import axios from "axios";
export default {
  name: "SignUp",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      showError: ["", "", "", ""], //name, email, pass, submitted successfully
      validateSucc: [],
    };
  },
  //this method will run before page load
  mounted() {
    //validate if user is already signed up... if so redirect to home page and user can't visit sign up page...
    let user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({ name: "Home" });
    }
  },
  methods: {
    login() {
      this.$router.push({ name: "Login" });
    },
    //remember whenever you send result to API, it will take time, so must use async before method and also await
    async signUp() {
      // must validate before posting this new data
      //   if (this.name == "" || this.name.length < 6) {
      //     this.showError[0] =
      //       "Name Cant be empty and at least has to be 6 chars or more";
      //     this.validateSucc[0] = false;
      //   } else {
      //     this.showError[0] = "";
      //     this.validateSucc[0] = true;
      //   }
      //   if (this.password == "" || this.password.length < 5) {
      //     this.showError[1] =
      //       "password Cant be empty and at least has to be 5 chars or more";
      //     this.validateSucc[1] = false;
      //   } else {
      //     this.validateSucc[1] = true;
      //     this.showError[1] = "";
      //   }
      //   if (this.email == "") {
      //     this.showError[2] = "Email Cant be empty";
      //     this.validateSucc[2] = false;
      //   } else {
      //     this.validateSucc[2] = true;
      //     this.showError[2] = "";
      //   }
      //posting data method: take 2 params. 1. is the url of my json file 2. pass paramters
      //if successful validation is done and true
      //   if (this.validateSucc.indexOf(false) !== -1) {
      //   }
      //army.indexOf("Marcos") !== -1
      // this.showError = ["", "", "", ""]; //clear all
      let result = await axios.post("http://localhost:3000/users", {
        email: this.email,
        name: this.name,
        password: this.password,
      });
      if (result.status == 201) {
        console.log("Signed Up Successfully");
        //find this in local storage
        localStorage.setItem("user-info", JSON.stringify(result.data));
        //redirect user to home page
        this.$router.push({ name: "Home" });
        // //clear all form data
        // this.name = "";
        // this.email = "";
        // this.password = "";
        // this.showError[3] = "";
      } else {
        console.warn("Signed Up Failed");
        // this.showError[3] = "Something went wrong, try again";
      }
      //   console.log("sign up click btn", this.name, this.email, this.password);
      console.warn(result);
    },
  },
};
</script>

<style scoped lang="scss">
form {
  border-radius: 9px;
  margin-top: 15px;
  box-shadow: 2px 2px 3px #eee;
  margin-bottom: 15px;
}
.red {
  color: red;
}
</style>
