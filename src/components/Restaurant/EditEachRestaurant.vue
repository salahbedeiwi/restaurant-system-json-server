<template>
  <div class="container">
    <form @click.prevent v-if="currentUserId == loggedInUserId">
      <div class="row g-3 align-items-center">
        <h1 class="text-center">Update Restaurant</h1>
        <div class="col-auto d-block mx-auto">
          <input
            type="text"
            class="form-control"
            placeholder="Enter Restaurant Name"
            v-model="restaurantName"
          />
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <input
            type="text"
            class="form-control"
            placeholder="Enter Restaurant Contact"
            v-model="restaurantContact"
          />
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <input
            type="text"
            class="form-control"
            placeholder="Enter Restaurant Address"
            v-model="restaurantAddress"
          />
        </div>
      </div>
      <br />

      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <button
            @click="updateRestaurant()"
            class="form-control btn btn-primary"
          >
            Click to Update
          </button>
        </div>
      </div>
      <br />
    </form>
    <div v-else class="text-danger">You dont have access to this page</div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "EditEachRestaurant",
  data() {
    return {
      restaurantIdIs: this.$route.params.restId,
      loggedInUserId: this.$route.params.userId,
      restaurantName: "",
      restaurantContact: "",
      restaurantAddress: "",
      currentUserId: "",
      listOfResturants: [],
    };
  },
  async mounted() {
    //validate if user is already signed up... if so redirect to home page and user can't visit sign up page...
    let result = await axios.get(
      `http://localhost:3000/restaurants?userId=${this.loggedInUserId}&id=${this.restaurantIdIs}`
    );

    console.warn(result);
    if (result.status == 200 && result.data.length > 0) {
      this.restaurantName = result.data[0].name;
      this.restaurantContact = result.data[0].contact;
      this.restaurantAddress = result.data[0].address;
      this.listOfResturants = result.data[0]; //get only one info
    }

    let user = localStorage.getItem("user-info");
    if (!user) {
        this.$router.push({ name: "Signup" });
    }else{
        this.currentUserId = JSON.parse(user).id;
    }
  },
  methods: {
    //update is put request
    async updateRestaurant() {
      console.warn("update current restaurant"); 
      //note url is like http://localhost:3000/restaurants/10 not http://localhost:3000/restaurants?id=10
      let result = await axios.put(
        `http://localhost:3000/restaurants/${this.restaurantIdIs}`, 
        {
          name: this.restaurantName,
          contact: this.restaurantContact,
          address: this.restaurantAddress,
          userId: this.currentUserId,
        }
        //must update all columns
      );
      if (result.status == 200) {
        this.$router.push({ name: "Home" });
      }
    },
  },
};
</script>
