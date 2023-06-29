<template>
  <div class="demo-collapse">
    <el-collapse accordion>
      <el-collapse-item v-for="item in Fullmessage">
        <template #title>
          {{ item.title
          }}<el-icon v-if="item.isexamine == 0" class="header-icon">
            <WarningFilled />
          </el-icon>
        </template>
        <div class="content">
          <img
            v-for="child in item.img"
            :src="login.baseApi + child"
            alt=""
            @click="preview(child)"
          />
          <p>{{ item.content }}</p>
          <p>发布人:{{ item.userid }}</p>
        </div>
        <div class="caozuo" v-if="item.isexamine == 0">
          <el-button type="success" plain @click="judge('success', item.id)"
            >通过</el-button
          >
          <el-button type="danger" plain @click="judge('danger', item.id)"
            >违规</el-button
          >
        </div>
        <div class="caozuo" v-else>
          <span
            v-if="item.isexamine == 1"
            style="color: green"
            @click="rejudge(item.id)"
            >已通过</span
          >
          <span
            v-if="item.isexamine == 2"
            style="color: red"
            @click="rejudge(item.id)"
            >违规</span
          >
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-dialog v-model="showFlag" width="32%" align-center>
      <img :src="login.baseApi + previewImg" alt="" />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import login from "../api/login";
import qs from "qs";
import { WarningFilled } from "@element-plus/icons-vue";
const Fullmessage = ref();
login.getMessage().then(({ data }) => {
  if (data.status == 200) {
    data.data.forEach((item) => {
      item.img = JSON.parse(item.img);
    });
    Fullmessage.value = data.data;
  }
});
const previewImg = ref();
const showFlag = ref(false);
const preview = (img) => {
  previewImg.value = img;
  showFlag.value = true;
};
const judge = (type, id) => {
  if (type == "success") {
    login
      .updateIsExamine(qs.stringify({ id, judgenum: 1 }))
      .then(({ data }) => {
        if (data.status == 200) {
          login.getMessage().then(({ data }) => {
            if (data.status == 200) {
              data.data.forEach((item) => {
                item.img = JSON.parse(item.img);
              });
              Fullmessage.value = data.data;
            }
          });
        }
      });
  } else if (type == "danger") {
    login
      .updateIsExamine(qs.stringify({ id, judgenum: 2 }))
      .then(({ data }) => {
        if (data.status == 200) {
          login.getMessage().then(({ data }) => {
            if (data.status == 200) {
              data.data.forEach((item) => {
                item.img = JSON.parse(item.img);
              });
              Fullmessage.value = data.data;
            }
          });
        }
      });
  }
};
const rejudge = (id) => {
  login.updateIsExamine(qs.stringify({ id, judgenum: 0 })).then(({ data }) => {
    if (data.status == 200) {
      login.getMessage().then(({ data }) => {
        if (data.status == 200) {
          data.data.forEach((item) => {
            item.img = JSON.parse(item.img);
          });
          Fullmessage.value = data.data;
        }
      });
    }
  });
};
</script>

<style lang="scss" scoped>
.caozuo {
  margin-right: 100px;
  margin-bottom: 20px;
  float: right;
  span {
    font-size: 18px;
    cursor: pointer;
  }
}
.content {
  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    cursor: pointer;
    margin-right: 15px;
  }
}
.preview {
  width: 200px;
  height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.header-icon {
  color: red;
  margin-left: 15px;
}
.el-dialog {
  img {
    width: 450px;
    height: 300px;
  }
}
</style>
