<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    :default-active="route.fullPath"
    text-color="#fff"
    router
  >
    <el-menu-item index="/home">
      <el-icon><icon-menu /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="/buy">
      <el-icon><icon-menu /></el-icon>
      <span>订单管理</span>
    </el-menu-item>
    <el-menu-item index="/article">
      <el-icon><icon-menu /></el-icon>
      <span>文章审核</span>
    </el-menu-item>
    <el-sub-menu index="/user">
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>用户管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/usermessage">添加酒店</el-menu-item>
        <el-menu-item index="/addmanager">添加管理</el-menu-item>
        <el-menu-item index="/hotellist">酒店管理</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { Menu as IconMenu } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>
<style scoped>
.el-menu {
  border-top: 1px solid #fff;
  height: 100%;
}
</style>
