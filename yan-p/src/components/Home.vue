<template>
  <div class="box">
    <div class="echarts">
      <div class="chart" ref="chart"></div>
      <Fold></Fold>
    </div>
    <div class="banner">
      <div class="top">
        <h3>发布社区问题</h3>
        <el-icon @click="dialogVisible = true"><Plus /></el-icon>
      </div>
      <div class="historyQue">
        <h4>历史问题</h4>
        <div class="none" v-if="fullData.length == 0">暂无问题记录</div>
        <div class="currentQue" v-else v-for="item in fullData" :key="item.id">
          <div class="title">
            <p>
              {{ item.question }}
            </p>
          </div>
          <el-switch
            v-model="item.isuse"
            size="large"
            @change="change(item.isuse, item.id)"
          />
        </div>
      </div>
      <div class="historyQue">
        <h4>当前讨论主题</h4>
        <div class="none" v-if="current.length == 0">暂无问题记录</div>
        <div class="currentQue" v-if="current.isuse == 1">
          <div class="title">
            <p>{{ current.question }}</p>
          </div>
          <el-switch
            v-model="current.isuse"
            size="large"
            @change="change(current.isuse, current.id)"
          />
        </div>
      </div>
    </div>
  </div>
  <!-- tianjia -->
  <el-dialog v-model="dialogVisible" title="发布新的讨论主题" width="37%">
    <el-form
      label-position="right"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item label="主题">
        <el-input v-model="formLabelAlign.question" />
      </el-form-item>
      <el-form-item label="副主题">
        <el-input v-model="formLabelAlign.text" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="publishQue"> 发布 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, reactive } from "vue";
import { Plus } from "@element-plus/icons-vue";
import login from "../api/login";
import qs from "qs";
import { ElMessage } from "element-plus";
import Fold from "../components/fold.vue";
const chart = ref();
const dialogVisible = ref(false);

const fullData = ref([]);
const current = ref([]);
login.getQue().then(({ data }) => {
  if (data.status == 200) {
    data.data.forEach((item) => {
      // console.log(item);
      if (item.isuse == 1) {
        item.isuse = true;
        current.value = item;
        // console.log(item);
      } else {
        item.isuse = false;
      }
    });
    fullData.value = data.data;
    // console.log(fullData.value.length);
    // console.log(fullData.value[fullData.value.length - 1].question);
  }
});

const formLabelAlign = reactive({
  question: "",
  text: "",
  isuse: 1,
});

function init(res) {
  var chartDom = chart.value;
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    title: {
      text: "用户数量占比",
      left: "left",
      textStyle: {
        fontSize: 22,
      },
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      bottom: "0",
      left: "center",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        labelLine: {
          show: false,
        },
        data: res,
      },
    ],
  };

  option && myChart.setOption(option);
}

const userDate = ref([
  { name: "管理员", value: 0 },
  { name: "用户", value: 0 },
]);
// const managerCount = ref(0);
// const userCount = ref(0);
new Promise((resolve, reject) => {
  login.getFullUsers().then(({ data }) => {
    // userDate.value = data.data;
    data.data.forEach((item) => {
      // console.log(item);
      if (item.ismanager == 1) {
        userDate.value[0].value += 1;
      } else {
        userDate.value[1].value += 1;
      }
    });
    // console.log(userDate.value);
    resolve(userDate.value);
  });
}).then((res) => {
  init(res);
});

const change = (val, id) => {
  // console.log(val, id);
  if (val == true) {
    login.setisuse(qs.stringify({ id, isuse: 1 })).then(({ data }) => {
      // console.log(data);
      if (data.status == 200) {
        login.getQue().then(({ data }) => {
          if (data.status == 200) {
            data.data.forEach((item) => {
              // console.log(item);
              if (item.isuse == 1) {
                item.isuse = true;
                current.value = item;
                // console.log(item);
              } else {
                item.isuse = false;
              }
            });
            fullData.value = data.data;
            // console.log(fullData.value.length);
            // console.log(fullData.value[fullData.value.length - 1].question);
          }
        });
      }
    });
  } else {
    login.setisuse(qs.stringify({ id, isuse: 0 })).then(({ data }) => {
      // console.log(data, "ok");
      if (data.status == 200) {
        login.getQue().then(({ data }) => {
          if (data.status == 200) {
            data.data.forEach((item) => {
              // console.log(item);
              if (item.isuse == 1) {
                item.isuse = true;
                current.value = item;
                // console.log(item);
              } else {
                item.isuse = false;
              }
            });
            fullData.value = data.data;
            // console.log(fullData.value.length);
            // console.log(fullData.value[fullData.value.length - 1].question);
          }
        });
      }
    });
  }
};

const publishQue = () => {
  // console.log(formLabelAlign);
  login.publishQue(qs.stringify(formLabelAlign)).then(({ data }) => {
    // console.log(data);
    if (data.status == 200) {
      // console.log(data.data);
      ElMessage({
        message: "发布讨论成功！",
        type: "success",
      });
      login.getQue().then(({ data }) => {
        if (data.status == 200) {
          data.data.forEach((item) => {
            // console.log(item);
            if (item.isuse == 1) {
              item.isuse = true;
              current.value = item;
              // console.log(item);
            } else {
              item.isuse = false;
            }
          });
          fullData.value = data.data;
          // console.log(fullData.value.length);
          // console.log(fullData.value[fullData.value.length - 1].question);
        }
      });
    }
  });
  dialogVisible.value = false;
};
</script>

<style scoped lang="scss">
.chart {
  margin-top: 30px;
  margin-bottom: 30px;
  width: 300px;
  height: 300px;
}
.box {
  // padding: 2%;
  width: 100%;
  height: 100%;
  display: flex;
  // justify-content: space-between;
  // align-items: baseline;
}
.banner {
  margin-left: 50px;
  // margin-top: 50px;
  width: 800px;
  // height: 400px;
  border: 1px solid #f8f5f5;
  padding: 15px;
  border-radius: 5px;
}
.historyQue {
  margin: 20px 0;
}
.currentQue {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  line-height: 50px;
  // background-color: aqua;
}
.title {
  width: 500px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.top {
  display: flex;
  align-items: center;
  justify-content: center;
  h3 {
    margin-right: 15px;
  }
  .el-icon {
    cursor: pointer;
  }
}
</style>
