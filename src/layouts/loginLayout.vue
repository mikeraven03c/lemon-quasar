<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar class="text-yellow-9 bg-white">
        <q-btn flat round dense icon="store" type="a" href="/" />
        <q-toolbar-title>Lemon Store </q-toolbar-title>
        <q-space />
        <q-btn flat type="a" round dense icon="login" href="/login" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="my-background row justify-center items-center">
        <!--
          window-height window-width -->
        <div class="column">
          <div class="row">
            <h5 class="text-h5 text-white q-my-md">Login Page</h5>
          </div>
          <div class="row">
            <q-card shadow-3 square style="width: 300px; height: 485px">
              <!-- <q-card-section class="bg-white">
                <h4 class="text-h5 text-yellow-8 q-my-md">Lemon Store</h4>
                <div
                  class="absolute-bottom-right q-pr-md"
                  style="transform: translateY(50%)"
                >
                  <q-btn fab icon="add" color="primary" />
                </div>
              </q-card-section> -->
              <q-card-section>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar>
                      <img src="~assets/lemon-icon.svg" />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section class="text-yellow-8">
                    <q-item-label>Lemon Store</q-item-label>
                  </q-item-section>
                </q-item>
                <q-form class="q-px-sm q-pt-xl">
                  <q-input
                    square
                    clearable
                    color="yellow-9"
                    v-model="formData.username"
                    type="email"
                    :error-message="formError.username"
                    :error="formError.username ? true : false"
                    label="Username"
                  >
                    <template v-slot:prepend>
                      <q-icon color="yellow-9" name="person" />
                    </template>
                  </q-input>
                  <q-input
                    square
                    clearable
                    color="yellow-9"
                    v-model="formData.password"
                    :error-message="formError.password"
                    :error="formError.password ? true : false"
                    type="password"
                    label="Password"
                  >
                    <template v-slot:prepend>
                      <q-icon color="yellow-9" name="lock" />
                    </template>
                  </q-input>
                </q-form>
              </q-card-section>
              <!-- <q-card-section>
                <div class="text-center q-pa-md q-gutter-md">
                  <q-btn round color="indigo-7">
                    <q-icon name="fab fa-facebook-f" size="1.2rem" />
                  </q-btn>
                  <q-btn round color="red-8">
                    <q-icon name="fab fa-google-plus-g" size="1.2rem" />
                  </q-btn>
                  <q-btn round color="light-blue-5">
                    <q-icon name="fab fa-twitter" size="1.2rem" />
                  </q-btn>
                </div>
              </q-card-section> -->

              <q-card-actions class="q-px-lg">
                <q-btn
                  elevated
                  size="lg"
                  color="yellow-9"
                  class="full-width text-white"
                  label="Login"
                  @click="login"
                />
              </q-card-actions>
              <!-- <q-card-section class="text-center q-pa-sm">
                <p class="text-grey-6">Forgot your password?</p>
              </q-card-section> -->
              <q-card-section>
                <div class="text-center">
                  <q-btn color="indigo-7">
                    <q-icon class="q-mr-xs" name="facebook" size="1.2rem" />
                    Login with facebook
                  </q-btn>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { web, api } from "boot/axios";
import { ref } from "vue";
export default {
  name: "Login",
  setup() {
    const formData = ref({
      username: "",
      password: "",
    });
    const formError = ref({});
    const loading = ref(false);
    const login = () => {
      loading.value = true;
      formError.value = {};

      web
        .post("login", formData.value)
        .then(({ data }) => {
          loading.value = false;

          if (data.success) {
            window.location.href = "/app/dashboard";
          } else {
            formError.value.username = data.message;
          }

          Notify.create({
            message: data.message,
            color: data.status ? "primary" : "negative",
          });
        })
        .catch((error) => {
          loading.value = false;
          if (error.response) {
            if (error.response.status == 422) {
              let data = error.response.data;

              errorData.value = data.data;
            }
          }
        });
    };

    return {
      login,
      formData,
      formError,
    };
  },
  // data() {
  //   return {
  //     email: "",
  //     username: "",
  //     password: "",
  //   };
  // },
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>