<template>
  <el-form :model="form" label-width="120px">
    <div class="first">
      <el-form-item label="酒店名称">
        <el-input v-model="form.hotelname" />
      </el-form-item>
      <el-form-item label="酒店英文名">
        <el-input v-model="form.engname" />
      </el-form-item>
    </div>
    <el-form-item label="酒店地址">
      <el-input v-model="form.city" />
    </el-form-item>
    <el-form-item label="酒店所属">
      <el-input v-model="form.county" />
    </el-form-item>
    <el-form-item label="酒店类型">
      <el-checkbox-group v-model="form.tags">
        <el-checkbox label="亲子之选" name="type" />
        <el-checkbox label="童话小镇" name="type" />
        <el-checkbox label="浪漫花海" name="type" />
        <el-checkbox label="迪士尼乐园" name="type" />
        <el-checkbox label="吃货根据地" name="type" />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="酒店星级">
      <el-input v-model="form.level" />
    </el-form-item>
    <el-form-item label="酒店电话">
      <el-input v-model="form.phone" />
    </el-form-item>
    <el-form-item label="酒店最低价">
      <el-input v-model="form.price" />
    </el-form-item>
    <el-form-item label="酒店图片">
      <el-upload
        v-model="form.pic"
        action="http://127.0.0.1:3007/high/addhotelpic"
        list-type="picture-card"
        :limit="6"
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
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
          </div>
        </template>
      </el-upload>
    </el-form-item>
    <el-form-item label="酒店房间">
      <div class="roombox">
        <li>
          <el-upload
            v-model="roomcommand1.img"
            class="avatar-uploader"
            action="http://127.0.0.1:3007/high/addhotelpic"
            :show-file-list="false"
            :on-success="onSuccess1"
            name="img"
            :auto-upload="true"
            :headers="header"
          >
            <img
              v-if="imageUrl1"
              :src="login.baseApi + imageUrl1"
              class="avatar"
              title="标房"
            />
            <img
              v-else
              :src="login.baseApi + roomcommand1.img"
              alt=""
              title="标房"
            />
          </el-upload>
          <div class="rightbox">
            <input
              type="text"
              v-model="roomcommand1.price"
              placeholder="请输入标房房价"
            />
            <input
              type="text"
              v-model="roomcommand1.tools"
              placeholder="请输入标房配置"
            />
            <input
              type="text"
              v-model="roomcommand1.area"
              placeholder="请输入标房大小"
            />
          </div>
        </li>
        <li>
          <el-upload
            v-model="roomcommand2.img"
            class="avatar-uploader"
            action="http://127.0.0.1:3007/high/addhotelpic"
            :show-file-list="false"
            :on-success="onSuccess2"
            name="img"
            :auto-upload="true"
            :headers="header"
          >
            <img
              v-if="imageUrl2"
              :src="login.baseApi + imageUrl2"
              class="avatar"
              title="双人房"
            />
            <img
              v-else
              :src="login.baseApi + roomcommand2.img"
              alt=""
              title="双人房"
            />
          </el-upload>
          <div class="rightbox">
            <input
              type="text"
              v-model="roomcommand2.price"
              placeholder="请输入双人房房价"
            />
            <input
              type="text"
              v-model="roomcommand2.tools"
              placeholder="请输入双人房配置"
            />
            <input
              type="text"
              v-model="roomcommand2.area"
              placeholder="请输入双人房大小"
            />
          </div>
        </li>
        <li>
          <el-upload
            v-model="roomcommand3.img"
            class="avatar-uploader"
            action="http://127.0.0.1:3007/high/addhotelpic"
            :show-file-list="false"
            :on-success="onSuccess3"
            name="img"
            :auto-upload="true"
            :headers="header"
          >
            <img
              v-if="imageUrl3"
              :src="login.baseApi + imageUrl3"
              class="avatar"
              title="商务大床房"
            />
            <img
              v-else
              :src="login.baseApi + roomcommand2.img"
              alt=""
              title="商务大床房"
            />
          </el-upload>
          <div class="rightbox">
            <input
              type="text"
              v-model="roomcommand3.price"
              placeholder="请输入商务大床房房价"
            />
            <input
              type="text"
              v-model="roomcommand3.tools"
              placeholder="请输入商务大床房配置"
            />
            <input
              type="text"
              v-model="roomcommand3.area"
              placeholder="请输入商务大床房大小"
            />
          </div>
        </li>
      </div>
    </el-form-item>

    <el-form-item>
      <el-button class="addhotel" type="primary" @click="onSubmit"
        >添加酒店</el-button
      >
    </el-form-item>
  </el-form>
  <!-- <el-dialog v-model="dialogVisible">
    <img w-full :src="login.baseApi + dialogImageUrl" alt="Preview Image" />
  </el-dialog> -->
