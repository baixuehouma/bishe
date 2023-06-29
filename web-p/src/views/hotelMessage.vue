<template>
  <div class="bigbox">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
      <el-breadcrumb-item>{{ htm.county }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ htm.city }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ htm.hotelname }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title">
      <h2>{{ $route.query.hotelname }}</h2>
      <span>{{ htm.engname }}</span>
    </div>
    <div class="address">
      <span>地址:{{ htm.city }}</span>
    </div>
    <div class="absoultbox">
      <h3>
        <i>{{ ((ratearr[0] + ratearr[1] + ratearr[2]) / 3 / 10).toFixed(1) }}</i
        >分
      </h3>
      <div class="cut"></div>
      <div class="assess">
        <div>{{ assessarr.length }}评论</div>
      </div>
    </div>
    <div class="pic" v-viewer>
      <el-carousel
        :interval="4000"
        type="card"
        height="300px"
        indicator-position="none"
        :autoplay="false"
      >
        <el-carousel-item v-for="item in picList" :key="item">
          <img :src="login.baseApi + item" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="nav">
      <ul class="content">
        <li @click="go(1)">预定</li>
        <li @click="go(2)">攻略</li>
        <li @click="go(3)">点评</li>
        <li class="last" @click="assessDialog = true">
          <el-icon color="#ff9900"><Edit /></el-icon>
          点评
        </li>
      </ul>
    </div>
    <div class="bookbox" id="book" ref="view">
      <div class="bookTitle">房间类型</div>
      <div class="demo-collapse">
        <el-collapse>
          <el-collapse-item
            :key="item.id"
            v-for="item in arr"
            :title="item.name"
          >
            <div class="develop">
              <img :src="login.baseApi + item.img" alt="" />
              <span>{{ item.tools }}</span>
              <span>{{ item.area }}</span>
              <span
                >￥<i>{{ item.price }}</i
                >起</span
              >
              <el-button type="danger" @click="bookroom(item)">预定</el-button>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div class="gongluebox" id="gonglue" ref="view">
      <dl>
        <dt>基本信息</dt>
        <dd>
          执行OTA: 安可达 Agoda经营资质: 经营资质入住时间: 14:00 -
          20:00离店时间: 12:00之前建成于: 1999年翻修于: 2012年酒店规模: 86间客房
        </dd>
      </dl>
      <dl>
        <dt>出行提示</dt>
        <dd>
          以下费用和押金由酒店在提供服务、办理入住或退房手续时收取。
          早餐费用：每人 PHP 485 至 PHP 700（约计金额） 折叠床使用费：每晚 PHP
          1000.00
          上面所列内容可能并不完整。这些费用和押金可能不包括税款，并且可能会随时发生变化。
          按摩服务需要进行预订，可在到达之前使用预订确认信息上的联系方式与度假村取得联系以进行预订。
          此酒店不允许携带宠物，包括服务类动物（例如导盲犬）。
          此酒店正在装修，受影响的区域包括： 部分客房
          在装修期间，度假村将尽一切努力使噪音和干扰程度降至最低。
        </dd>
      </dl>
    </div>
    <div class="dianpingbox" id="dianping" ref="view">
      <div class="title">
        <h3>{{ assessarr.length }}条用户真实点评</h3>
      </div>
      <div class="bodytext">
        <div class="rate">
          <div class="left">
            <span
              ><i>{{
                ((ratearr[0] + ratearr[1] + ratearr[2]) / 3 / 10).toFixed(1)
              }}</i
              >分</span
            >
          </div>
          <div class="right">
            <ul>
              <li>
                <span>环境</span>
                <el-progress :percentage="ratearr[0]" color="#ff9900">
                  <span>{{ ratearr[0] / 10 }}</span>
                </el-progress>
              </li>
              <li>
                <span>卫生</span>
                <el-progress :percentage="ratearr[1]" color="#ff9900">
                  <span>{{ ratearr[1] / 10 }}</span>
                </el-progress>
              </li>
              <li>
                <span>设施</span>
                <el-progress :percentage="ratearr[2]" color="#ff9900">
                  <span>{{ ratearr[2] / 10 }}</span>
                </el-progress>
              </li>
            </ul>
          </div>
        </div>
        <ul class="liuyan">
          <li v-for="item in assessarr" :key="item.username">
            <img
              :src="login.baseApi + item.userpic"
              alt=""
              :title="item.username"
            />
            <el-rate v-model="item.average" disabled text-color="#ff9900" />
            <p>{{ item.texts }}</p>
            <span class="timep">发布时间{{ timechange(item.ptime) }}</span>
          </li>
        </ul>
      </div>
    </div>
    <el-dialog v-model="dialogVisible" title="预定酒店" width="40%">
      <div class="dialogbody">
        <img :src="login.baseApi + bookType.img" alt="" />
        <div>
          <h3>{{ bookType.name }}</h3>
          <span>{{ bookType.tools }}</span>
          <span>{{ bookType.area }}</span>
          <p style="color: #7c7d7d">时间:{{ rangtime[0] }}~{{ rangtime[1] }}</p>
          <p style="margin: 3px 0; color: #7c7d7d">
            手机号：<input type="text" v-model="phone" />
          </p>
          备注：<input type="text" v-model="beizhu" />
        </div>
        <div class="finalprice">￥{{ bookType.price * totalDays }}</div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="danger" @click="bookhotel"> 预定 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="assessDialog" title="点评" width="50%">
      <el-form :model="form" label-width="120px">
        <el-form-item label="服务">
          <el-rate v-model="servicevalue" size="large" :allow-half="true" />
        </el-form-item>
        <el-form-item label="卫生">
          <el-rate v-model="hygienismvalue" size="large" :allow-half="true" />
        </el-form-item>
        <el-form-item label="设施">
          <el-rate v-model="toolvalue" size="large" :allow-half="true" />
        </el-form-item>
        <el-form-item label="点评">
          <el-input v-model="form.desc" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="assessvalue">点评</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ArrowRight, Edit } from "@element-plus/icons-vue";
