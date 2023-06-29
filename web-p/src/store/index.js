import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    token: "",
    userInfo: {},
    cityName: "",
    cityId: "",
    articleId: "",
    pic: "",
    address: "",
    shequOp: "",
    youjiId: "",
    distination: "",
    liveTime: [],
    badgeValue: 0,
    hiddenFlag: true,
    isshow: false,
    user: {},
  },
  getters: {},
  mutations: {
    setUser(state, data) {
      state.user = data;
    },
    setUserInfo(state, data) {
      state.userInfo = data;
    },
    setCityName(state, data) {
      state.cityName = data;
    },
    setCityId(state, data) {
      state.cityId = data;
    },
    setArticleId(state, data) {
      state.articleId = data;
    },
    setAddress(state, data) {
      state.address = data;
    },
    changePic(state, data) {
      state.pic = data;
    },
    changeOp(state, data) {
      state.shequOp = data;
    },
    setyoujiId(state, data) {
      state.youjiId = data;
    },
    setdistination(state, data) {
      state.distination = data;
    },
    setLiveTime(state, data) {
      state.liveTime = data;
    },
    setbadgeValue(state, data) {
      if (data == -1) {
        state.badgeValue -= 1;
      } else if (data == 1) {
        state.badgeValue += 1;
      } else if (data == 0) {
        state.badgeValue = 0;
      }
    },
    changehidden(state) {
      state.hiddenFlag = !state.hiddenFlag;
    },
    setreavalue(state, data) {
      state.badgeValue = data;
    },
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      paths: [
        "user",
        "userInfo",
        "cityName",
        "cityId",
        "articleId",
        "pic",
        "address",
        "shequOp",
        "youjiId",
        "distination",
        "liveTime",
        "badgeValue",
        "hiddenFlag",
        "isshow",
      ],
    }),
  ],
});
