<template>
  <!-- <router-view /> -->
  <router-view v-if="isRouter" />
</template>

<script setup>
import { ref, provide, nextTick } from "vue";
// 刷新
const isRouter = ref(true);
const reload = () => {
  console.log(1111);
  isRouter.value = false;
  nextTick(() => {
    isRouter.value = true;
  });
};
provide("reload", reload);
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  outline: none;
  text-decoration: none;
  list-style: none;
}
@import url("./assets/styles/comment.css");
</style>
