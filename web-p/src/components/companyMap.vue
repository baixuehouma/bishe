<template>
  <div id="container"></div>
</template>

<script setup>
import { onMounted, toRefs, defineProps, watch } from "vue";
const props = defineProps({
  address: String,
});
const { address } = toRefs(props);
// watch(
//   address,
//   (currentV, oldV) => {
//     console.log(currentV, oldV);
//   },
//   { immediate: true }
// );
onMounted(() => {
  const BMapGL = window.BMapGL;
  var map = new BMapGL.Map("container");
  //   var point = new BMapGL.Point(116.404, 39.915);
  //   var marker = new BMapGL.Marker(point);

  // 创建地址解析器实例
  var myGeo = new BMapGL.Geocoder();
  // 将地址解析结果显示在地图上,并调整地图视野
  var str = "上海市";
  console.log(address.value + "市");
  myGeo.getPoint(
    address.value,
    function (point) {
      if (point) {
        map.centerAndZoom(point, 16);
        var marker = new BMapGL.Marker(point);
        map.addOverlay(marker);
        var opts = {
          width: 200, // 信息窗口宽度
          height: 50, // 信息窗口高度
          title: "酒店地址", // 信息窗口标题
        };
        var infoWindow = new BMapGL.InfoWindow(address.value, opts); // 创建信息窗口对象

        marker.addEventListener("click", function () {
          //   console.log(11);
          map.openInfoWindow(infoWindow, map.getCenter()); // 打开信息窗口
        });
      } else {
        alert("您选择地址没有解析到结果!");
      }
    },
    "北京市"
  );
});
</script>

<style scoped lang="scss">
#container {
  height: 150px;
}
</style>
