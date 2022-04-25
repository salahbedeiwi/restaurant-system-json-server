<template>
  <div class="container">
    <h1>Update Restaurants</h1>
    <table class="table caption-top" v-if="listOfResturants.length > 0">
      <caption>
        List of Restaurants to update ({{
          listOfResturants.length
        }})
      </caption>
      <thead class="table-dark">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Contact</th>
          <th scope="col">Address</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rest, i) in listOfResturants" :key="i">
          <td scope="row">{{ rest.name }}</td>
          <td>{{ rest.contact }}</td>
          <td>{{ rest.address }}</td>
          <td>
            <router-link
              :to="{
                name: 'Edit',
                params: { restId: rest.id, userId: userId },
              }"
              ><button type="button" class="btn btn-warning">
                Update
              </button></router-link
            >
            &nbsp;
            <button
              type="button"
              @click="deleteRestaurant(rest.id)"
              class="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>Sorry no restaurants found yet.</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UpdateRestaurants",
  data() {
    return {
      userName: "",
      userEmail: "",
      userId: "",
      userPassword: "",
      listOfResturants: [],
    };
  },
  //this method will run before page load
  async mounted() {
    this.loadData();
  },
  methods: {
    async deleteRestaurant(restId) {
      console.log("delete current restaurant");
      let result = await axios.delete(
        `http://localhost:3000/restaurants/${restId}`
      );
      if (result.status === 200) {
        //reload this
        this.loadData();
      }
    },
    //make this method common, so it will be used in multiple places
    async loadData() {
      //validate if user is already signed up... if so redirect to home page and user can't visit sign up page...
      let user = localStorage.getItem("user-info");
      if (!user) {
        this.$router.push({ name: "Signup" });
      }else{
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
  },
};
</script>
