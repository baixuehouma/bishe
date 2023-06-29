<template>
  <div class="bgworld" style="display: flex">
    <div
      ref="echart"
      id="main"
      style="width: 100%; height: 480px; flex: 1"
    ></div>
  </div>
  <el-dialog v-model="dialogVisible" title="添加足迹" width="35%">
    <div style="margin-bottom: 20px">
      <el-icon><MapLocation /></el-icon>
      <span style="margin-left: 5px">{{ form.name }}</span>
      <span style="margin-left: 50px"
        ><input type="text" placeholder="请输入具体城市" v-model="form.city"
      /></span>
    </div>
    <el-upload
      v-model="form.pic"
      action="http://127.0.0.1:3007/high/addgocityPic"
      list-type="picture-card"
      :limit="3"
      :on-exceed="handleExceed"
      name="img"
      :auto-upload="true"
      :headers="header"
      :on-success="onSuccess"
      multiple
    >
      <el-icon><Plus /></el-icon>

      <template #file="{ file }">
        <div>
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        </div>
      </template>
    </el-upload>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addfooter"> 确认添加 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted, inject } from "vue";
import * as echarts from "echarts";
import chinaMap from "../assets/json/china.json";
import store from "../store";
import qs from "qs";
import login from "@/api/login";
import { Plus, MapLocation } from "@element-plus/icons-vue";
import { UploadFile, ElMessage } from "element-plus";
const dialogVisible = ref(false);
const reload = inject("reload");
const form = reactive({
  name: "",
  pic: "",
  city: "",
});
const pri = ref([]);
const gocity = ref([]);
const obj = reactive({});
await login
  .getgocity(qs.stringify({ username: store.state.userInfo.username }))
  .then(({ data }) => {
    data.data[0].gocity = JSON.parse(data.data[0].gocity);
    data.data[0].gocity.forEach((item) => {
      if (obj[item.name]) {
        obj[item.name].push(item.city);
      } else {
        obj[item.name] = [item.city];
      }
    });
    for (var k in obj) {
      // console.log(k, obj[k]);
      var obj1 = { name: "", value: 0 };
      obj1.name = k;
      obj[k].forEach((item) => {
        // console.log(item);
        obj1.value += 1;
      });
      pri.value.push(obj1);
    }
    gocity.value = data.data[0].gocity;
    // console.log(pri.value);
  });
const echart = ref();
const option = reactive({
  series: [
    {
      type: "map",
      map: "china",
      data: pri.value,
      zoom: 1.85,
      center: [100, "7.5%"],
      label: {
        color: "#fff",
        fontSize: 11,
      },
      itemStyle: {
        areaColor: "#b3afaf",
      },
      emphasis: {
        itemStyle: {
          areaColor: "#ffa800",
        },
      },
      select: {
        itemStyle: {
          areaColor: "#fff",
        },
      },
    },
  ],
  // 颜色
  visualMap: {
    min: 1,
    max: 18,
    text: ["High", "Low"],
    realtime: false,
    calculable: true,
    show: false,
    textStyle: {
      color: "#fff",
    },
    inRange: {
      color: ["yellow", "#ffa500", "#F56208"],
    },
  },
});
// upload
const header = ref({
  Authorization: localStorage.token,
});

const onSuccess = (response, uploadFile, uploadFiles) => {
  console.log(response.url);
  form.pic = form.pic + "" + response.url + ",";
  // console.log(1, form.pic);
};
const handleExceed = (files, uploadFiles) => {
  ElMessage.warning(
    `最多选择3条, 加上你现在选择的 ${files.length} 条, 一共有 ${
      files.length + uploadFiles.length
    } 条`
  );
};
const addfooter = () => {
  if (form.city == "") {
    ElMessage.warning("城市名不得为空！");
  } else {
    gocity.value.push(form);
    // console.log(form);
    gocity.value = JSON.stringify(gocity.value);
    // console.log(gocity.value);
    login
      .addgocity(
        qs.stringify({
          username: store.state.userInfo.username,
          gocity: gocity.value,
        })
      )
      .then(({ data }) => {
        // console.log(data);
        if (data.status == 200) {
          ElMessage.success("添加足迹成功！");
          dialogVisible.value = false;
          reload();
        }
      });
  }
};
onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(echart.value);
  echarts.registerMap("china", chinaMap);
  // 双击添加
  myChart.on("dblclick", function (params) {
    // console.log(params.name);
    form.name = params.name;
    dialogVisible.value = true;
  });
  myChart.on("click", function (params) {
    console.log(111);
  });
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.addEventListener("resize", () => {
    myChart.resize();
  });
});
</script>
<style scoped>
input {
  border: 0;
  border-bottom: 1px solid #eee;
}
</style>
