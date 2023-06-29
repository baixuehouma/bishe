<template>
  <div class="bigCover">
    <img :src="login.baseApi + list.path" alt="" />
    <div class="titlebox">
      <img :src="login.baseApi + list.pic" alt="" />
      <h2>{{ list.title }}</h2>
      <el-icon
        v-show="editshow"
        :size="25"
        @click="editArticle(list.userid)"
        style="cursor: pointer"
      >
        <Edit />
      </el-icon>
    </div>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="修改游记"
    width="40%"
    :before-close="handleClose"
  >
    <el-form :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="体验">
        <el-input v-model="form.content" type="textarea" />
      </el-form-item>
      <el-form-item label="封面">
        <el-upload
          class="upload-demo"
          action="http://127.0.0.1:3007/high/addBanner"
          list-type="picture"
          name="img"
          :headers="header"
          :on-success="onSuccess"
        >
          <el-button type="primary">Click to upload</el-button>
          <template #tip> </template>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submit"> 修改 </el-button>
      </span>
    </template>
  </el-dialog>
  <div class="borderbox">
    <div class="userinfo">
      <span>{{ list.userid }}({{ list.address }})</span>
    </div>
  </div>
  <div class="banner2 articleContent" v-html="list.content"></div>
</template>
<script setup>
import { ElMessage } from "element-plus";
import login from "../api/login";
import store from "../store/index";
import qs from "qs";
import { ref, reactive } from "vue";
import { Edit } from "@element-plus/icons-vue";
const dialogVisible = ref(false);
const coverImg = ref();
const editshow = ref("true");
const list = reactive({
  path: "",
  pic: "",
  title: "",
  userid: "",
  address: "",
  content: "",
});
const form = reactive({
  id: store.state.articleId,
  title: "",
  content: "",
});
if (store.state.shequOp == "wz") {
  editshow.value = true;
  login
    .getArticleById(qs.stringify({ id: store.state.articleId }))
    .then(({ data }) => {
      list.path = JSON.parse(data.data[0].img)[0];
      list.pic = data.data[0].pic;
      form.pic = data.data[0].pic;
      list.title = data.data[0].title;
      form.title = data.data[0].title;
      list.userid = data.data[0].userid;
      list.address = data.data[0].useraddress;
      list.content = data.data[0].content;
      form.content = data.data[0].content;
    });
} else if (store.state.shequOp == "yj") {
  editshow.value = false;
  login
    .getYoujiById(qs.stringify({ id: store.state.youjiId }))
    .then(({ data }) => {
      list.path = data.data[0].img;
      list.pic = data.data[0].nickpic;
      list.title = data.data[0].title.split(",")[0];
      list.userid = data.data[0].nickname;
      list.address = data.data[0].address;
      list.content = data.data[0].text;
      form.content = matchReg(data.data[0].text);
      form.title = list.title;
      form.pic = data.data[0].pic;
    });
}

const matchReg = (str) => {
  let reg = /<\/?.+?\/?>/g;
  return str.replace(reg, "");
};
// 修改文章
const editArticle = (id) => {
  // console.log(id, store.state.userInfo.username, 881);
  if (id == store.state.userInfo.username) {
    dialogVisible.value = true;
  } else {
    ElMessage.warning("不可以对他人文章修改");
  }
};
const submit = () => {
  if (store.state.shequOp == "wz") {
    login
      .editArticleById(
        qs.stringify({
          id: form.id,
          title: form.title,
          content: form.content,
          img: coverImg.value,
        })
      )
      .then(({ data }) => {
        if (data.status == 200) {
          login
            .getArticleById(qs.stringify({ id: store.state.articleId }))
            .then(({ data }) => {
              list.path = JSON.parse(data.data[0].img)[0];
              list.pic = data.data[0].pic;
              form.pic = data.data[0].pic;
              list.title = data.data[0].title;
              form.title = data.data[0].title;
              list.userid = data.data[0].userid;
              list.address = data.data[0].useraddress;
              list.content = data.data[0].content;
              form.content = data.data[0].content;
            });
          ElMessage({
            message: "修改成功！",
            type: "success",
          });
        } else {
          ElMessage.error("修改失败！");
        }
      });
    dialogVisible.value = false;
  }
};
const handleClose = () => {
  login
    .getArticleById(qs.stringify({ id: store.state.articleId }))
    .then(({ data }) => {
      list.path = JSON.parse(data.data[0].img)[0];
      list.pic = data.data[0].pic;
      form.pic = data.data[0].pic;
      list.title = data.data[0].title;
      form.title = data.data[0].title;
      list.userid = data.data[0].userid;
      list.address = data.data[0].useraddress;
      list.content = data.data[0].content;
      form.content = data.data[0].content;
    });
  dialogVisible.value = false;
};
const onSuccess = (response, uploadFile, uploadFiles) => {
  coverImg.value = response.url;
};
// upload
const header = ref({
  Authorization: localStorage.token,
});
</script>
<style lang="scss" scoped>
.bigCover {
  width: 100%;
  height: 500px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.banner2 {
  width: 790px;
  margin: 0 auto;
  padding: 15px 0;
}
.titlebox {
  position: absolute;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  top: 478px;
  left: 0;
  width: 800px;
  height: 80px;
  color: #fff;
  padding: 0 200px;
  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-right: 5%;
  }
  h2 {
    line-height: 80px;
  }
}
.borderbox {
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #777;
  box-shadow: 0 2px 0 rgba(0 0 0 /5%);
  .userinfo {
    width: 20%;
    margin-left: 393px;
    margin-top: 10px;
    color: #ff7200;
    span {
      font-size: 16px;
    }
  }
}
.articleContent {
  line-height: 30px;
}
.el-icon {
  top: 30px;
  left: 10px;
}
.el-textarea {
  height: 210px;
}
:deep(.el-textarea__inner) {
  height: 100%;
}
</style>
