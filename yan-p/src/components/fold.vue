<template>
  <div class="chart" ref="fold"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref } from "vue";
import login from "../api/login";
const fold = ref();

function init() {
  var chartDom = fold.value;
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    title: {
      text: "主题讨论数据(近7天)",
    },
    xAxis: {
      type: "category",
      data: xData.value,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: yData.value,
        type: "line",
      },
    ],
  };

  option && myChart.setOption(option);
}
const xData = ref([]);
const yData = ref([]);
new Promise((resolve, reject) => {
  login.getrecentdata().then(({ data }) => {
    //   console.log(data);
    if (data.status == 200) {
      // console.log(data.data[0].COUNT);
      data.data.forEach((item) => {
        yData.value.push(item.COUNT);
        xData.value.push(item.dates);
      });
      // console.log(xData.value);
    }
    resolve(xData, yData);
  });
}).then(() => {
  init();
});
</script>

<style lang="scss" scoped>
.chart {
  //   margin-top: 20px;
  width: 300px;
  height: 180px;
}
</style>
