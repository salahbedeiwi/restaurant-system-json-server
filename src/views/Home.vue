<template>
  <div class="container home">
    <Navbar />
    <p class="text-end">
      Welcome {{ userName }}
      <router-link :to="{ name: 'Profile' }">
        <button class="btn btn-info" type="button">Profile</button>
      </router-link>
    </p>
    <table class="table caption-top" v-if="listOfResturants.length > 0">
      <caption>
        List of Restaurants ({{
          listOfResturants.length
        }})
      </caption>
      <thead class="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Contact</th>
          <th scope="col">Address</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rest, i) in listOfResturants" :key="i">
          <th scope="row">{{ rest.id }}</th>
          <td>{{ rest.name }}</td>
          <td>{{ rest.contact }}</td>
          <td>{{ rest.address }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else>Sorry no restaurants found yet.</div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import Navbar from "@/components/NavBar/Navbar.vue";
export default {
  name: "Home",
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
  computed: {
    userNameIs() {
      return this.userName;
    },
  },
  //this method will run before page load
  //added async and await, since i am getting data from axios
  async mounted() {
    //validate if user is already signed up... if so redirect to home page and user can't visit sign up page...
    let user = localStorage.getItem("user-info");
    //if user is already signed up, open this home page, else route users to signup page
    if (!user) {
      this.$router.push({ name: "Signup" });
    } else {
      this.userName = JSON.parse(user).name;
      this.userEmail = JSON.parse(user).email;
      this.userId = JSON.parse(user).id;
      this.userPassword = JSON.parse(user).password;
    }
    //get list of restaurants
    let result = await axios.get(
      `http://localhost:3000/restaurants?userId=${this.userId}`
    );
    console.warn(result);
    if (result.status == 200 && result.data.length > 0) {
      this.listOfResturants = result.data;
    }
  },
};
</script>

<style lang="scss">
.logoImg {
  width: 150px;
}
</style>
