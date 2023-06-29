<template>
  <div class="topMenu">
    <el-menu
      :default-active="$route.path"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
    >
      <div class="logo"></div>
      <el-menu-item index="/center">首页</el-menu-item>
      <el-menu-item index="/city">目的地</el-menu-item>
      <el-menu-item index="/strategy">旅游攻略</el-menu-item>
      <el-menu-item index="/hotel">订酒店</el-menu-item>
      <el-menu-item index="/speak" @click="isshow">社区</el-menu-item>
    </el-menu>
    <el-badge
      :hidden="store.state.hiddenFlag"
      :value="store.state.badgeValue"
      class="item"
      @click="drawer = true"
    >
      <el-icon size="30" color="#999" style="cursor: pointer"
        ><Message
      /></el-icon>
    </el-badge>
    <div class="user" @click="getToUser">
      <img
        :src="login.baseApi + store.state.pic"
        alt=""
        :title="store.state.userInfo.username"
      />
    </div>
  </div>
  <router-view></router-view>
  <div class="footer">
    <span
      >违法和不良信息举报、投诉电话: 010-8666666 举报、投诉邮箱:
      woxiaxiede@bieguan.com 涉未成年人不良信息专用举报邮箱:
      woxiaxiede@bieguan.com 算法推荐违规信息专用举报邮箱:
      woxiaxiede@bieguan.com 全国旅游投诉电话: 12345</span
    >
  </div>
  <el-drawer v-model="drawer" title="消息" :with-header="false" @closed="close">
    <span v-if="store.state.badgeValue == 0">暂无消息</span>
    <span class="messagebox" v-else>
      <el-icon color="green"><SuccessFilled /></el-icon>
      <p v-if="hotelmessage.isbuy == 1">
        您已成功预定 {{ hotelmessage.hotelname }} 酒店， <br />
        {{ timechange(hotelmessage.sdate) }} -
        {{ timechange(hotelmessage.edate) }}
        {{ hotelmessage.type }}
      </p>
      <p v-if="hotelmessage.isbuy == 2">
        您已取消支付 {{ hotelmessage.hotelname }} 酒店， <br />
        {{ timechange(hotelmessage.sdate) }} -
        {{ timechange(hotelmessage.edate) }}
        {{ hotelmessage.type }}
      </p>
    </span>
  </el-drawer>
</template>

<script setup>
import { useRouter } from "vue-router";
import login from "../api/login";
import store from "../store/index";
import { useStore } from "vuex";
import { Message } from "@element-plus/icons-vue";
import qs from "qs";
import { ref } from "vue";
import { SuccessFilled } from "@element-plus/icons-vue";
const drawer = ref(false);
const ustore = useStore();
const router = useRouter();
// 获取用户信息
login
  .getUserinfo(qs.stringify({ username: store.state.userInfo.username }))
  .then(({ data }) => {
    // console.log(data);
    if (data.status == 200) {
      if (data.data[0].isbdge != null && data.data[0].isbdge != 0) {
        ustore.commit("setreavalue", data.data[0].isbdge);
        if (store.state.hiddenFlag == true) {
          ustore.commit("changehidden");
        }
      } else {
        ustore.commit("setreavalue", 0);
        if (store.state.hiddenFlag == false) {
          ustore.commit("changehidden");
        }
      }
      if (data.data[0].pic != null) {
        // console.log(data.data[0].pic);
        ustore.commit("changePic", data.data[0].pic);
      }
      ustore.commit("setUser", {
        phone: data.data[0].phone,
        identity: data.data[0].identity,
      });
      ustore.commit("setAddress", data.data[0].address);
    }
  });
const getToUser = () => {
  router.push("/user");
};
// 时间
const timechange = (data) => {
  let year = new Date(data).getFullYear();
  let month = new Date(data).getMonth() + 1;
  let day = new Date(data).getDate();
  let time = year + "-" + month + "-" + day;
  return time;
};
const hotelmessage = ref();
login.getbook().then(({ data }) => {
  data.data.filter((item) => {
    if (item.username == store.state.userInfo.username) {
      // console.log(item);
      hotelmessage.value = item;
      return true;
    }
  });
});
const close = () => {
  ustore.commit("setbadgeValue", 0);
  if (store.state.hiddenFlag == false) {
    ustore.commit("changehidden");
  }
  login
    .email(qs.stringify({ isbdge: 0, username: store.state.userInfo.username }))
    .then(({ data }) => {
      console.log(data);
    });
};
const isshow = () => {
  store.state.isshow = true;
};
</script>

<style scoped lang="scss">
.el-menu--horizontal {
  justify-content: center;
  .el-menu-item {
    padding: 0 25px;
  }
}
.logo {
  width: 100px;
  height: 48.6px;
  background-size: 77% 100%;
  background-image: url("../assets/logo.png");
  background-repeat: no-repeat;
  position: absolute;
  left: 3%;
  top: 7%;
}
.user {
  position: absolute;
  top: 0;
  padding: 3px 0;
  right: 70px;
  width: 58.4px;
  height: 52.4px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.footer {
  clear: both;
  width: 100%;
  height: 90px;
  background-color: #545c64;
  text-align: center;
  padding-top: 40px;
  span {
    display: block;
    line-height: 22px;
  }
}
.item {
  position: absolute;
  top: 12px;
  right: 150px;
}
.messagebox {
  width: 100%;
  height: 80px;
  // background-color: aqua;
  border: 1px solid #eee;
  border-radius: 5px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2%;
  p {
    margin: 0;
  }
}
</style>
