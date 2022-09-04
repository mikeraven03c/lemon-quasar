import { boot } from "quasar/wrappers";
import axios from "axios";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.headers.common['X-CSRF-TOKEN'] = window.Laravel.csrfToken;
const api = axios.create({
  baseURL: "http://michael-erp.test/" + (process.env.DEV ? "test" : "api")
});

const web = axios.create({ baseURL: process.env.DEV ? "http://michael-erp.test" : "/" });
// web.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// web.defaults.headers.common['X-CSRF-TOKEN'] = window.Laravel.csrfToken;
export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api, axios, web };
