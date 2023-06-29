<template>
  <div class="banner2">
    <div class="tuijian">
      <h3>推荐攻略</h3>
    </div>
    <div :key="item.id" v-for="item in list" class="bigbox">
      <div class="youji">
        <div class="title">
          <svg
            t="1678928730152"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="20803"
            width="200"
            height="200"
          >
            <path
              d="M512 104c55.1 0 108.5 10.8 158.8 32 48.6 20.5 92.2 50 129.7 87.5s66.9 81.1 87.5 129.7c21.3 50.3 32 103.7 32 158.8s-10.8 108.5-32 158.8c-20.5 48.6-50 92.2-87.5 129.7s-81.1 66.9-129.7 87.5c-50.3 21.3-103.7 32-158.8 32s-108.5-10.8-158.8-32c-48.6-20.5-92.2-50-129.7-87.5s-66.9-81.1-87.5-129.7c-21.3-50.3-32-103.7-32-158.8s10.8-108.5 32-158.8c20.5-48.6 50-92.2 87.5-129.7s81.1-66.9 129.7-87.5c50.3-21.2 103.7-32 158.8-32m0-40C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z"
              fill="#3E4FB7"
              p-id="20804"
            ></path>
            <path
              d="M315 280.8v13.9h378.7l-6.6-13.9zM315 301.4v13.3h388l-6-13.3zM706.3 321.3H315v13.3h398z"
              fill="#3E4FB7"
              p-id="20805"
            ></path>
            <path
              d="M358.9 341.9c-22.6 0-41.2-15.3-41.2-33.9 0-18.6 18.6-33.9 41.2-33.9h326.2l-6-14H358.9c-29.9 0-55.1 21.3-55.1 47.8 0 26.6 24.6 47.8 55.1 47.8h361.4l-6-14c0 0.2-355.4 0.2-355.4 0.2z"
              fill="#3E4FB7"
              p-id="20806"
            ></path>
            <path
              d="M358.9 355.9c-29.9 0-55.1-21.3-55.1-47.8V716c0 24.6 21.9 45.2 49.8 47.2v0.7H719.7v-408H358.9zM304.4 302.1v6c0-2 0.7-4 0.7-6h-0.7z"
              fill="#3E4FB7"
              p-id="20807"
            ></path>
            <path
              d="M360.9 355.9h-2c-29.9 0-55.1-21.3-55.1-47.8V716c0 24.6 21.9 45.2 49.8 47.2v0.7h7.3v-408z"
              fill="#3E4FB7"
              p-id="20808"
            ></path>
            <path
              d="M479.1 555.2l-45.2-68.4-45.8 68.4V355.9h91z"
              fill="#FFFFFF"
              p-id="20809"
            ></path>
          </svg>
          <h3>{{ item.title.split(",")[0] }}</h3>
        </div>
        <div class="leftimg">
          <img :src="login.baseApi + item.img" alt="" />
        </div>
        <div class="righttext" @click="gotocommunity(item.id)">
          <div class="top">{{ matchReg(item.text) }}</div>
          <div class="bottom">
            <div class="nickpic">
              <img :src="login.baseApi + item.nickpic" alt="" />
            </div>
            <span>{{ item.nickname }}</span>
            <span>{{ item.watch }}浏览</span>
          </div>
        </div>
      </div>
      <div class="youji">
        <div class="title">
          <svg
            t="1678929435200"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="22043"
            width="200"
            height="200"
          >
            <path
              d="M510.139764 510.148298m-510.131231 0a510.131231 510.131231 0 1 0 1020.262462 0 510.131231 510.131231 0 1 0-1020.262462 0Z"
              fill="#3192F2"
              p-id="22044"
            ></path>
            <path
              d="M281.9793 575.393077c16.639723-12.356061 52.22313 0.204797 52.22313 0.204796l26.111565 8.82332a22.322828 22.322828 0 0 0 26.060365-8.618523l70.381761-76.269662a17.066382 17.066382 0 0 0-2.986617-25.701972l-146.463692-99.053282a22.305762 22.305762 0 0 1-0.136531-34.900752l8.652655-8.703855c43.655806-25.667839 104.343861 0.42666 104.343861 0.42666l113.269579 61.55844c11.553941 6.314561 26.043299-8.618523 26.043299-8.618523l137.04305-119.652405c20.155397-15.18908 46.693622-8.959851 60.073665 4.300728 13.380044 13.243513 15.871735 33.535441 2.679422 55.158547l-121.171314 139.125148s-13.82377 15.922935-8.58439 26.145698l61.319511 113.696238s26.111565 60.824586 0.42666 104.719321l-8.652656 8.703855c-9.676639 8.328395-23.910001 8.516125-33.791437 0.42666l-94.616023-144.535191a17.066382 17.066382 0 0 0-25.428909-3.58394l-77.481376 66.780753c-7.492142 6.434026-14.506425 17.885569-12.287795 27.511008l8.806253 26.23103s12.526725 35.634606 0.204797 52.342594a23.654006 23.654006 0 0 1-38.570024-7.560407c-12.97045-31.026683-27.152614-54.697755-42.580623-70.99615-15.957067-16.895718-41.761437-33.091715-77.378977-48.58799a24.268396 24.268396 0 0 1-7.509209-39.372144z"
              fill="#FFFFFF"
              p-id="22045"
            ></path>
          </svg>
          <h3>{{ item.title.split(",")[1] }}</h3>
        </div>
        <div class="contain">
          <div class="left">
            <img :src="login.baseApi + item.pics.split(',')[0]" alt="" />
          </div>
          <div class="mid">
            <img :src="login.baseApi + item.pics.split(',')[1]" alt="" />
          </div>
          <div class="right">
            <img :src="login.baseApi + item.pics.split(',')[2]" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import login from "../api/login";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useStore();
const list = ref();
login.getYouji().then(({ data }) => {
  // console.log(data);
  if (data.status == 200) {
    list.value = data.data;
  }
});
const matchReg = (str) => {
  let reg = /<\/?.+?\/?>/g;
  return str.replace(reg, "");
};
const gotocommunity = (id) => {
  store.commit("setyoujiId", id);
  store.commit("changeOp", "yj");
  router.push("/community");
  store.state.isshow = false;
};
</script>

<style scoped lang="scss">
.banner2 {
  width: 790px;
  margin: 0 auto;
  padding: 15px 0;
  margin-bottom: 50px;
}
.tuijian {
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #eee;
  font-size: 18px;
}
.youji {
  width: 790px;
  height: 240px;
  margin-top: 35px;
  padding: 10px 0;
  padding-right: 5px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}
.youji:hover {
  transition: all 0.5s;
  transform: translate3d(3px, -3px, 0);
  box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.2);
}
.title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
}
svg {
  width: 40px;
  height: 40px;
  margin-right: 15px;
}
.leftimg {
  width: 220px;
  height: 150px;
  float: left;
  img {
    width: 100%;
    height: 100%;
  }
}
.righttext {
  padding-top: 10px;
  float: right;
}
.top {
  width: 550px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  word-break: break-all;
  -webkit-box-orient: vertical;
}
.bottom {
  float: right;
  height: 20px;
  margin-top: 8px;
}
.contain {
  width: 100%;
  height: 130px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left,
.mid,
.right {
  width: 32%;
  height: 100%;
  background-color: #fff;
}
.nickpic {
  width: 20px;
  height: 20px;
  float: left;
  margin-right: 5px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
span {
  margin-right: 5px;
  font-size: 14px;
  color: #ccc;
}
</style>
