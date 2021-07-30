<template>
  <div class="orders-new">
    <h2>Choose Amount</h2>
    <form v-on:submit.prevent="createOrder()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      Dollar Amount:
      <input type="text" v-model="newOrderParams.dollar_amount" />
      Gallon Amount:
      <input type="text" v-model="newOrderParams.gallon_amount" />
      <input type="submit" value="Create" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newOrderParams: {},
      errors: [],
    };
  },
  created: function () {},
  methods: {
    createOrder: function () {
      axios
        .post("/Orders", this.newOrderParams)
        .then((response) => {
          console.log("Orders create", response);
          this.$router.push("/Orders");
        })
        .catch((error) => {
          console.log("Orders create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>