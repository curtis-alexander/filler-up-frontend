<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h3>Choose Your Octane</h3>
    <div v-for="product in products" v-bind:key="product.id">
      <p>ID: {{ product.id }}</p>
      <img v-on:click="productShow(product)" v-bind:src="product.image_url">
      <p>Price Per Gallon: {{ "$" + product.price_per_gallon }}</p>
      <hr />
    </div>
  </div>
</template>

<style>
img {
  width: 200px;
  height: 200px;
}
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      message: "Fill'er Up",
      products: [],
      currentProduct: {},
    };
  },
  created: function () {
    this.productsIndex();
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
      this.currentProduct = product;
      console.log(this.currentProduct);
    },
  },
};
</script>
