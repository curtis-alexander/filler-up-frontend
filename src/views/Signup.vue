<template>
  <div>
    <!-- ======= Hero Section ======= -->
    <section id="hero">
      <div class="hero-container">
        <a href="index.html" class="hero-logo" data-aos="zoom-in"><img src="assets/img/hero-logo.png" alt=""></a>
        <h1 data-aos="zoom-in">Welcome To Fill'er Up</h1>
        <h2 data-aos="fade-up">Your one stop shop for fuel</h2>
        <a data-aos="fade-up" data-aos-delay="200" href="#signup" class="btn-get-started scrollto">Get Started</a>
      </div>
    </section>
    <!-- End Hero -->
    <!-- ======= Signup Section ======= -->
    <section id="signup" class="contact section-bg">
      <div class="container">
        <div class="section-title">
          <h2>Signup</h2>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-8 mt-5 mt-lg-0">
            <form action="forms/contact.php" method="post" role="form" class="php-email-form" data-aos="fade-left" v-on:submit.prevent="signup()">
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
              <div class="row">
                <div class="col-md-6 form-group">
                  <input type="text" v-model="newUserParams.first_name" class="form-control" placeholder="First Name" required>
                </div>
                <div class="col-md-6 form-group">
                  <input type="text" v-model="newUserParams.last_name" class="form-control" placeholder="Last Name" required>
                </div>
                <div class="col-md-6 form-group mt-3 mt-md-0">
                  <input type="email" v-model="newUserParams.email" class="form-control" placeholder="Email" required>
                </div>
                <div class="col-md-6 form-group">
                  <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" v-model="newUserParams.phone_number" class="form-control" placeholder="Phone Number (555-555-5555)" required>
                </div>
                <div class="col-md-6 form-group">
                  <input type="password" v-model="newUserParams.password" class="form-control" placeholder="Password" required>
                </div>
                <div class="col-md-6 form-group">
                  <input type="password" v-model="newUserParams.password_confirmation" class="form-control" placeholder="Password Confirmation" required>
                </div>
              </div>
              <div class="text-center"><button type="submit">Submit</button></div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <!-- End Signup Section -->
    <!-- ======= Login Section ======= -->
    <section id="login" class="contact section-bg">
      <div class="container">
        <div class="section-title">
          <h2>Login</h2>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-8 mt-5 mt-lg-0">
            <form action="forms/contact.php" method="post" role="form" class="php-email-form" data-aos="fade-left" v-on:submit.prevent="login()">
            <ul>
              <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
            </ul>
              <div class="row">
                <div class="col-md-6 form-group mt-3 mt-md-0">
                  <input type="email" v-model="newSessionParams.email" class="form-control" placeholder="Email" required>
                </div>
                <div class="col-md-6 form-group">
                  <input type="password" v-model="newSessionParams.password" class="form-control" placeholder="Password" required>
                </div>
              </div>
              <div class="text-center"><button type="submit">Login</button></div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <!-- End Login Section -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: {},
      newSessionParams: {},
      errors: [],
    };
  },
  methods: {
    signup: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/new_account#header");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    login: function () {
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push("/home");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
