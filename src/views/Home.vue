<template>
  <div>
    <!-- ======= Octane Section ======= -->
    <section id="octane" class="octane">
      <div class="container">
        <div class="section-title" data-aos="fade-up">
          <h2>Octane</h2>
          <p>Choose Your Octane</p>
        </div>
        <div class="row">
          <div class="col-lg-4 col-md-6 d-flex align-items-stretch portfolio-item filter-app" v-for="product in products" v-bind:key="product.id">
            <div class="87" data-aos="zoom-in">
              <div class="portfolio-wrap:hover">
                <div class="bg-image hover-zoom">
                  <img class="portfolio-lightbox portfolio-item filter-app img-fluid bx bx-link" v-on:click="productShow(product)" v-bind:src="product.image_url" />
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
    <section id="contact" class="contact section-bg">
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
                  Total: {{ gallonTotal || dollarTotal }}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <!-- End Amount Section -->
    <!-- ======= Vehicle Section ======= -->
    <section id="contact" class="contact section-bg">
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
                  <input type="text" class="form-control" placeholder="Make" v-model="newOrderParams.make"/>
                </div>
                <div class="col-md-6 form-group mt-3 mt-md-0">
                  <input type="text" class="form-control" placeholder="Model" v-model="newOrderParams.model"/>
                </div>
                <div class="col-md-6 form-group">
                  <input type="text" class="form-control" placeholder="Color" v-model="newOrderParams.color"/>
                </div>
                <div class="col-md-6 form-group mt-3 mt-md-0">
                  <input type="text" class="form-control" placeholder="Plate" v-model="newOrderParams.plate"/>
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
    <section id="contact" class="contact section-bg">
      <div class="container">
        <div class="section-title">
          <h2>Vehicle Location</h2>
          <p>Where Will Your Vehicle Be?</p>
        </div>

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
    <section id="contact" class="contact section-bg">
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
    dollarTotal: function () {
      return this.newOrderParams.dollar_amount;
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
          this.newOrderParams.vehicle_id = this.newVehicle.id;
        })
        .catch((error) => {
          console.log("Orders create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
