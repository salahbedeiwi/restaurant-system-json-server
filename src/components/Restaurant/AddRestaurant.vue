<template>
  <div class="container">
    <form @click.prevent>
      <div class="row g-3 align-items-center">
        <h1 class="text-center">Add New Restaurant</h1>
        <div class="col-auto d-block mx-auto">
          <input
            type="text"
            class="form-control"
            placeholder="Enter Restaurant Name"
            v-model.trim="state.restaurantName"
          />
          <span v-if="v$.restaurantName.$error" class="error-feedback">
            {{ v$.restaurantName.$errors[0].$message }}
          </span>
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <input
            type="text"
            class="form-control"
            placeholder="Enter Restaurant Contact"
            v-model.trim="state.restaurantContact"
          />
          <span v-if="v$.restaurantContact.$error" class="error-feedback">
            {{ v$.restaurantContact.$errors[0].$message }}
          </span>
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <input
            type="text"
            class="form-control"
            placeholder="Enter Restaurant Address"
            v-model.trim="state.restaurantAddress"
          />
          <span v-if="v$.restaurantAddress.$error" class="error-feedback">
            {{ v$.restaurantAddress.$errors[0].$message }}
          </span>
        </div>
      </div>
      <br />

      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <button
            @click="addNewRestaurant()"
            class="form-control btn btn-primary"
          >
            Add New Restaurant
          </button>
        </div>
      </div>
      <br />
    </form>
  </div>
</template>
<!-- We will need to add restaurant Name, Contact, address, id by default -->
<script>
//this page is using vuelidate | Vue 3 by https://youtu.be/2BR6Vvjw3wQ
import useValidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import axios from "axios";
export default {
  name: "AddRestaurant",
  setup() {
    const state = reactive({
      restaurantName: "",
      restaurantContact: "",
      restaurantAddress: "",
      currentUserId: "",
    });
    //create custom function to handle validations
    // const mustBeLearnVue = (val) => value.includes("learnvue");
    const rules = computed(() => {
      return {
        restaurantName: { required, minLength: minLength(10) },
        restaurantContact: { required, minLength: minLength(10) },
        restaurantAddress: { required, minLength: minLength(10) },
      };
    });

    const v$ = useValidate(rules, state);

    return {
      state,
      v$,
    };
  },
  data() {
    return {
      // v$: useValidate(),
      // restaurantName: "",
      // restaurantContact: "",
      // restaurantAddress: "",
      currentUserId: "",
    };
  },
  //add validation using vuelidate
  // validations() {
  //   return {
  //     restaurantName: { required },
  //     restaurantContact: { required },
  //     restaurantAddress: { required },
  //   };
  // },
  //this method will run before page load
  mounted() {
    //validate if user is already signed up... if so redirect to home page and user can't visit sign up page...
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "Signup" });
    } else {
      this.currentUserId = JSON.parse(user).id;
    }
  },
  methods: {
    async addNewRestaurant() {
      //call validate before processing
      this.v$.$validate();
      if (!this.v$.$error) {
        //if no error
        console.log("form successfully validated");
        let result = await axios.post("http://localhost:3000/restaurants", {
          name: this.state.restaurantName,
          contact: this.state.restaurantContact,
          address: this.state.restaurantAddress,
          userId: this.currentUserId,
        });
        if (result.status == 201) {
          this.$router.push({ name: "Home" });
        }
      } else {
        console.log("form failed validations");
      }
    },
  },
};
</script>

<style lang="scss">
.error-feedback {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
}
</style>
