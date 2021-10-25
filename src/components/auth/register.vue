<template>
  <div class="container">
    <div class="row justify-content-center">
      <form
        @submit.prevent="createPost"
        class="form-signin"
        v-bind:style="{ width: '45%' }"
      >
        <h1 class="h3 mb-3 font-weight-normal text-center">Please sign Up</h1>

        <div class="card">
          <div class="card-body">
            <div class="form-group">
              <input
                id="phone"
                type="text"
                class="form-control"
                v-model="v$.post.name.$model"
                autocomplete="name"
                required
                placeholder="Your Name"
              />
              <div
                class="input-errors"
                v-for="(error, index) of v$.post.name.$errors"
                :key="index"
              >
                <div class="error-msg" style="color: red">
                  {{ error.$message }}
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="inputEmail" class="sr-only">Email address</label>
              <input
                type="email"
                id="inputEmail"
                class="form-control"
                placeholder="Email address"
                required=""
                v-model="v$.post.email.$model"
              />
              <div
                class="input-errors"
                v-for="(error, index) of v$.post.email.$errors"
                :key="index"
              >
                <div class="error-msg" style="color: red">
                  {{ error.$message }}
                </div>
              </div>
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                v-model="v$.post.phone.$model"
                required
                autocomplete="phone"
                autofocus
                placeholder="Your Phone Number"
              />
              <div
                class="input-errors"
                v-for="(error, index) of v$.post.phone.$errors"
                :key="index"
              >
                <div class="error-msg" style="color: red">
                  {{ error.$message }}
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="inputPassword" class="sr-only">Password</label>
              <input
                type="password"
                v-model="v$.post.password.$model"
                id="inputPassword"
                class="form-control"
                placeholder="Password"
                required=""
              />
              <div
                class="input-errors"
                v-for="(error, index) of v$.post.password.$errors"
                :key="index"
              >
                <div class="error-msg" style="color: red">
                  {{ error.$message }}
                </div>
              </div>
            </div>
            <div class="form-group">
              <input
                type="number"
                class="form-control"
                v-model="v$.post.referred.$model"
                autocomplete="referred"
                autofocus
                placeholder="referred ID"
              />
              <div
                class="input-errors"
                v-for="(error, index) of v$.post.referred.$errors"
                :key="index"
              >
                <div class="error-msg" style="color: red">
                  {{ error.$message }}
                </div>
              </div>
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                v-model="v$.address.$model"
                autocomplete="address"
                autofocus
                placeholder="your address"
              />
              <div
                class="input-errors"
                v-for="(error, index) of v$.address.$errors"
                :key="index"
              >
                <div class="error-msg" style="color: red">
                  {{ error.$message }}
                </div>
              </div>
            </div>
            <p class="text-center">
              <router-link to="/login"> Already have account</router-link>
            </p>
          </div>
        </div>

        <button
          class="btn btn-lg btn-primary btn-block"
          :disabled="v$.post.$invalid"
        >
          Sign Up
        </button>
        <p class="mt-5 mb-3 text-muted">© 2017-2018</p>
      </form>
    </div>
  </div>
</template>
<script>
import apiCall from "@/components/header/config.js";
import useVuelidate from "@vuelidate/core";
import axios from "axios";
import { required, email, minLength, maxLength } from "@vuelidate/validators";

export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      post: {
        name: "",
        email: "",
        phone: "",
        referred: "",
        password: "",
      },

      posts: {},
      search_key: "",
      error: [],
      role: "",
      ip: "",
      ipaddress: "",
      refered_id: "",
      country: "",
      country_code: "",
      state: "",
      currency: "",
      flag: "",
      address: "",
      latitude: "",
      longitude: "",
    };
  },
  validations() {
    return {
      post: {
        name: {
          required,
          min: minLength(4),
        },
        email: { required, email },
        password: { required, min: minLength(6), max: maxLength(12) },
        phone: { required, min: minLength(6) },
        referred: { required },
      },
      address: { required, min: minLength(10), max: maxLength(100) },
    };
  },
  methods: {
    async createPost() {
      console.log(this.post);
      await axios
        .get("https://api.ipify.org/?format=json", {
          Accept: "application/json",
        })
        .then((res) => {
          console.log("success", res.data);
          this.ip = res.data.ip;
        });
      console.log(this.ip);

      await axios
        .get("https://ipapi.co/" + this.ip + "/json/", {
          Accept: "application/json",
        })
        .then((res) => {
          // console.log("success", res.data);
          this.ipaddress = res.data;
        });
      //console.log(this.ipaddress);
      const data = {
        name: this.post.name,
        email: this.post.email,
        phone: this.post.phone,
        password: this.post.password,
        role: "patient",
        refered_id: this.post.referred,
        country: this.ipaddress.country,
        country_code: this.ipaddress.country_calling_code,
        state: this.ipaddress.city,
        currency: this.ipaddress.currency,
        flag: this.ipaddress.country_code,
        address: this.address,
        latitude: this.ipaddress.latitude,
        longitude: this.ipaddress.longitude,
      };

      apiCall
        .postMethod("/signup", data)
        .then((response) => {
          console.log("status: ", response.status);
        })
        .catch((error) => {
          switch (error.response.status) {
            case 400:
              console.log(error.response.data.message);
              break;
            case 422:
              console.log(error.response.data.errors);
              this.error = error.response.data.errors;
              break;
            default:
              console.log("some other error");
              break;
          }

          console.log("SignInForm.authenticate error: ", error);
        });
    },
  },
};
</script>
<style scoped></style>
