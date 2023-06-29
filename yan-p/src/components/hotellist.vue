<template>
  <el-row>
    <el-col v-for="item in tableData" :key="item.id" :span="6">
      <el-card :body-style="{ padding: '0px' }">
        <div class="opt">
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-icon class="el-icon--right" color="#fff" size="22">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="changehotel(item.hotelname)"
                  >修改酒店信息</el-dropdown-item
                >
                <el-dropdown-item @click="removehotel(item.hotelname)"
                  >删除该酒店</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <img :src="login.baseApi + item.pic.split(',')[0]" class="image" />
        <div style="padding: 14px" @click="getmore(item.hotelname)">
          <span style="font-size: 18px">{{ item.hotelname }}</span>
          <div class="bottom">
            <el-icon color="#3a90fb"><Service /></el-icon>
            <span>{{ item.phone }}</span>
            <br />
            <br />
            <el-icon color="#3a90fb"><Location /></el-icon>
            <span>{{ item.city }}</span>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-dialog v-model="dialogVisible" title="修改酒店" width="60%">
    <el-form :model="form" label-width="120px">
      <el-form-item label="酒店名称">
        <el-input v-model="form.hotelname" />
      </el-form-item>
      <el-form-item label="酒店英文名称">
        <el-input v-model="form.engname" />
      </el-form-item>
      <el-form-item label="酒店星级">
        <el-input v-model="form.level" />
      </el-form-item>
      <el-form-item label="酒店地理位置">
        <el-input v-model="form.city" />
      </el-form-item>
      <el-form-item label="酒店所属">
        <el-input v-model="form.county" />
      </el-form-item>
      <el-form-item label="酒店标签">
        <el-tag
          v-for="tag in form.tags"
          :key="tag"
          class="mx-1"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          v-if="inputVisible"
          ref="InputRef"
          v-model="inputValue"
          class="ml-1 w-20"
          size="small"
          @keyup.enter="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button
          v-else
          class="button-new-tag ml-1"
          size="small"
          @click="showInput"
        >
          + New Tag
        </el-button>
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
                v-if="roomcommand1.img"
                :src="login.baseApi + roomcommand1.img"
                class="avatar"
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
                v-if="roomcommand2.img"
                :src="login.baseApi + roomcommand2.img"
                class="avatar"
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
                v-if="roomcommand3.img"
                :src="login.baseApi + roomcommand3.img"
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
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onSubmit">修改酒店</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="removeDialog" title="删除酒店提示" width="30%">
    <span>此操作无法撤销，是否确认删除</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="removeDialog = false">取消删除</el-button>
        <el-button type="primary" @click="removeh"> 确认删除 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, nextTick } from "vue";
import login from "../api/login";
import { Service, Location, ArrowDown } from "@element-plus/icons-vue";
import qs from "qs";
import { ElInput, ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();

login.getFullhotel().then(({ data }) => {
  // console.log(data);
  // console.log(data.data[0].pic[0]);
  data.data.forEach((item) => {
    // console.log(item.pic.split(",")[0]);
    item.tags = JSON.parse(item.tags);
    // console.log(item.tags);
  });
  tableData.value = data.data;
});

const getmore = (hotelname) => {
  router.push({ path: "/hotelmanager", query: { hotelname } });
};

// console.log(timechange(new Date()));

// 修改酒店信息
const form = ref([]);
const dialogVisible = ref(false);
const roomcommand1 = ref([]);
const roomcommand2 = ref([]);
const roomcommand3 = ref([]);
// const hotelnameRow = ref();

const changehotel = (row) => {
  // console.log(row.hotelname);
  // hotelnameRow.value = row.hotelname;
  login.getHotelbyname(qs.stringify({ name: row })).then(({ data }) => {
    data.data.forEach((item) => {
      item.tags = JSON.parse(item.tags);
      item.room = JSON.parse(item.room);
      // console.log(item.room);
    });
    form.value = data.data[0];
    roomcommand1.value = form.value.room[0];
    roomcommand2.value = form.value.room[1];
    roomcommand3.value = form.value.room[2];
    // console.log(data.data[0].tags);
    // console.log(form.value.room[1]);
    // console.log(data);
  });
  dialogVisible.value = true;
};

const onSubmit = () => {
  console.log("submit!");
  console.log(form.value);
  // console.log(roomcommand2.value);
  form.value.room[0] = roomcommand1.value;
  form.value.room[1] = roomcommand2.value;
  form.value.room[2] = roomcommand3.value;
  form.value.room = JSON.stringify(form.value.room);
  form.value.tags = JSON.stringify(form.value.tags);
  login.updateHotel(qs.stringify(form.value)).then(({ data }) => {
    // console.log(data);
    if (data.status == 200) {
      ElMessage({
        message: "修改酒店信息成功！",
        type: "success",
      });
      login.getFullhotel().then(({ data }) => {
        // console.log(data);
        data.data.forEach((item) => {
          item.tags = JSON.parse(item.tags);
          // console.log(item.tags);
        });
        tableData.value = data.data;
      });
    }
  });
  // console.log(form.value.room);
  dialogVisible.value = false;
};

const inputValue = ref("");
const inputVisible = ref(false);
const InputRef = ref();

const handleClose = (tag) => {
  form.value.tags.splice(form.value.tags.indexOf(tag), 1);
};

const showInput = () => {
  inputVisible.value = true;
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    form.value.tags.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = "";
};

const header = ref({
  Authorization: localStorage.token,
});
const onSuccess1 = (response, uploadFile, uploadFiles) => {
  // console.log(response.url);
  roomcommand1.value.img = response.url;
  console.log(roomcommand1.img);
};
const onSuccess2 = (response, uploadFile, uploadFiles) => {
  roomcommand2.value.img = response.url;
};
const onSuccess3 = (response, uploadFile, uploadFiles) => {
  roomcommand3.value.img = response.url;
};

const tableData = ref([]);

// 删除酒店
const removeDialog = ref(false);
const hotelnameR = ref();
const removehotel = (row) => {
  // console.log(row.hotelname);
  hotelnameR.value = row;
  removeDialog.value = true;
};
const removeh = () => {
  login
    .removehotel(qs.stringify({ name: hotelnameR.value }))
    .then(({ data }) => {
      console.log(data);
      if (data.status == 200) {
        ElMessage({
          message: "删除酒店成功！",
          type: "success",
        });
        login.getFullhotel().then(({ data }) => {
          // console.log(data);
          data.data.forEach((item) => {
            item.tags = JSON.parse(item.tags);
            // console.log(item.tags);
          });
          tableData.value = data.data;
        });
        removeDialog.value = false;
      }
    });
};
</script>

<style scoped lang="scss">
.image {
  width: 300px;
  height: 135px;
  object-fit: cover;
}
:deep(.el-card) {
  width: 300px;
  height: 300px;
  margin: 20px 10px;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
}
.bottom {
  margin-top: 35px;
  .el-icon {
    margin-right: 15px;
  }
}
.opt {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 30px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
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
    width: 100px;
    height: 90px;
    object-fit: cover;
  }
  input {
    width: 120px;
    margin-left: 8px;
  }
}
.rightbox {
  input {
    border: 0;
    border-bottom: 1px solid #999;
  }
}
.el-tag {
  margin-right: 5px;
}
</style>
