<template>
  <div class="container">
    <div class="row justify-content-center">
      <form
        @submit.prevent="createPost"
        class="form-signin"
        v-bind:style="{ width: '45%' }"
      >
        <h1 class="h3 mb-3 font-weight-normal text-center">Please search Data</h1>

        <div class="card">
          <div class="card-body">
            <div class="form-group">
              <input
                id="phone"
                type="text"
                class="form-control"
                v-model="post.name"
                required
                autocomplete="name"
                autofocus
                placeholder="Your Name"
              />
            </div>
           
        </div>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">
          search data
        </button>
        <p class="mt-5 mb-3 text-muted">© 2017-2018</p>
      </form>
    </div>
  </div>
</template>
<script>
import apiCall from "@/components/header/config.js";
export default {
  data() {
    return {
      post: {
        name: "",
      },

      posts: {},
      search_key: "",
      error:"",
    };
  },

  methods: {
    async createPost() {
      console.log(this.post);

      const searchkey={
          search_key: this.post.name,
      };
  
  apiCall.postMethod('/doctor-brand-drug-lists',searchkey)
        .then((response) => {
            console.log('status: ', response.status);

        }) .catch(error => {
                switch (error.response.status) {
                    case 400:
                        console.log(error.response.data.message); 
                        break;
                    case 422:
                        console.log(error.response.data.message);  
                        break;
                    default:
                        console.log('some other error');  
                        break;
                    }

            console.log('SignInForm.authenticate error: ', error);
        });    
    }
  },
};
</script>
<style scoped></style>