import login from "../api/login";
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
// import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import qs from "qs";
import store from "../store/index";
const rangtime = ref([]);
const beizhu = ref("无");
const phone = ref("");
phone.value = store.state.user.phone;
rangtime.value = store.state.liveTime;
console.log(rangtime.value);
const dialogVisible = ref(false);
// const router = useRouter();
const route = useRoute();
const arr = ref([]);
// 时间
const timechange = (data) => {
  let year = new Date(data).getFullYear();
  let month = new Date(data).getMonth() + 1;
  let day = new Date(data).getDate();
  let time = year + "-" + month + "-" + day;
  return time;
};
// const value = ref(4);
const go = (id) => {
  if (id == 1) {
    document
      .getElementById("book")
      .scrollIntoView({ behavior: "smooth", block: "center" });
  } else if (id == 2) {
    document
      .getElementById("gonglue")
      .scrollIntoView({ behavior: "smooth", block: "center" });
  } else if (id == 3) {
    document
      .getElementById("dianping")
      .scrollIntoView({ behavior: "smooth", block: "center" });
  }
};
const htm = ref([]);
const picList = ref([]);
login
  .getHotelMessage(qs.stringify({ name: route.query.hotelname }))
  .then(({ data }) => {
    if (data.status == 200) {
      htm.value = data.data[0];
      // console.log(data.data[0].room);
      arr.value = JSON.parse(data.data[0].room);
      // console.log(data.data[0].pic.split(",")[0]);
      data.data[0].pic.split(",").filter((item) => {
        // console.log(item);
        if (item != "") {
          picList.value.push(item);
        } else {
          return true;
        }
      });
      // console.log(picList.value);
      // picList.value = data.data[0].pic.split(",");
    }
  });
const bookType = ref();
const bookroom = (id) => {
  bookType.value = id;
  dialogVisible.value = true;
};
// console.log(store.state.user.phone);
// console.log(bookType.value.price * totalDays);
const bookhotel = () => {
  dialogVisible.value = false;
  // console.log(bookType.value);
  // console.log(beizhu.value);
  login
    .bookhotel(
      qs.stringify({
        username: store.state.userInfo.username,
        hotelname: route.query.hotelname,
        isbuy: 0,
        sdate: rangtime.value[0],
        edate: rangtime.value[1],
        type: bookType.value.name,
        phone: phone.value,
        identity: store.state.user.identity,
        beizhu: beizhu.value,
        price: bookType.value.price * totalDays,
      })
    )
    .then(({ data }) => {
      if (data.status == 200) {
        ElMessage({
          message: "预定成功，等待付款",
          type: "success",
        });
      }
    });
};
// 计算日期差
let totalDays, diffDate;
let myDate1 = Date.parse(rangtime.value[0]);
let myDate2 = Date.parse(rangtime.value[1]);
diffDate = Math.abs(myDate2 - myDate1);
totalDays = Math.floor(diffDate / (1000 * 3600 * 24));

// 获取点评
const assessarr = ref([]);
const ratearr = ref([]);
login
  .getHotelAssess(qs.stringify({ name: route.query.hotelname }))
  .then(({ data }) => {
    assessarr.value = data.data;
  });
