<template>
  <div class="bigImg">
    <img src="../assets/images/CoUBGV28HDuALpzxABR490kDN0M39.jpeg" alt="" />
    <div class="shawdonBox">
      <h3>向着未知地出发</h3>
      <el-input
        v-model="input"
        placeholder="我想去..."
        @change="chooseCity($event)"
      />
      <div class="hot-city">
        <a href="javascript:;" @click="getCity($event, 24)">厦门</a>
        <a href="javascript:;" @click="getCity($event, 37)">西安</a>
        <a href="javascript:;" @click="getCity($event, 51)">东京</a>
        <a href="javascript:;" @click="getCity($event, 58)">清迈</a>
      </div>
    </div>
  </div>
  <div class="banner">
    <div class="hotCity">
      <div class="hotTitle">
        <h2>热门目的地</h2>
      </div>
      <div class="hotBody">
        <el-tabs v-model="activeName" class="demo-tabs">
          <el-tab-pane label="国内" name="first">
            <div class="list">
              <div class="col">
                <dl>
                  <dt>直辖市</dt>
                  <dd>
                    <a href="javascript:;" @click="getCity($event, 1)">北京</a>
                    <a href="javascript:;" @click="getCity($event, 2)">上海</a>
                    <a href="javascript:;" @click="getCity($event, 3)">重庆</a>
                    <a href="javascript:;" @click="getCity($event, 4)">天津</a>
                  </dd>
                </dl>
                <dl>
                  <dt>云南</dt>
                  <dd>
                    <a href="javascript:;" @click="getCity($event, 5)"
                      >西双版纳</a
                    >
                    <a href="javascript:;" @click="getCity($event, 6)">丽江</a>
                    <a href="javascript:;" @click="getCity($event, 7)">大理</a>
                    <a href="javascript:;" @click="getCity($event, 8)">昆明</a>
                    <a href="javascript:;" @click="getCity($event, 9)"
                      >香格里拉</a
                    >
                    <a href="javascript:;" @click="getCity($event, 10)">双廊</a>
                  </dd>
                </dl>
                <dl>
                  <dt>四川</dt>
                  <dd>
                    <a href="javascript:;" @click="getCity($event, 11)">成都</a>
                    <a href="javascript:;" @click="getCity($event, 12)"
                      >九寨沟</a
                    >
                    <a href="javascript:;" @click="getCity($event, 13)">稻城</a>
                    <a href="javascript:;" @click="getCity($event, 14)"
                      >都江堰</a
                    >
                    <a href="javascript:;" @click="getCity($event, 15)"
                      >峨眉山</a
                    >
                    <a href="javascript:;" @click="getCity($event, 16)"
                      >牛背山</a
                    >
                  </dd>
                </dl>
                <dl>
                  <dt>浙江</dt>
                  <dd>
                    <a href="javascript:;" @click="getCity($event, 17)">杭州</a>
                    <a href="javascript:;" @click="getCity($event, 18)">西塘</a>
                    <a href="javascript:;" @click="getCity($event, 19)"
                      >普陀山</a
                    >
                    <a href="javascript:;" @click="getCity($event, 20)">南浔</a>
                    <a href="javascript:;" @click="getCity($event, 21)">乌镇</a>
                  </dd>
                </dl>
                <dl>
                  <dt>海南 福建</dt>
                  <dd>
                    <a href="javascript:;" @click="getCity($event, 22)">三亚</a>
                    <a href="javascript:;" @click="getCity($event, 24)">厦门</a>
                    <a href="javascript:;" @click="getCity($event, 25)"
                      >鼓浪屿</a
                    >
                  </dd>
                </dl>
              </div>
              <div class="col" style="margin-left: 60px">
                <dl>
                  <dt>江苏</dt>
                  <dd>
                    <a href="javascript:;" @click="getCity($event, 27)">南京</a>
                    <a href="javascript:;" @click="getCity($event, 28)"
                      >连云港</a
                    >
                    <a href="javascript:;" @click="getCity($event, 30)">无锡</a>
                  </dd>
                </dl>
                <dl>
                  <dt>广东 广西</dt>
                  <dd>
                    <a href="javascript:;" @click="getCity($event, 32)">汕头</a>
                    <a href="javascript:;" @click="getCity($event, 33)">珠海</a>
                    <a href="javascript:;" @click="getCity($event, 34)">桂林</a>
                    <a href="javascript:;" @click="getCity($event, 35)"
                      >黄姚古镇</a
                    >
                    <a href="javascript:;" @click="getCity($event, 36)"
                      >龙脊梯田</a
                    >
                  </dd>
                </dl>
                <dl>
                  <dt>西北</dt>
                  <dd>
                    <a href="javascript:;" @click="getCity($event, 37)">西安</a>
                    <a href="javascript:;" @click="getCity($event, 38)">兰州</a>
                    <a href="javascript:;" @click="getCity($event, 39)">敦煌</a>
                    <a href="javascript:;" @click="getCity($event, 40)"
                      >嘉峪关</a
                    >
                    <a href="javascript:;" @click="getCity($event, 41)">新疆</a>
                  </dd>
                </dl>
                <dl>
                  <dt>山西 山东</dt>
                  <dd>
                    <a href="javascript:;" @click="getCity($event, 42)">青岛</a>
                    <a href="javascript:;" @click="getCity($event, 43)">烟台</a>
                    <a href="javascript:;" @click="getCity($event, 44)">日照</a>
                    <a href="javascript:;" @click="getCity($event, 45)">蓬莱</a>
                  </dd>
                </dl>
                <dl>
                  <dt>安徽 江西</dt>
                  <dd>
                    <a href="javascript:;" @click="getCity($event, 46)">黄山</a>
                    <a href="javascript:;" @click="getCity($event, 47)">婺源</a>
                    <a href="javascript:;" @click="getCity($event, 48)"
                      >景德镇</a
                    >
                    <a href="javascript:;" @click="getCity($event, 49)">庐山</a>
                  </dd>
                </dl>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="日本" name="second">
            <div class="list">
              <div class="col">
                <dl>
                  <dt>日本</dt>
                  <dd>
                    <a href="javascript:;" @click="getCity($event, 51)">东京</a>
                    <a href="javascript:;" @click="getCity($event, 52)">大阪</a>
                    <a href="javascript:;" @click="getCity($event, 54)">奈良</a>
                    <a href="javascript:;" @click="getCity($event, 56)"
                      >北海道</a
                    >
                  </dd>
                </dl>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="东南亚" name="third">
            <div class="list">
              <div class="col">
                <dl>
                  <dt>泰国</dt>
                  <dd>
                    <a href="javascript:;" @click="getCity($event, 58)">清迈</a>
                    <a href="javascript:;" @click="getCity($event, 59)">象岛</a>
                    <a href="javascript:;" @click="getCity($event, 60)">曼谷</a>
                  </dd>
                </dl>
                <dl>
                  <dt>新加坡 印尼</dt>
                  <dd>
                    <a href="javascript:;" @click="getCity($event, 61)"
                      >新加坡</a
                    >
                    <a href="javascript:;" @click="getCity($event, 62)"
                      >巴厘岛</a
                    >
                    <a href="javascript:;" @click="getCity($event, 63)"
                      >民丹岛</a
                    >
                  </dd>
                </dl>
                <dl>
                  <dt>马来西亚</dt>
                  <dd>
                    <a href="javascript:;" @click="getCity($event, 64)">沙巴</a>
                    <a href="javascript:;" @click="getCity($event, 65)"
                      >兰卡威</a
                    >
                  </dd>
                </dl>
              </div>
              <div class="col" style="margin-left: 60px">
                <dl>
                  <dt>菲律宾 文莱</dt>
                  <dd>
                    <a href="javascript:;" @click="getCity($event)">宿雾</a>
                    <a href="javascript:;" @click="getCity($event)">薄荷岛</a>
                    <a href="javascript:;" @click="getCity($event)">杜马盖地</a>
                    <a href="javascript:;" @click="getCity($event)">长滩岛</a>
                  </dd>
                </dl>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="欧美" name="fourth">
            <div class="list">
              <div class="col">
                <dl>
                  <dt>美国</dt>
                  <dd>
                    <a href="javascript:;" @click="getCity($event, 67)"
                      >洛杉矶</a
                    >
                    <a href="javascript:;" @click="getCity($event, 68)"
                      >旧金山</a
                    >
                    <a href="javascript:;" @click="getCity($event, 69)"
                      >华盛顿</a
                    >
                    <a href="javascript:;" @click="getCity($event, 70)"
                      >芝加哥</a
                    >
                    <a href="javascript:;" @click="getCity($event, 71)"
                      >阿拉斯加</a
                    >
                    <a href="javascript:;" @click="getCity($event, 72)"
                      >夏威夷</a
                    >
                  </dd>
                </dl>
                <dl>
                  <dt>英国 爱尔兰</dt>
                  <dd>
                    <a href="javascript:;" @click="getCity($event, 73)">伦敦</a>
                    <a href="javascript:;" @click="getCity($event, 74)"
                      >爱丁堡</a
                    >
                    <a href="javascript:;" @click="getCity($event, 75)">剑桥</a>
                    <a href="javascript:;" @click="getCity($event, 76)">牛津</a>
                    <a href="javascript:;" @click="getCity($event, 77)"
                      >都柏林</a
                    >
                  </dd>
                </dl>
                <dl>
                  <dt>意大利</dt>
                  <dd>
                    <a href="javascript:;" @click="getCity($event, 78)">罗马</a>
                    <a href="javascript:;" @click="getCity($event, 79)"
                      >威尼斯</a
                    >
                    <a href="javascript:;" @click="getCity($event, 80)">米兰</a>
                    <a href="javascript:;" @click="getCity($event, 81)"
                      >五渔村</a
                    >
                  </dd>
                </dl>
                <dl>
                  <dt>法国 瑞士</dt>
                  <dd>
                    <a href="javascript:;" @click="getCity($event, 82)">巴黎</a>
                    <a href="javascript:;" @click="getCity($event, 83)"
                      >日内瓦</a
                    >
                  </dd>
                </dl>
                <dl>
                  <dt>俄罗斯</dt>
                  <dd>
                    <a href="javascript:;" @click="getCity($event, 85)"
                      >莫斯科</a
                    >
                    <a href="javascript:;" @click="getCity($event, 86)"
                      >贝加尔湖</a
                    >
                  </dd>
                </dl>
              </div>
              <div class="col" style="margin-left: 60px">
                <dl>
                  <dt>冰岛</dt>
                  <dd>
                    <a href="javascript:;" @click="getCity($event, 88)"
                      >阿克雷里</a
                    >
                    <a href="javascript:;" @click="getCity($event, 89)">维克</a>
                    <a href="javascript:;" @click="getCity($event, 90)"
                      >雷克雅未克</a
                    >
                  </dd>
                </dl>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
