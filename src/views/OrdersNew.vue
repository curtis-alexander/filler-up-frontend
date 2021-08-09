<template>
  <div class="orders-new">
    <h2>Choose Amount</h2>
    <form v-on:submit.prevent="createOrder()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <p>{{ newOrderParams }}</p>

      <p>
        Dollar Amount:
        <input type="text" v-model="newOrderParams.dollar_amount" />
      </p>
      <p>{{ "OR" }}</p>
      <p>
        Gallon Amount:
        <input type="text" v-model="newOrderParams.gallon_amount" />
      </p>
      <hr />
      <p>
        Vehicle Location Address:
        <input type="text" v-model="newOrderParams.location" />
      </p>
      <hr />
      <p>
        Vehicle ID:
        <input type="text" v-model="newOrderParams.vehicle_id" />
      </p>
      <input type="submit" value="Order" />
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
  created: function () {
    console.log(this.$route.query);
    this.newOrderParams.product_id = this.$route.query.product_id;
    console.log(this.newOrderParams);
  },
  methods: {
    createOrder: function () {
      axios
        .post("/orders", this.newOrderParams)
        .then((response) => {
          console.log("Orders create", response.data);
          this.newOrderParams = response.data;
          this.$router.push(
            `/about?user_id=${localStorage.user_id}&gallon_amount=${this.newOrderParams.gallon_amount}&dollar_amount=${this.newOrderParams.dollar_amount}&location=${this.newOrderParams.location}&vehicle_id=${this.newOrderParams.vehicle_id}`
          );
        })
        .catch((error) => {
          console.log("Orders create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>