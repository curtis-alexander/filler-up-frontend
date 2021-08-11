<template>
  <div>
    <div class="signup">
      <form v-on:submit.prevent="signup()">
        <h1>Fill'er Up</h1>
        <h2>Signup</h2>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
        <div>
          <label>First Name:</label>
          <input type="text" v-model="newUserParams.first_name" />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" v-model="newUserParams.last_name" />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" v-model="newUserParams.email" />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" v-model="newUserParams.phone_number" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" v-model="newUserParams.password" />
        </div>
        <div>
          <label>Password confirmation:</label>
          <input type="password" v-model="newUserParams.password_confirmation" />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
    <p> {{ "OR" }}</p>
    <div class="login">
      <form v-on:submit.prevent="login()">
        <h2>Login</h2>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
        <div>
          <label>Email:</label>
          <input type="email" v-model="newSessionParams.email" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" v-model="newSessionParams.password" />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
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
          this.$router.push("/new_account");
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
