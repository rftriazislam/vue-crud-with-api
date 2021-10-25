<template>
  <div class="container">
    <div class="row justify-content-center">
      <form class="form-signin widthy" v-bind:style="{ width: '45%' }">
        <h1 class="h3 mb-3 font-weight-normal text-center">Please sign in</h1>

        <div class="card">
          <div class="card-body">
            <div class="form-group">
              <label for="inputEmail" class="sr-only">Email address</label>
              <input
                type="email"
                id="inputEmail"
                class="form-control"
                placeholder="Email address"
                required=""
                autofocus=""
              />
            </div>

            <div class="form-group">
              <label for="inputPassword" class="sr-only">Password</label>
              <input
                type="password"
                id="inputPassword"
                class="form-control"
                placeholder="Password"
                required=""
              />
            </div>

            <p class="text-center">
              <router-link to="/register"> create account</router-link>
            </p>
          </div>
        </div>

        <button class="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
        <p class="mt-5 mb-3 text-muted">© 2021-2021</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
