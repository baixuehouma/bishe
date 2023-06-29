import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login";
import Home from "../views/Home";
import NotFound from "../views/NotFound";
import Center from "../components/center";
import City from "../components/city";
import Strategy from "../components/strategy";
import Hotel from "../components/hotel";
import Community from "../components/community";
import Test from "../components/test";
import Detail from "../views/detail";
import User from "../views/user";
import Gaihsu from "../components/gaishu";
import Fj from "../components/fj";
import Jd from "../components/jd";
import detailHotel from "../components/detailHotel";
import hotelMessage from "../views/hotelMessage";
import Speak from "../views/speak";
import Tst from "../components/tst.vue";
import CMap from "../components/companyMap.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    children: [
      { path: "/center", component: Center },
      {
        path: "/city",
        component: City,
      },
      {
        path: "/user",
        component: User,
      },
      { path: "/strategy", component: Strategy },
      { path: "/detailhotel", component: detailHotel },
      { path: "/hotel", component: Hotel },
      {
        path: "/speak",
        component: Speak,
        children: [{ path: "/community", component: Community }],
      },
      {
        path: "/detail",
        component: Detail,
        redirect: "/detail/gaishu",
        children: [
          { path: "/detail/gaishu", component: Gaihsu },
          { path: "/detail/fj", component: Fj },
          { path: "/detail/jd", component: Jd },
        ],
      },
      { path: "/hMessage", component: hotelMessage },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: NotFound,
  },
  { path: "/test", component: Test },
  { path: "/tst", component: Tst },
  { path: "/commap", component: CMap },
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
    if (to.path == "/login") {
      next();
    } else {
      next({ path: "/login" });
    }
  }
});

export default router;
