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
  <div class="bigbody">
    <div class="mid">
      <input class="mdd" type="text" name="" id="" v-model="distination" />
      <div class="block">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="~"
          start-placeholder="Start date"
          end-placeholder="End date"
          value-format="YYYY-MM-DD"
          size="default"
          @change="changeDate"
        />
      </div>
      <el-button color="#ffa800" :icon="Search" />
    </div>
    <div class="introduce">
      <dl>
        <dt>攻略:</dt>
        <dd>
          北京。你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。
          景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。
          由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。
        </dd>
      </dl>
    </div>
    <div class="assess">
      <el-tooltip
        content="等级均价由平日价格计算得出，节假日价格会有所上浮。"
        placement="top"
        effect="dark"
      >
        <div style="width: 40px">均价:</div>
      </el-tooltip>
      <div class="assess">
        <el-tooltip
          content="等级评定是针对房价、设施和服务等各方面水平的综合评估。"
          placement="bottom"
          effect="light"
        >
          <div class="fl">
            <el-icon color="#ffa800"><StarFilled /></el-icon>
            <el-icon color="#ffa800"><StarFilled /></el-icon>
            <el-icon color="#ffa800"><StarFilled /></el-icon>
          </div>
        </el-tooltip>
        <span>￥150</span>
        <el-tooltip
          content="等级评定是针对房价、设施和服务等各方面水平的综合评估。"
          placement="bottom"
          effect="light"
        >
          <div class="fl">
            <el-icon color="#ffa800"><StarFilled /></el-icon>
            <el-icon color="#ffa800"><StarFilled /></el-icon>
            <el-icon color="#ffa800"><StarFilled /></el-icon>
            <el-icon color="#ffa800"><StarFilled /></el-icon>
          </div>
        </el-tooltip>
        <span>￥350</span>
        <el-tooltip
          content="等级评定是针对房价、设施和服务等各方面水平的综合评估。"
          placement="bottom"
          effect="light"
        >
          <div class="fl">
            <el-icon color="#ffa800"><StarFilled /></el-icon>
            <el-icon color="#ffa800"><StarFilled /></el-icon>
            <el-icon color="#ffa800"><StarFilled /></el-icon>
            <el-icon color="#ffa800"><StarFilled /></el-icon>
            <el-icon color="#ffa800"><StarFilled /></el-icon>
          </div>
        </el-tooltip>
        <span>￥550</span>
      </div>
    </div>
    <div class="price">
      <ul>
        <li>
          <div class="slider-demo-block">
            <span>价格</span>
            <span style="float: right; margin-right: 10px"
              >￥{{ rangenum[0] }} ~ {{ rangenum[1] }}</span
            >
            <el-slider
              v-model="value"
              range
              @input="changenum"
              @change="showHotel"
              :max="4000"
            />
          </div>
        </li>
        <span class="cut"></span>
        <li>
          <div class="toptext">住宿等级</div>
          <el-select
            v-model="value3"
            placeholder="不限"
            size="large"
            :fit-input-width="true"
            placement="bottom"
            @change="changelevel"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </li>
        <span class="cut"> </span>
        <li>
          <div class="toptext">住宿类型</div>
          <el-select
            v-model="value4"
            placeholder="不限"
            size="large"
            :fit-input-width="true"
            @change="changeleve2"
          >
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </li>
      </ul>
    </div>
    <div :key="item.id" v-for="item in hotelMessage" class="hotelmessage">
      <div class="leftimg">
        <img :src="login.baseApi + item.pic.split(',')[0]" alt="" />
      </div>
      <div class="rightcontent">
        <div class="hotelname" @click="gotoh(item.hotelname)">
          <h4>{{ item.hotelname }}</h4>
          <span>{{ item.engname }}</span>
        </div>
        <div class="rleft">
          <div class="rate">
            <ul>
              <li>
                <el-progress
                  class="xuanzhuan"
                  type="circle"
                  :percentage="item.appraise"
                  color="#ff9d00"
                  :width="70"
                  :stroke-width="3"
                >
                  <template #default="{ percentage }">
                    <span class="percentage-value"
                      ><i>{{ percentage / 10 }}</i> 分</span
                    >
                    <br />
                    <span class="percentage-label" style="font-size: 15px"
                      >很好</span
                    >
                  </template>
                </el-progress>
              </li>
              <li class="write">
                <router-link
                  :to="{
                    path: '/hMessage',
                    query: { hotelname: item.hotelname },
                  }"
                >
                  <i>{{ item.assess }}条</i>
                  <br />
                  点评评价
                </router-link>
              </li>
            </ul>
          </div>
          <div class="address" @click="showmap(item.city)">
            <el-icon :size="20" style="margin-right: 5px"
              ><LocationFilled
            /></el-icon>
            <span style="font-size: 14px">{{ item.city }}</span>
          </div>
        </div>
        <div class="rleft">
          <div class="level">
            <el-rate
              v-model="item.level"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value} points"
            />
          </div>
          <div class="bottomPrice" @click="gotoh(item.hotelname)">
            ￥{{ item.price }}
          </div>
        </div>
      </div>
    </div>
    <div class="car">
      <lottie-player
        autoplay
        loop
        mode="normal"
        src="https://assets4.lottiefiles.com/packages/lf20_znxtcbvh33.json"
        style="width: 400px"
      ></lottie-player>
    </div>
  </div>
</template>

