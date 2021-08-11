<template>
  <div>
    <div class="home">
      <h1>{{ message }}</h1>
      <h2>Choose Your Octane</h2>
      <div v-for="product in products" v-bind:key="product.id">
        <p>ID: {{ product.id }}</p>
        <img v-on:click="productShow(product)" v-bind:src="product.image_url" />
        <p>Price Per Gallon: {{ "$" + product.price_per_gallon }}</p>
        <hr />
      </div>
    </div>
    <div class="orders-new">
      <h2>Choose Amount</h2>
      <form v-on:submit.prevent="createOrder()">
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
        <p>P {{ newOrderParams }}</p>
        <p>C {{ currentProduct }}</p>
        <p>V {{ newVehicle }}</p>

        <p>Dollar Amount:</p>
        <p>
          <input type="text" v-model="newOrderParams.dollar_amount" />
        </p>
        <p>{{ "OR" }}</p>
        <p>Gallon Amount:</p>
        <p>
          <input type="text" v-model="newOrderParams.gallon_amount" />
        </p>
        <p>Total: {{ gallonTotal }}</p>
        <hr />
        <h2>Choose Your Vehicle</h2>
        <div>
          <div class="vehicle_create">
            <h3>New Vehicle</h3>
            <form v-on:submit.prevent="createVehicle()">
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
              <p>Make:</p>
              <p>
                <input type="text" v-model="newOrderParams.make" />
              </p>
              <p>Model:</p>
              <p>
                <input type="text" v-model="newOrderParams.model" />
              </p>
              <p>Color:</p>
              <p>
                <input type="text" v-model="newOrderParams.color" />
              </p>
              <p>Plate:</p>
              <p>
                <input type="text" v-model="newOrderParams.plate" />
              </p>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
        <p>{{ "OR" }}</p>
        <p>Choose by Vehicle ID:</p>
        <p>
          <input type="text" v-model="newOrderParams.vehicle_id" />
        </p>
        <hr />
        <h2>Where is Your Vehicle?</h2>
        <p>
          Vehicle Location Address:
          <input type="text" v-model="newOrderParams.location" />
        </p>
        <input type="submit" value="Order" />
      </form>
    </div>
  </div>
</template>

<style>
img {
  width: 100px;
  height: 100px;
}
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      message: "Fill'er Up",
      errors: [],
      products: [],
      currentProduct: {},
      newVehicle: {},
      newOrderParams: {},
    };
  },
  created: function () {
    this.productsIndex();
  },
  computed: {
    gallonTotal: function () {
      return (
        this.newOrderParams.gallon_amount * this.newOrderParams.price_per_gallon
      );
    },
  },
  methods: {
    productsIndex: function () {
      console.log("in the products index");
      axios.get("http://localhost:3000/products").then((response) => {
        console.log(response.data);
        this.products = response.data;
      });
    },
    productShow: function (product) {
      console.log("showing chosen product");
      this.newOrderParams = product;
      this.newOrderParams.product_id = this.newOrderParams.id;
      console.log(this.newOrderParams);
    },
    createOrder: function () {
      this.newOrderParams.product_id = this.currentProduct.id;
      console.log(this.newOrderParams);
      axios
        .post(`/orders?user_id=${localStorage.user_id}`, this.newOrderParams)
        .then((response) => {
          console.log("Orders create", response.data);
          this.newOrderParams = response.data;
          this.$router.push("/confirmation");
        })
        .catch((error) => {
          console.log("Orders create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    createVehicle: function () {
      axios
        .post(`/vehicles?user_id=${localStorage.user_id}`, this.newOrderParams)
        .then((response) => {
          console.log("creating new car", response.data);
          this.newVehicle = response.data;
        })
        .catch((error) => {
          console.log("Orders create error", error.response);
          this.errors = error.response.data.errors;
        });
      this.newOrderParams.vehicle_id = this.newVehicle.id;
    },
  },
};
</script>
