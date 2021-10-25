<template>
  <div class="container">
    <div class="row justify-content-center">
      <form @submit.prevent="onSubmit">
        <!-- First and Last Name Row -->
        <div class="row">
          <div class="col-sm-6">
            <div class="form-group">
              <label for=""> First Name:</label
              ><input
                class="form-control"
                placeholder="Enter first name"
                type="text"
                v-model="v$.form.firstName.$model"
              />
              <div class="pre-icon os-icon os-icon-user-male-circle"></div>
              <!-- Error Message -->
              <div
                class="input-errors"
                v-for="(error, index) of v$.form.firstName.$errors"
                :key="index"
              >
                <div class="error-msg" style="color: red">
                  {{ error.$message }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="buttons-w">
          <button
            class="btn btn-primary"
            :disabled="v$.form.$invalid"
            style="margin-left: 120px"
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export function validName(name) {
  let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
  if (validNamePattern.test(name)) {
    return true;
  }
  return false;
}

export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  data() {
    return {
      form: {
        firstName: "",
      },
    };
  },

  validations() {
    return {
      form: {
        firstName: {
          required,
          name_validation: {
            $validator: validName,
            $message:
              "Invalid Name. Valid name only contain letters, dashes (-) and spaces",
          },
        },
      },
    };
  },
};
</script>

<style></style>
