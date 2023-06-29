<template>
  <div class="common-layout">
    <el-container class="bigbox">
      <el-header>
        <div class="leftimg">
          <img src="../assets/logo.png" alt="" />
        </div>
        <div class="rightuser">
          <span>{{ store.state.username }} 欢迎回来</span>
          <el-button type="info" @click="exitlogin">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <side></side>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import side from "../components/Aside.vue";
import store from "../store/index";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const ustore = useStore();
const router = useRouter();
const exitlogin = () => {
  ustore.commit("setUserInfo", { username: "" });
  localStorage.removeItem("token");
  router.push("/mlogin");
};
</script>

<style scoped lang="scss">
.bigbox {
  position: absolute;
  width: 100%;
  height: 100%;
}
.el-header {
  background-color: #545c64;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}
.leftimg {
  width: 100px;
  height: 50px;
  margin-left: 30px;
  img {
    width: 100%;
    height: 100%;
  }
}
.rightuser {
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 30px;
  span {
    margin-right: 30px;
  }
}
</style>
