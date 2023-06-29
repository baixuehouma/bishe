import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import vueSwiper from "vue-awesome-swiper";
import "./assets/styles/comment.css";
import Viewer from "v-viewer";
import "viewerjs/dist/viewer.css";
// import "@lottiefiles/lottie-player";
// import LottieVuePlayer from "@lottiefiles/vue-lottie-player";
// import "default-passive-events";
import BaiduMap from "vue-baidu-map-3x";

createApp(App)
  .use(BaiduMap, {
    ak: "mIG9Vg9e8DEhLdQGRqx46aBZaXfKB0jT",
  })
  .use(Viewer)
  .use(ElementPlus)
  .use(store)
  .use(router)
  .mount("#app");

Viewer.setDefaults({
  inline: false,
  title: false,
  navbar: false,
  toolbar: false,
});
