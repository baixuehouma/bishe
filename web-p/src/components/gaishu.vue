<template>
  <div class="gs">
    <el-tabs :tab-position="tabPosition" class="demo-tabs">
      <el-tab-pane :label="list.miss">
        <div class="content">
          <h3>{{ list.miss }}</h3>
          <span>——</span>
          <ul v-html="list.misscontent"></ul>
          <img :src="login.baseApi + list.img[1]" alt="" />
        </div>
      </el-tab-pane>
      <el-tab-pane :label="list.place">
        <div class="content">
          <h3>{{ list.place }}</h3>
          <span>——</span>
          <ul v-html="list.space"></ul>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="list.eat">
        <div class="content">
          <h3>{{ list.eat }}</h3>
          <span>——</span>
          <ul v-html="list.food"></ul>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="list.gaishu">
        <div class="content">
          <h3>{{ list.gaishu }}</h3>
          <span>——</span>
          <div v-html="list.gaishucontent"></div>
          <img
            style="width: 700px; height: 600px"
            :src="login.baseApi + list.img[0]"
            alt=""
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import store from "@/store";
import login from "../api/login";
import qs from "qs";
const tabPosition = ref("left");
const list = reactive({
  miss: "",
  misscontent: [],
  gaishu: "",
  gaishucontent: "",
  place: "",
  space: [],
  eat: "",
  food: [],
  img: [],
});
login
  .getcitydetail(qs.stringify({ cityId: store.state.cityId }))
  .then(({ data }) => {
    if (data.status == 200) {
      list.miss = data.data[0].miss;
      list.misscontent = data.data[0].misscontent;
      list.space = data.data[0].space;
      list.place = data.data[0].place;
      list.gaishu = data.data[0].gaishu;
      list.gaishucontent = data.data[0].zhuyishixiang;
      list.eat = data.data[0].eat;
      list.food = data.data[0].food;
      list.img = data.data[0].img.split(",");
    }
  });
</script>
<style scoped lang="scss">
.gs {
  padding: 30px 120px;
  min-height: 270px;
}
.content {
  margin-left: 35px;
  padding-right: 150px;
  line-height: 26px;
  span {
    font-size: 18px;
  }
}
</style>
