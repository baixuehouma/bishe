import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
export default createStore({
  state: {
    username: "",
  },
  getters: {},
  mutations: {
    setUserInfo(state, data) {
      state.username = data;
    },
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      paths: ["username"],
    }),
  ],
});
