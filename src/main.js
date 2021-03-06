import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

// axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "https://morning-cove-71862.herokuapp.com" : "/";
axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "https://fast-mesa-53000.herokuapp.com" : "/";
Vue.config.productionTip = false;

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
