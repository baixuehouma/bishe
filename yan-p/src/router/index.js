import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login";
import Center from "../views/Center";
import Buy from "../components/Buy";
import Home from "../components/Home";
import userManager from "../components/userManager";
import userMessage from "../components/userMessage";
import Article from "../components/article";
import HotelList from "../components/hotellist";
import Test from "../components/fold";
import hotelManager from "../components/HotelManager";

const routes = [
  { path: "/", redirect: "/mlogin" },
  { path: "/mlogin", name: "login", component: Login },
  { path: "/test", name: "test", component: Test },
  {
    path: "/center",
    name: "center",
    component: Center,
    redirect: "/home",
    children: [
      { path: "/buy", name: "buy", component: Buy },
      { path: "/home", name: "home", component: Home },
      { path: "/usermessage", name: "userm", component: userMessage },
      { path: "/addmanager", name: "user", component: userManager },
      { path: "/article", name: "article", component: Article },
      { path: "/hotellist", name: "hotel", component: HotelList },
      { path: "/hotelmanager", component: hotelManager },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token") || "";
  if (token) {
    next();
  } else {
    if (to.path == "/mlogin") {
      next();
    } else {
      next({ path: "/mlogin" });
    }
  }
});

export default router;