// import { TabsPaneContext } from "element-plus";
const activeName = ref("first");
const input = ref("");
const store = useStore();
const router = useRouter();
const chooseCity = (event) => {
  console.log(event);
};
const getCity = (event, cityid) => {
  console.log(event.target.text);
  console.log(cityid);
  store.commit("setCityName", event.target.text);
  store.commit("setCityId", cityid);
  router.push("/detail");
};
</script>

<style lang="scss" scoped>
.bigImg {
  width: 100%;
  height: 350px;
  color: white;
  img {
    width: 100%;
    height: 350px;
    object-fit: cover;
  }
}
.shawdonBox {
  position: absolute;
  top: 27%;
  left: 17%;
  width: 400px;
  height: 110px;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.4);
  h3 {
    text-align: center;
    margin-bottom: 12px;
  }
}
.hot-city {
  margin-top: 15px;
  a {
    margin: 0 8px;
    color: #fff;
  }
}
a:hover {
  color: orangered;
}
:deep(.el-input__inner) {
  padding: 8px;
  font-size: 16px;
}
.hotTitle {
  width: 1000px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  margin-bottom: 15px;
}
.list {
  width: 100%;
  .col {
    float: left;
    width: 470px;
    height: 100%;
    dl {
      width: 470px;
      height: 46.8px;
      text-align: center;
      line-height: 46.8px;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
      dt {
        float: left;
        width: 80px;
        height: 100%;
        font-size: 15px;
      }
      dd {
        float: left;
        margin-left: 34px;
        a {
          margin-right: 15px;
          font-size: 14px;
        }
      }
    }
  }
}
a {
  color: #6d6a6a;
}
a:hover {
  color: orangered;
}
.banner {
  margin-bottom: 50px;
}
</style>
