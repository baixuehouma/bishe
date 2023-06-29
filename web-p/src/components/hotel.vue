<template>
  <div class="paddbox">
    <div class="titlediv">订酒店</div>
    <div class="mid">
      <input
        class="mdd"
        type="text"
        name=""
        id=""
        placeholder="出行目的地"
        v-model="distination"
      />
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
      <el-button
        color="#ffa800"
        :icon="Search"
        size="large"
        @click="searchHotel"
      />
    </div>
    <div class="benift">
      <ul>
        <li>
          <el-icon><Compass /></el-icon>
          <div class="body">
            <span>住宿攻略</span>
            <p>区域攻略到特色主题，应有尽有</p>
          </div>
        </li>
        <li>
          <el-icon><Coin /></el-icon>
          <div class="body">
            <span>专享价格</span>
            <p>多平台价格对比，天天专享特惠</p>
          </div>
        </li>
        <li>
          <el-icon><UserFilled /></el-icon>
          <div class="body">
            <span>真实点评</span>
            <p>超过100万真实用户点评和游记</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="introduce">
      <div class="title">主题住宿</div>
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="迪士尼乐园" name="first">
          <div class="tabBody">
            <div @click="gotodh('美国')">
              <div class="pic">
                <img src="../assets/images/dsn1.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>奥兰多</h3>
                <span>美国</span>
              </div>
            </div>
            <div @click="gotodh('中国')">
              <div class="pic">
                <img src="../assets/images/dsn2.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>上海</h3>
                <span>中国</span>
              </div>
            </div>
            <div @click="gotodh('中国')">
              <div class="pic">
                <img src="../assets/images/dsn3.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>香港</h3>
                <span>中国</span>
              </div>
            </div>
            <div @click="gotodh('美国')">
              <div class="pic">
                <img src="../assets/images/dsn4.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>洛杉矶</h3>
                <span>美国</span>
              </div>
            </div>
            <div @click="gotodh('法国')">
              <div class="pic">
                <img src="../assets/images/dsn5.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>巴黎</h3>
                <span>法国</span>
              </div>
            </div>
            <div @click="gotodh('日本')">
              <div class="pic">
                <img src="../assets/images/dsn6.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>东京</h3>
                <span>日本</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="吃货根据地" name="second">
          <div class="tabBody">
            <div @click="gotodh('中国')">
              <div class="pic">
                <img src="../assets/images/ch1.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>成都</h3>
                <span>四川</span>
              </div>
            </div>
            <div @click="gotodh('中国')">
              <div class="pic">
                <img src="../assets/images/ch2.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>西安</h3>
                <span>陕西</span>
              </div>
            </div>
            <div @click="gotodh('中国')">
              <div class="pic">
                <img src="../assets/images/ch3.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>重庆</h3>
                <span>重庆</span>
              </div>
            </div>
            <div @click="gotodh('中国')">
              <div class="pic">
                <img src="../assets/images/ch4.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>长沙</h3>
                <span>湖南</span>
              </div>
            </div>
            <div @click="gotodh('中国')">
              <div class="pic">
                <img src="../assets/images/ch5.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>澳门</h3>
                <span>澳门</span>
              </div>
            </div>
            <div @click="gotodh('中国')">
              <div class="pic">
                <img src="../assets/images/ch6.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>兰州</h3>
                <span>甘肃</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="亲子之选" name="third">
          <div class="tabBody">
            <div @click="gotodh('泰国')">
              <div class="pic">
                <img src="../assets/images/qz1.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>狗骨岛</h3>
                <span>泰国</span>
              </div>
            </div>
            <div @click="gotodh('中国')">
              <div class="pic">
                <img src="../assets/images/qz2.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>三亚</h3>
                <span>中国</span>
              </div>
            </div>
            <div @click="gotodh('中国')">
              <div class="pic">
                <img src="../assets/images/qz3.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>大阪</h3>
                <span>重庆</span>
              </div>
            </div>
            <div @click="gotodh('泰国')">
              <div class="pic">
                <img src="../assets/images/qz4.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>苏梅岛</h3>
                <span>泰国</span>
              </div>
            </div>
            <div @click="gotodh('新西兰')">
              <div class="pic">
                <img src="../assets/images/qz5.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>皇后镇</h3>
                <span>新西兰</span>
              </div>
            </div>
            <div @click="gotodh('澳大利亚')">
              <div class="pic">
                <img src="../assets/images/qz6.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>大堡礁</h3>
                <span>澳大利亚</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="童话小镇" name="fourth">
          <div class="tabBody">
            <div @click="gotodh('德国')">
              <div class="pic">
                <img src="../assets/images/cb1.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>罗腾堡</h3>
                <span>德国</span>
              </div>
            </div>
            <div @click="gotodh('德国')">
              <div class="pic">
                <img src="../assets/images/cb2.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>海德堡</h3>
                <span>德国</span>
              </div>
            </div>
            <div @click="gotodh('阿迪力')">
              <div class="pic">
                <img src="../assets/images/cb3.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>哈尔施塔特</h3>
                <span>阿迪力</span>
              </div>
            </div>
            <div @click="gotodh('意大利')">
              <div class="pic">
                <img src="../assets/images/cb4.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>五渔村</h3>
                <span>意大利</span>
              </div>
            </div>
            <div @click="gotodh('荷兰')">
              <div class="pic">
                <img src="../assets/images/cb5.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>羊角村</h3>
                <span>荷兰</span>
              </div>
            </div>
            <div @click="gotodh('瑞士')">
              <div class="pic">
                <img src="../assets/images/cb6.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>因特拉肯</h3>
                <span>瑞士</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="浪漫花海" name="fifth">
          <div class="tabBody">
            <div @click="gotodh('日本')">
              <div class="pic">
                <img src="../assets/images/hh1.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>富士山</h3>
                <span>日本</span>
              </div>
            </div>
            <div @click="gotodh('日本')">
              <div class="pic">
                <img src="../assets/images/hh2.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>奈良</h3>
                <span>日本</span>
              </div>
            </div>
            <div @click="gotodh('荷兰')">
              <div class="pic">
                <img src="../assets/images/hh3.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>阿姆斯特丹</h3>
                <span>荷兰</span>
              </div>
            </div>
            <div @click="gotodh('比利时')">
              <div class="pic">
                <img src="../assets/images/cb4.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>布鲁塞尔</h3>
                <span>比利时</span>
              </div>
            </div>
            <div @click="gotodh('中国')">
              <div class="pic">
                <img src="../assets/images/hh5.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>林芝</h3>
                <span>中国</span>
              </div>
            </div>
            <div @click="gotodh('中国')">
              <div class="pic">
                <img src="../assets/images/hh6.jpeg" alt="" />
              </div>
              <div class="info">
                <h3>罗平</h3>
                <span>中国</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Search, UserFilled, Compass, Coin } from "@element-plus/icons-vue";