</template>

<script setup>
import { reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { UploadFile, ElMessage } from "element-plus";
import login from "../api/login";
import qs from "qs";
// import router from "@/router";
import { useRouter } from "vue-router";
const router = useRouter();

const imageUrl1 = ref("");
const imageUrl2 = ref("");
const imageUrl3 = ref("");
// do not use same name with ref
const form = reactive({
  hotelname: "",
  engname: "",
  tags: [],
  county: "",
  city: "",
  level: "",
  pic: "",
  room: [],
  price: "",
  phone: "",
});

const roomcommand1 = reactive({
  id: "1",
  name: "标房",
  price: "",
  img: "/img/newimg/bed1.jpg",
  tools: "",
  area: "",
});
const roomcommand2 = reactive({
  id: "2",
  name: "双人房",
  price: "",
  img: "/img/newimg/bed.jpg",
  tools: "",
  area: "",
});
const roomcommand3 = reactive({
  id: "1",
  name: "商务大床房",
  price: "",
  img: "/img/newimg/bed1.jpg",
  tools: "",
  area: "",
});

const onSubmit = () => {
  // console.log(form.tags, form.pic);
  // console.log(form);
  // console.log("submit!");
  form.room.push(roomcommand1, roomcommand2, roomcommand3);
  form.room = JSON.stringify(form.room);
  form.tags = JSON.stringify(form.tags);
  // console.log(JSON.stringify(form.tags));
  // console.log(JSON.stringify(form.room));
  login.addhotel(qs.stringify(form)).then(({ data }) => {
    // console.log(data);
    if (data.status == 200) {
      // form = "";
      ElMessage({
        message: "添加酒店成功！",
        type: "success",
      });
      router.push("/hotellist");
    }
  });
};

// const dialogImageUrl = ref("");
// const dialogVisible = ref(false);

const header = ref({
  Authorization: localStorage.token,
});
const handleExceed = (files, uploadFiles) => {
  ElMessage.warning(
    `最多选择6条, 加上你现在选择的 ${files.length} 条, 一共有 ${
      files.length + uploadFiles.length
    } 条`
  );
};
const onSuccess = (response, uploadFile, uploadFiles) => {
  // console.log(response.url);
  form.pic = form.pic + "" + response.url + ",";
  // console.log(1, form.pic);
};
const onSuccess1 = (response, uploadFile, uploadFiles) => {
  // console.log(response.url);
  imageUrl1.value = response.url;
  roomcommand1.img = response.url;
  console.log(roomcommand1.img);
};
const onSuccess2 = (response, uploadFile, uploadFiles) => {
  // console.log(response.url);
  imageUrl2.value = response.url;
  roomcommand1.img = response.url;
};
const onSuccess3 = (response, uploadFile, uploadFiles) => {
  // console.log(response.url);
  imageUrl3.value = response.url;
  roomcommand1.img = response.url;
};
</script>

<style scoped lang="scss">
.first {
  display: flex;
  gap: 5%;
  .el-input {
    width: 470px;
  }
}
.el-form {
  padding: 20px;
}
.roombox {
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: start;
  li {
    width: 30%;
    height: 90px;
    display: flex;
    justify-content: space-around;
    align-items: start;
  }
  img {
    width: 160px;
    height: 90px;
    object-fit: cover;
  }
  input {
    width: 150px;
    margin-left: 8px;
  }
}
input::-webkit-input-placeholder {
  color: #999;
}
.addhotel {
  width: 30%;
  margin: 50px 0 0 350px;
}
.rightbox {
  input {
    border: 0;
    border-bottom: 1px solid #999;
  }
}
.el-form-item {
  margin-bottom: 22px;
}
</style>
