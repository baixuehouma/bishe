<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/hotellist' }"
      >酒店管理</el-breadcrumb-item
    >
    <el-breadcrumb-item>{{ route.query.hotelname }}</el-breadcrumb-item>
  </el-breadcrumb>
  <div class="datashow">
    <li>
      <div class="text">
        <h3>今日待办</h3>
        <span>0</span>
      </div>
    </li>
    <li>
      <div class="text">
        <h3>资金收入</h3>
        <span>￥{{ allPrice }}.00</span>
      </div>
    </li>
    <li>
      <div class="text">
        <h3>订单数量</h3>
        <span>{{ checkinData.length }}单</span>
      </div>
    </li>
    <li>
      <div class="text">
        <h3>用户评论</h3>
        <span>{{ asscount }}条</span>
      </div>
    </li>
    <div class="chart" ref="chart"></div>
  </div>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>入住信息</span>
      </div>
    </template>
    <el-table :data="checkinData" :border="false">
      <el-table-column label="用户" prop="username" />
      <el-table-column label="入住日期" prop="sdate" />
      <el-table-column label="房型" prop="type" />
      <el-table-column label="离房日期" prop="edate" />
      <el-table-column label="是否入住/退房">
        <template #default="scope">
          <span v-if="scope.row.isbuy == 0">等待付款</span>
          <div class="else" v-else>
            <span class="checkin" v-if="scope.row.ischeck == 1">已入住</span>
            <span class="checkout" v-if="scope.row.ischeck == 2">已退房</span>
            <el-button
              size="small"
              @click="checkin(scope.row)"
              v-if="scope.row.ischeck == 0"
              >已入住</el-button
            >
            <el-button
              size="small"
              @click="checkout(scope.row)"
              v-if="scope.row.ischeck != 2"
              >已退房</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ArrowRight } from "@element-plus/icons-vue";
import { ref } from "vue";
import qs from "qs";
import login from "@/api/login";
import * as echarts from "echarts";
import { ElMessage } from "element-plus";
const chart = ref();
const route = useRoute();
const checkinData = ref([]);
const allPrice = ref(0);
const asscount = ref(0);

login
  .getassess(qs.stringify({ name: route.query.hotelname }))
  .then(({ data }) => {
    // console.log(data);
    if (data.status == 200) {
      asscount.value = data.data.length;
    }
  });
// 酒店管理 入住/退房
const checkin = (row) => {
  allPrice.value = 0;
  //   console.log(row.hotelname);
  login.isCheck(qs.stringify({ ischeck: 1, id: row.id })).then(({ data }) => {
    login
      .getbookbyhotelname(qs.stringify({ hotelname: route.query.hotelname }))
      .then(({ data }) => {
        // console.log(data);
        if (data.status == 200) {
          //   checkinData.value = data.data;
          data.data.forEach((item) => {
            // console.log(item);
            if (
              timechange(item.sdate) < timechange(new Date()) &&
              item.ischeck == 1
            ) {
              ElMessage({
                message: "有客户已入住逾期未退房",
                type: "warning",
              });
            }
            item.sdate = timechange(item.sdate);
            item.edate = timechange(item.edate);
            allPrice.value += item.price;
          });
          checkinData.value = data.data;
        }
      });
  });
};
const checkout = (row) => {
  // console.log(row);
  allPrice.value = 0;
  login.isCheck(qs.stringify({ ischeck: 2, id: row.id })).then(({ data }) => {
    // console.log(data);
    if (data.status == 200) {
      login
        .getbookbyhotelname(qs.stringify({ hotelname: route.query.hotelname }))
        .then(({ data }) => {
          // console.log(data);
          if (data.status == 200) {
            //   checkinData.value = data.data;
            data.data.forEach((item) => {
              // console.log(item);
              if (
                timechange(item.sdate) < timechange(new Date()) &&
                item.ischeck == 1
              ) {
                ElMessage({
                  message: "有客户已入住逾期未退房",
                  type: "warning",
                });
              }
              item.sdate = timechange(item.sdate);
              item.edate = timechange(item.edate);
              allPrice.value += item.price;
            });
            checkinData.value = data.data;
          }
        });
    }
  });
};
// 时间
const timechange = (data) => {
  let year = new Date(data).getFullYear();
  let month = new Date(data).getMonth() + 1;
  let day = new Date(data).getDate();
  let time = year + "-" + month + "-" + day;
  return time;
};

function init(res) {
  var chartDom = chart.value;
  var myChart = echarts.init(chartDom);

  var option;

  option = {
    title: {
      text: "各房间出售数量",
    },
    xAxis: {
      type: "category",
      data: ["双人房", "标房", "商务大床房"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: res,
        type: "bar",
      },
    ],
  };

  option && myChart.setOption(option);
}
const xData = ref([0, 0, 0]);
new Promise((resolve, reject) => {
  login
    .getbookbyhotelname(qs.stringify({ hotelname: route.query.hotelname }))
    .then(({ data }) => {
      // console.log(data);
      if (data.status == 200) {
        // console.log(data);
        //   checkinData.value = data.data;
        allPrice.value = 0;
        data.data.forEach((item) => {
          // console.log(item);
          if (item.type == "双人房") {
            xData.value[0] += 1;
          } else if (item.type == "标房") {
            xData.value[1] += 1;
            // console.log(xData.value[1]);
          } else if (item.type == "商务大床房") {
            xData.value[2] += 1;
          }
          if (
            timechange(item.sdate) < timechange(new Date()) &&
            item.ischeck == 1
          ) {
            ElMessage({
              message: "有客户已入住逾期未退房",
              type: "warning",
            });
          }
          item.sdate = timechange(item.sdate);
          item.edate = timechange(item.edate);
          allPrice.value += item.price;
        });
        // console.log(88, xData.value[1]);
        checkinData.value = data.data;
        resolve(xData.value);
      }
    });
}).then((res) => {
  //   console.log(res);
  init(res);
});
</script>

<style scoped lang="scss">
.datashow {
  width: 100%;
  height: 160px;
  margin-top: 40px;
  display: flex;
  //   margin-left: 70px;
  img {
    margin-right: 15px;
    width: 50px;
    height: 70px;
  }
  li {
    display: flex;
    justify-content: space-between;
    width: 140px;
    padding: 0 10px;
    height: 150px;
    background-color: #f5b920;
    opacity: 0.8;
    border-radius: 10px;
    align-items: center;
    margin-right: 70px;
    box-shadow: 10px 10px 15px -10px #000;
    color: #fff;
    .text {
      text-align: center;
    }
    h3 {
      margin-left: 19px;
      font-size: 26px;
    }
    span {
      font-size: 18px;
      display: block;
      margin-top: 20px;
    }
  }
}
.box-card {
  //   margin-left: 70px;
  margin-top: 50px;
  width: 95%;
  height: 300px;
}
.checkin {
  color: green;
  margin-right: 5px;
}
.checkout {
  color: red;
  margin-right: 5px;
}
.chart {
  position: relative;
  top: -50px;
  left: 0;
  //   margin-top: 20px;
  width: 300px;
  height: 260px;
}
</style>
