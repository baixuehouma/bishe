<template>
  <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :timestamp="activity.timestamp"
    >
      {{ activity.content }}
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
import { ref } from "vue";
const activities = ref([
  {
    content: "Event start",
    timestamp: "2018-04-15",
  },
  {
    content: "Approved",
    timestamp: "2018-04-13",
  },
  {
    content: "Success",
    timestamp: "2018-04-11",
  },
]);
</script>
<style scoped>
li {
  float: none;
  margin-right: 35px;
}
</style>
