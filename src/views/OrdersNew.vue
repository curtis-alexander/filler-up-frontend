<template>
  <div class="orders-new">
    <h2>Choose Amount</h2>
    <form v-on:submit.prevent="createOrder()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <p>{{ newOrderParams }}</p>

      <p>Dollar Amount:
      <input type="text" v-model="newOrderParams.dollar_amount" />
      </p>
      <p>{{ "OR" }}</p>
      <p>Gallon Amount:
      <input type="text" v-model="newOrderParams.gallon_amount" />
      </p>
      <input type="submit" value="Continue" />
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
        .post("/orders", this.newOrderParams)
        .then((response) => {
          console.log("Orders create", response.data);
          this.newOrderParams = response.data;
          this.$router.push("/");
        })
        .catch((error) => {
          console.log("Orders create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>