<script setup>
import Map from "../components/companyMap.vue";
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import store from "../store/index.js";
import login from "../api/login";
import qs from "qs";
import "@lottiefiles/lottie-player";
import { Search, StarFilled, LocationFilled } from "@element-plus/icons-vue";
const hotelMessage = ref();
const addressM = ref("");
const dialogVisible = ref(false);
const dingliang = ref();
const options = [
  {
    value: "★",
  },
  {
    value: "★★",
  },
  {
    value: "★★★",
  },
  {
    value: "★★★★",
  },
  {
    value: "★★★★★",
  },
];
const options2 = [
  {
    value: "亲子之选",
  },
  {
    value: "出差必备",
  },
  {
    value: "浪漫花海",
  },
  {
    value: "吃货根据地",
  },
  {
    value: "童话小镇",
  },
];
login
  .getHotelMessageBycityName(qs.stringify({ name: store.state.distination }))
  .then(({ data }) => {
    if (data.status == 200) {
      console.log(data);
      hotelMessage.value = data.data;
      dingliang.value = data.data;
    }
  });
const ustore = useStore();
const router = useRouter();
const distination = ref();
distination.value = store.state.distination;
const value1 = ref();
const value = ref([0, 4000]);
value1.value = store.state.liveTime;
// const changeFlag = ref(false);
const changeDate = (value) => {
  // console.log(value);
  // if (changeFlag.value) {
  //   ustore.commit("setLiveTime", [value[0], value[1]]);
  //   console.log(value1.value);
  //   console.log(value);
  // }
  ustore.commit("setLiveTime", [value[0], value[1]]);
};
// const searchHotel = () => {
//   ustore.commit("setdistination", distination.value);
//   if (distination.value != undefined) {
//     router.push("/detailhotel");
//     // changeFlag.value = true;
//   } else {
//     ElMessage.error("请输入目的地.");
//   }
// };
const rangenum = ref([0, 4000]);
const changenum = (val) => {
  rangenum.value = val;
};
// 选择器
const value3 = ref("");
const value4 = ref("");

const gotoh = (name) => {
  router.push({
    path: "/hMessage",
    query: { hotelname: name },
  });
};
const showHotel = (val) => {
  hotelMessage.value = dingliang.value.filter((item) => {
    if (item.price <= rangenum.value[1] && item.price >= rangenum.value[0]) {
      return item;
    }
  });
};
const changelevel = (val) => {
  hotelMessage.value = dingliang.value.filter((item) => {
    if (item.level == val.length) {
      return item;
    }
  });
};
const changeleve2 = (val) => {
  hotelMessage.value = dingliang.value.filter((item) => {
    // console.log(JSON.parse(item.tags));
    item.tags = JSON.parse(item.tags);
    if (item.tags.indexOf(val) != -1) {
      return item;
    }
  });
  // console.log(val);
  // console.log(dingliag.value);
};
const timer = ref("");
const showmap = (address) => {
  // console.log(address);
  // address.value = address + "";
  addressM.value = address;
  dialogVisible.value = true;
  timer.value = new Date().getTime();
};
</script>

<style scoped lang="scss">
.car {
  position: absolute;
  top: 140px;
  right: 270px;
  width: 400px;
  height: 300px;
}
a:hover {
  text-decoration: underline;
  color: #999;
  text-decoration-thickness: 1px;
}
.bigbody {
  width: 1000px;
  margin: 0 auto;
  padding: 15px;
  margin-bottom: 50px;
}
.mid {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1%;
}
.mdd {
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding-left: 3px;
}
.introduce {
  width: 600px;
  height: 80px;
  font-size: 14px;
  background-color: #fff;
  margin: 25px 0;
  dt {
    float: left;
    width: 50px;
    height: 80px;
    line-height: 25px;
  }
  dd {
    height: 80px;
    line-height: 25px;
  }
}
.assess {
  width: 600px;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 2%;
  font-size: 15px;
  .fl {
    float: left;
  }
}
.price {
  width: 600px;
  height: 70px;
  margin: 35px 0;
  border: 1px solid #ccc;
  padding: 20px;
  ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    li {
      flex: 1;
      background-color: #fff;
      width: 100%;
      height: 80px;
      margin-right: 0;
    }
    li:first-child {
      flex: 2;
    }
  }
}
.el-slider {
  margin-top: 18px;
}
:deep(.el-slider__bar) {
  background-color: #ff9d00;
}
.cut {
  display: block;
  height: 70px;
  margin: 0 18px;
  color: #ccc;
  border-left: 1px solid #ccc;
}
.hotelname {
  cursor: pointer;
}
.toptext {
  width: 100%;
  height: 35px;
}
.leftimg {
  width: 330px;
  height: 240px;
  float: left;
  margin-right: 35px;
  img {
    width: 100%;
    height: 100%;
  }
}
.hotelmessage {
  margin-top: 30px;
  width: 100%;
  height: 270px;
  background-color: #fff;
  padding: 3px;
  border-bottom: 1px solid #e3e0e0;
}
.xuanzhuan {
  transform: rotate(60deg);
}
:deep(
    .el-progress--circle .el-progress__text,
    .el-progress--dashboard .el-progress__text
  ) {
  transform: translate(0, -50%) rotate(-60deg);
}
.rate {
  width: 220px;
  height: 90px;
  margin-top: 10px;
}
.write {
  padding-top: 15px;
}
.rightcontent {
  width: 635px;
  height: 100%;
  float: right;
}
.address {
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.rleft {
  position: relative;
  width: 270px;
  height: 190px;
  float: left;
  margin-right: 5px;
  text-align: center;
  padding: 5px;
  margin-top: 15px;
}
.bottomPrice {
  position: absolute;
  bottom: 10px;
  right: 0;
  font-size: 26px;
  color: #ff9d00;
  margin-right: 10px;
  cursor: pointer;
}
.level {
  margin-top: 40px;
}
</style>
