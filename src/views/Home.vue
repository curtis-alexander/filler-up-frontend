<template>
  <div>
    <!-- ======= Octane Section ======= -->
    <section id="octane" class="octane">
      <div class="container">
        <div class="section-title" data-aos="fade-up">
          <h2>Octane</h2>
          <p>Click On Your Preferred Octane</p>
        </div>
        <div class="row">
          <div class="col-lg-4 col-md-6" v-for="product in products" v-bind:key="product.id">
            <div class="87" data-aos="zoom-in">
              <div>
                <div class="product">
                  <img v-on:click="productShow(product)" v-bind:src="product.image_url" />
                  <p>Price Per Gallon: {{ "$" + product.price_per_gallon }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Octane Section -->
    <!-- ======= Amount Section ======= -->
    <section id="amount" class="contact section-bg">
      <div class="container">
        <div class="section-title">
          <ul>
            <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
          </ul>
          <h2>Choose Amount</h2>
          <p>How much fuel do you need?</p>
        </div>
        <div class="row justify-content-center">
          <div class="col-4">
            <form action="forms/contact.php" method="post" role="form" class="php-email-form" data-aos="fade-left">
              <div class="row">
                <div class="col-md-12 form-group">
                  <input type="text" v-model="newOrderParams.dollar_amount" class="form-control" placeholder="Dollar Amount" />
                </div>
                <div class="col">OR</div>
                <div class="col-md-12 form-group mt-3 mt-md-0">
                  <input type="text" v-model="newOrderParams.gallon_amount" class="form-control" placeholder="Gallon Amount" />
                </div>
                <div class="col">
                  Total: {{ dollarTotal || gallonTotal }}
                  <!-- <p>NOP: {{ newOrderParams }}</p> -->
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <!-- End Amount Section -->
    <!-- ======= Vehicle Section ======= -->
    <section id="vehicle" class="contact section-bg">
      <div class="container">

        <div class="section-title">
          <h2>Vehicle</h2>
          <p>Choose Your Vehicle by ID# or Create a New One</p>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-8 mt-5 mt-lg-0">
            <form action="forms/contact.php" method="post" role="form" class="php-email-form" data-aos="fade-left" v-on:submit.prevent="createVehicle()">
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
              <div class="row">
                <div class="col-md-6 form-group">
                  <input type="text" class="form-control" placeholder="Make" v-model="newOrderParams.make" required/>
                </div>
                <div class="col-md-6 form-group mt-3 mt-md-0">
                  <input type="text" class="form-control" placeholder="Model" v-model="newOrderParams.model" required/>
                </div>
                <div class="col-md-6 form-group">
                  <input type="text" class="form-control" placeholder="Color" v-model="newOrderParams.color" required/>
                </div>
                <div class="col-md-6 form-group mt-3 mt-md-0">
                  <input type="text" class="form-control" placeholder="Plate" v-model="newOrderParams.plate" required/>
                </div>
                <div class="text-center"><button type="submit">Create Vehicle</button></div>
                <div class="col-7">OR</div>
                <div class="col-md-6">
                  <input type="text" class="form-control" placeholder="Vehicle ID (if known)" v-model="newOrderParams.vehicle_id"/>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <!-- End Vehicle Section -->
    <!-- ======= Vehicle Location Section ======= -->
    <section id="location" class="contact section-bg">
      <div class="container">
        <div class="section-title">
          <h2>Vehicle Location</h2>
          <p>Where Will Your Vehicle Be?</p>
        </div>

        <!-- Mapbox -->
        <section id="map" class="contact section-bg">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-8 justify-content-center">
                <div class="info d-flex flex-column justify-content-center" data-aos="fade-right">
                  <div id="map" style="width: 600px; height: 400px" class="contact section-bg row justify-content-center">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- End Mapbox -->

        <div class="row justify-content-center">
          <div class="col-lg-8 mt-5 mt-lg-0">
            <form action="forms/contact.php" method="post" role="form" class="php-email-form" data-aos="fade-left">
              <div class="row">
              <div class="col form-group mt-3">
                <input type="text" class="form-control" v-model="newOrderParams.location" placeholder="Vehilce Location Address" required>
              </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <!-- End Vehicle Location Section -->
    <!-- Purchase Fuel Section -->
    <section id="purchase" class="contact section-bg">
      <div class="container">
        <div class="section-title">
          <h2>Purchase Fuel</h2>
        </div>
        <form action="forms/contact.php" method="post" role="form" class="php-email-form" data-aos="fade-left" v-on:submit.prevent="createOrder()">
          <div class="row justify-content-center">
            <div class="col-lg-8 mt-5 mt-lg-0">
              <div class="row">
                <div class="col form-group mt-3">
                  <div class="text-center">
                    <button type="submit">Create Order</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>


<script>
import axios from "axios";
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"

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
      if (
        this.newOrderParams.gallon_amount * this.newOrderParams.price_per_gallon
      ) {
        return (
          this.newOrderParams.gallon_amount *
          this.newOrderParams.price_per_gallon
        ).toFixed(2);
      } else {
        return "$0.00";
      }
      // return (
      //   this.newOrderParams.gallon_amount * this.newOrderParams.price_per_gallon
      // ).toFixed(2);
    },
    dollarTotal: function () {
      return this.newOrderParams.dollar_amount;
    },
  },
  mounted: function () {
    this.doMapbox();
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
      // this.newOrderParams.total = this.newOrderParams.dollar_amount;
      this.newOrderParams.product_id = this.currentProduct.id;
      console.log(this.newOrderParams);
      axios
        .post(`/orders?user_id=${localStorage.user_id}`, this.newOrderParams)
        .then((response) => {
          console.log("Orders create", response.data);
          this.newOrderParams = response.data;
          this.$router.push("/confirmation#header");
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
          this.newOrderParams.vehicle_id = this.newVehicle.id;
        })
        .catch((error) => {
          console.log("Orders create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    doMapbox: function () {
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
      var center = [-89.0187, 42.6828];
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: center, // starting position [lng, lat]
        zoom: 11, // starting zoom
      });
      var el = document.createElement("div");
      el.id = "marker";
      new mapboxgl.Marker({ color: "#888", draggable: true })
        .setLngLat(center)
        .addTo(map);
    },
    mapMouseEvent: function () {
      console.log("click");
      this.map.on("click", (e) => {
        console.log(e);
      });
    },
  },
};
</script>

<style>
img {
  width: 100px;
  height: 100px;
}
</style>
