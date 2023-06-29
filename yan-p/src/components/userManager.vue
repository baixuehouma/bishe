<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="昵称" prop="username" />
    <el-table-column label="权限" prop="ismanager" />
    <el-table-column align="right">
      <template #header>
        <el-input
          @input="searchUser"
          v-model="search"
          size="small"
          placeholder="Type to search"
        />
      </template>
      <template #default="scoped">
        <el-button size="small" @click="handleEdit(scoped.row.username, 'add')"
          >设为管理</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleEdit(scoped.row.username, 'remove')"
          >取消管理</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref } from "vue";
import login from "../api/login";
import qs from "qs";
import store from "@/store";
import { ElMessage } from "element-plus";

const search = ref("");
const searchUser = (val) => {
  // console.log(val);
  if (val != "") {
    tableData.value = tableData.value.filter((item) => {
      // console.log(item.username.toLowerCase());
      // console.log(item.username.toLowerCase().includes(val.toLowerCase()));
      if (item.username.toLowerCase().includes(val.toLowerCase())) {
        return item;
      }
    });
  } else {
    login.getFullUsers().then(({ data }) => {
      data.data.forEach((item) => {
        if (item.ismanager == 1) {
          item.ismanager = "管理";
        } else {
          item.ismanager = "用户";
        }
      });
      tableData.value = data.data;
    });
  }
};

const tableData = ref([]);
login.getFullUsers().then(({ data }) => {
  data.data.forEach((item) => {
    if (item.ismanager == 1) {
      item.ismanager = "管理";
    } else {
      item.ismanager = "用户";
    }
  });
  tableData.value = data.data;
});

const handleEdit = (username, type) => {
  // console.log(username, type);
  if (username == store.state.username) {
    ElMessage({
      message: "不可以对自己操作！",
      type: "warning",
    });
    return;
  }
  if (type == "add") {
    login
      .addmanager(qs.stringify({ managernum: 1, username }))
      .then(({ data }) => {
        if (data.status == 200) {
          login.getFullUsers().then(({ data }) => {
            data.data.forEach((item) => {
              if (item.ismanager == 1) {
                item.ismanager = "管理";
              } else {
                item.ismanager = "用户";
              }
            });
            tableData.value = data.data;
          });
        }
      });
  } else if (type == "remove") {
    login
      .addmanager(qs.stringify({ managernum: 0, username }))
      .then(({ data }) => {
        if (data.status == 200) {
          login.getFullUsers().then(({ data }) => {
            data.data.forEach((item) => {
              if (item.ismanager == 1) {
                item.ismanager = "管理";
              } else {
                item.ismanager = "用户";
              }
            });
            tableData.value = data.data;
          });
        }
      });
  }
};
</script>

<style scoped lang="scss">
.el-table {
  border: 1px solid #eee;
  margin-top: 30px;
}
</style>
