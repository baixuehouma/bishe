<template>
  <el-card class="box-card" :key="item.id" v-for="item in tableData">
    <template #header>
      <div class="card-header">
        <span>{{ item.hotelname }}</span>
        <div class="opt" v-if="item.isbuy == 0">
          <el-button
            class="button"
            text
            @click="handleEdit(item.id, 'delete', item.username)"
            >取消订单</el-button
          >
          <el-button
            class="button"
            text
            @click="handleEdit(item.id, 'buy', item.username)"
            >确认订单</el-button
          >
        </div>
        <div class="buy" v-if="item.isbuy == 1">订单已支付</div>
        <div class="notbuy" v-if="item.isbuy == 2">订单已取消支付</div>
      </div>
    </template>
    <div class="bigbox">
      <!-- <div class="leftimg"></div> -->
      <div class="body">
        <li>用户信息： {{ item.username }}</li>
        <li>入住信息： {{ item.date }}</li>
        <li>房间类型： {{ item.type }}</li>
      </div>
      <div class="body">
        <li>用户号码： {{ item.phone }}</li>
        <li>订单备注： {{ item.beizhu }}</li>
        <p>支付金额： ￥{{ item.price }}</p>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import login from "../api/login";
import qs from "qs";
login.get;
login.getbook().then(({ data }) => {
  if (data.status == 200) {
    console.log(data.data);
    data.data.forEach((item) => {
      //   console.log(timechange(item.sdate) + " - " + timechange(item.edate));
      item.date = timechange(item.sdate) + " ~ " + timechange(item.edate);
    });
    tableData.value = data.data;
  }
});
// 时间
const timechange = (data) => {
  let year = new Date(data).getFullYear();
  let month = new Date(data).getMonth() + 1;
  let day = new Date(data).getDate();
  let time = year + "-" + month + "-" + day;
  return time;
};
const handleEdit = (id, type, username) => {
  console.log(id, type);
  if (type == "buy") {
    login.buyroom(qs.stringify({ id, isbuy: 1 })).then(({ data }) => {
      // console.log(data);
      if (data.status == 200) {
        login.getbook().then(({ data }) => {
          if (data.status == 200) {
            // console.log(data.data);
            data.data.forEach((item) => {
              //   console.log(timechange(item.sdate) + " - " + timechange(item.edate));
              item.date =
                timechange(item.sdate) + " ~ " + timechange(item.edate);
            });
            tableData.value = data.data;
          }
        });
        login.email(qs.stringify({ username, isbdge: 1 })).then(({ data }) => {
          // console.log(data);
        });
      }
    });
  } else if (type == "delete") {
    login.buyroom(qs.stringify({ id, isbuy: 2 })).then(({ data }) => {
      // console.log(data);
      if (data.status == 200) {
        login.getbook().then(({ data }) => {
          if (data.status == 200) {
            // console.log(data.data);
            data.data.forEach((item) => {
              //   console.log(timechange(item.sdate) + " - " + timechange(item.edate));
              item.date =
                timechange(item.sdate) + " ~ " + timechange(item.edate);
            });
            tableData.value = data.data;
          }
        });
        login.email(qs.stringify({ username, isbdge: 1 })).then(({ data }) => {
          // console.log(data);
        });
      }
    });
  }
};

const tableData = ref([]);
</script>

<style scoped lang="scss">
.box-card {
  margin-bottom: 30px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  span {
    font-size: 22px;
    color: #000;
  }
}
.bigbox {
  display: flex;
  justify-content: baseline;
  align-items: center;
  .body {
    margin: 0 100px;
    li {
      color: #999;
      margin: 5px;
    }
  }
}
.buy {
  font-size: 18px;
  color: green;
}
.notbuy {
  font-size: 18px;
  color: red;
}
</style>