login.getAVG(qs.stringify({ name: route.query.hotelname })).then(({ data }) => {
  // console.log(data.data);
  ratearr.value.push(data.data[0].avg1 * 20);
  ratearr.value.push(data.data[0].avg2 * 20);
  ratearr.value.push(data.data[0].avg3 * 20);
});
// assessDialog
const assessDialog = ref(false);
const form = reactive({
  desc: "",
});
const servicevalue = ref(0);
const hygienismvalue = ref(0);
const toolvalue = ref(0);
const assessvalue = () => {
  if (
    servicevalue.value == 0 ||
    hygienismvalue.value == 0 ||
    toolvalue.value == 0
  ) {
    ElMessage({
      message: "评分不可以为0.",
      type: "warning",
    });
  } else {
    login
      .addAssess(
        qs.stringify({
          hotelname: route.query.hotelname,
          username: store.state.userInfo.username,
          userpic: store.state.pic,
          texts: form.desc,
          service: servicevalue.value,
          hygienism: hygienismvalue.value,
          tools: toolvalue.value,
          ptime: timechange(new Date()),
        })
      )
      .then(({ data }) => {
        if (data.status == 200) {
          ElMessage({
            message: "点评成功!",
            type: "success",
          });
          login
            .getHotelAssess(qs.stringify({ name: route.query.hotelname }))
            .then(({ data }) => {
              assessarr.value = data.data;
            });
          login
            .getAVG(qs.stringify({ name: route.query.hotelname }))
            .then(({ data }) => {
              ratearr.value.splice(0, 1, data.data[0].avg1 * 20);
              ratearr.value.splice(1, 1, data.data[0].avg2 * 20);
              ratearr.value.splice(2, 1, data.data[0].avg3 * 20);
            });
          login
            .updateassess(qs.stringify({ name: route.query.hotelname }))
            .then(({ data }) => {
              console.log(data);
            });
        } else if (data.status == 100) {
          ElMessage({
            message: "修改评论成功！",
            type: "success",
          });
          login
            .getHotelAssess(qs.stringify({ name: route.query.hotelname }))
            .then(({ data }) => {
              assessarr.value = data.data;
            });
          login
            .getAVG(qs.stringify({ name: route.query.hotelname }))
            .then(({ data }) => {
              ratearr.value.splice(0, 1, data.data[0].avg1 * 20);
              ratearr.value.splice(1, 1, data.data[0].avg2 * 20);
              ratearr.value.splice(2, 1, data.data[0].avg3 * 20);
            });
        }
      });
    assessDialog.value = false;
    servicevalue.value = 0;
    toolvalue.value = 0;
    hygienismvalue.value = 0;
    form.desc = "";
  }
};
</script>

<style scoped lang="scss">
:deep(.el-dialog__footer) {
  display: flex;
  justify-content: flex-end;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.bigbox {
  position: relative;
  width: 1000px;
  margin: 0 auto;
  padding: 15px;
}
.title {
  width: 100%;
  height: 50px;
  margin: 30px 0 8px 0;
  span {
    color: #999;
  }
}
.absoultbox {
  position: absolute;
  top: 20px;
  right: 5px;
  width: 140px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  h3 {
    font-weight: normal;
  }
  i {
    font-size: 26px;
    font-weight: 700;
  }
}
.cut {
  height: 40px;
  border-right: 1px solid #ccc;
  margin: 0 6px;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
:deep(.el-collapse-item__header) {
  font-size: 16px !important;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.right .el-progress--line {
  margin-bottom: 15px;
  width: 150px;
  float: right;
  margin: 4px;
}
.pic {
  margin-top: 15px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.nav {
  margin-top: 40px;
  height: 50px;
  color: #333;
  background-color: #fff;
  border: 1px solid #dedede;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  line-height: 50px;
  padding-left: 300px;
  li {
    cursor: pointer;
    margin-right: 55px;
  }
}
.last {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 180px;
}
.bookbox {
  margin: 40px 0;
}
.bookTitle {
  width: 100%;
  height: 50px;
  background-color: #5eb8dc;
  font-size: 18px;
  line-height: 50px;
  padding-left: 15px;
}
.demo-collapse {
  padding-left: 15px;
}
.gongluebox {
  margin: 65px 0;
  dl {
    border-bottom: 1px solid #ccc;
    padding-top: 15px;
    dt {
      width: 100px;
      height: 100%;
      float: left;
      text-align: center;
      margin-right: 30px;
    }
  }
}
dl:first-child {
  height: 60px;
}
dl:last-child {
  height: 130px;
}
.dianpingbox {
  .title {
    width: 100%;
    text-align: center;
  }
}
.bodytext {
  width: 800px;
  height: 300px;
  margin: 0 auto;
  .timep {
    float: right;
    font-size: 12px;
  }
  .liuyan {
    padding: 15px 35px;
    li {
      width: 100%;
      border-bottom: 1px solid #ccc;
      padding: 15px;
      img {
        float: left;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 35px;
      }
      p {
        font-size: 18px;
      }
    }
  }
}
.rate {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  i {
    font-size: 30px;
    font-style: normal;
    margin: 2px;
    color: #ff9900;
  }
  p {
    margin-top: 0;
  }
  li {
    margin-right: 0;
  }
}
.el-button {
  float: right;
  margin-right: 120px;
}
.develop {
  padding-left: 20px;
  display: flex;
  justify-content: space-between;
  height: 60px;
  align-items: center;
  img {
    width: 120px;
    height: 100px;
    object-fit: cover;
    margin-right: 50px;
  }
  i {
    font-size: 22px;
    font-style: normal;
    margin: 2px;
    color: #ff9900;
  }
}
.dialogbody {
  display: flex;
  img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    margin-right: 30px;
  }
  span {
    margin-right: 50px;
  }
  input {
    border: 0;
    // border-bottom: 1px solid #999;
  }
}
.finalprice {
  font-size: 22px;
  color: #ff9900;
  margin-top: 127px;
}
</style>