const value1 = ref([
  new Date(2000, 10, 10, 10, 10),
  new Date(2000, 10, 11, 10, 10),
]);
const store = useStore();
const activeName = ref("first");
const changeDate = (value) => {
  store.commit("setLiveTime", [value[0], value[1]]);
};
const distination = ref();
const router = useRouter();
const searchHotel = () => {
  store.commit("setdistination", distination.value);
  if (distination.value != undefined) {
    router.push("/detailhotel");
  } else {
    ElMessage.error("请输入目的地.");
  }
};
const gotodh = (city) => {
  store.commit("setdistination", city);
  router.push("/detailhotel");
};
</script>

<style scoped lang="scss">
.el-icon {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  svg {
    width: 100%;
    height: 100%;
    color: #797777;
  }
}
.benift {
  margin-top: 60px;
  color: #4b4b4b;
  width: 100%;
  height: 100px;
  p {
    color: #4b4b4b;
  }
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 40px;
  }
}
.paddbox {
  width: 935px;
  padding: 80px 0 80px 300px;
}
.titlediv {
  font-size: 22px;
}
.mid {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 50px;
  width: 100%;
  height: 50px;
}
.mdd {
  width: 300px;
  height: 46px;
  margin-right: 65px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding-left: 8px;
  font-size: 18px;
}
:deep(.el-select .el-input__wrapper) {
  height: 46px;
}
.block {
  width: 380px;
  height: 47px;
  border-radius: 5px;
  margin-right: 60px;
}
:deep(.el-range-editor.el-input__wrapper) {
  height: 47px;
}
.el-button {
  width: 90px;
  height: 45px;
}
.introduce {
  width: 100%;
  height: 100%;
  margin-top: 30px;
  .title {
    width: 100%;
    height: 50px;
    text-align: center;
    font-size: 26px;
    margin-bottom: 15px;
  }
}
:deep(.el-tabs__item) {
  padding: 0 103px;
  font-size: 20px;
  font-weight: normal;
}
:deep(.el-tabs__nav-wrap) {
  width: 935px;
  height: 100%;
}

.tabBody {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  div {
    position: relative;
    width: 30%;
    height: 240px;
    margin-right: 3%;
    margin-top: 2%;
    cursor: pointer;
    .info {
      color: #fff;
      position: absolute;
      width: 200px;
      height: 60px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      h3 {
        font-size: 28px;
      }
      span {
        font-size: 18px;
      }
    }
    .pic {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
