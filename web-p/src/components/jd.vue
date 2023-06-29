<template>
  <el-dialog v-model="dialogVisible" title="地图显示" width="30%">
    <Suspense>
      <template #default>
        <div class="posbox">
          <Map :address="addressM" :key="timer"></Map>
        </div>
      </template>
    </Suspense>
  </el-dialog>
  <div class="jdbox">
    <div class="none" v-if="jdData.length == 0">
      <h1>暂无酒店</h1>
      <router-link to="/hotel">点击查看更多</router-link>
    </div>
    <div class="have" v-else>
      <li :key="item.id" v-for="item in jdData">
        <img :src="login.baseApi + item.pic" alt="" />
        <div class="textbody">
          <h3 @click="goto(item.hotelname)">{{ item.hotelname }}</h3>
          <p>{{ item.engname }}</p>
          <el-icon @click="showmap(item.city)"><LocationInformation /></el-icon>
          <span>{{ item.city }}</span>
        </div>
        <div class="rightbox" @click="goto(item.hotelname)">
          <el-rate
            v-model="item.level"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value} points"
          />
          <div class="price">
            ￥<i>{{ item.price }} </i> 起
          </div>
        </div>
      </li>
    </div>
  </div>
</template>

<script setup>
import Map from "../components/companyMap.vue";
import login from "../api/login";
import store from "../store/index";
import qs from "qs";
import { ref } from "vue";
import { LocationInformation } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const addressM = ref("");
// import { tr } from "element-plus/es/locale";
const router = useRouter();
const dialogVisible = ref(false);
// import {useRouter} from ""
const jdData = ref([]);
// console.log(store.state.cityName);
const goto = (hotelname) => {
  // console.log(hotelname);
  router.push({ path: "/hMessage", query: { hotelname } });
};
login
  .selectHotel(qs.stringify({ city: store.state.cityName }))
  .then(({ data }) => {
    // console.log(data);
    if (data.status == 200) {
      // console.log(data.data);
      data.data.forEach((item) => {
        // console.log(item.pic.split(",")[0]);
        item.pic = item.pic.split(",")[0];
      });
      // console.log(data.data);
      jdData.value = data.data;
    }
  });
const timer = ref("");

const showmap = (address) => {
  // console.log(address);
  // address.value = address + "";
  addressM.value = address;
  dialogVisible.value = true;
  timer.value = new Date().getTime();
};
// console.log(addressM.value);
</script>

<style scoped lang="scss">
// .posbox {
//   width: 200px;
//   height: 160px;
// }
.jdbox {
  margin: 0 auto;
  width: 1000px;
  min-height: 370px;
}
.none {
  width: 100%;
  height: 80px;
  text-align: center;
  padding: 40px 0;
  letter-spacing: 8px;
  font-weight: 0;
}
.have {
  width: 100%;
  height: 100%;
  margin-top: 50px;
  min-height: 140px;
  li {
    width: 100%;
    height: 138px;
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 3%;
    margin-bottom: 15px;
    border-bottom: 1px solid #ccc;
    img {
      width: 300px;
      height: 130px;
      object-fit: cover;
    }
    h3 {
      margin: 0;
    }
    p {
      margin-bottom: 20px;
    }
  }
}
li:hover {
  transition: all 0.5s;
  transform: translate3d(3px, -3px, 0);
  box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.2);
}
.textbody {
  width: 280px;
}
.rightbox {
  margin-left: 40px;
  width: 254px;
  height: 130px;
  // background-color: #fff;
  // border-bottom: 1px solid #ccc;
  .el-rate {
    margin: 30px 0;
  }
  .price {
    // float: right;
    margin-left: 155px;
    // margin-top: 100px;
    i {
      font-size: 26px;
    }
  }
}
</style>
