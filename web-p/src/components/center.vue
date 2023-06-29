<template>
  <div class="main">
    <div class="swiperbox">
      <!-- 轮播图 -->
      <swiper
        :slidesPerView="1"
        :spaceBetween="30"
        :loop="true"
        :centeredSlides="true"
        :pagination="{ clickable: true }"
        :autoplay="{ delay: 2500, disableOnInteraction: false }"
        :navigation="true"
        :modules="modules"
      >
        <swiper-slide v-for="item in imgData">
          <img :src="login.baseApi + item.path" alt="" />
        </swiper-slide>
      </swiper>
    </div>
    <div class="banner">
      <!-- 旅游专栏 -->
      <div class="left">
        <div class="asidebox box-traveller">
          <div class="asidebox-hd">
            <h4>旅游专栏</h4>
          </div>
          <div class="asidebox-bd">
            <div class="block text-center">
              <el-carousel trigger="click" indicator-position="none">
                <el-carousel-item v-for="item in smallbanner" :key="item.id">
                  <img :src="login.baseApi + item.path" alt="" />
                  <h4
                    style="margin: 8px 0"
                    class="small justify-center"
                    text="2xl"
                  >
                    <a href="javascript:;" @click="getByTitle(item.title)">{{
                      item.title
                    }}</a>
                  </h4>
                  <div class="text" style="margin: 8px 0">
                    {{ item.name }}
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </div>
        <div class="asidebox introduce">
          <div class="intoduceTitle">
            <h4>旅游攻略推荐</h4>
            <a href="javascript:;" @click="getMore">更多</a>
          </div>
          <div class="introduceImg">
            <img src="../assets/images/hainan.jpeg" alt="" />
          </div>
          <div class="article">
            <a href="javascript:;" @click="introduceClick">
              海南环岛游｜自驾5晚6天，海口-临高-儋州-昌江-三亚
            </a>
          </div>
        </div>
      </div>
      <!-- 热门游记 -->
      <div class="right">
        <el-tabs v-model="activeName">
          <!-- 热门游记 -->
          <el-tab-pane label="热门游记" name="first">
            <div :key="item.id" v-for="item in articleMessage">
              <div class="news" v-if="item.isexamine == 1">
                <!-- 左侧图片 -->
                <div class="newsImg">
                  <img :src="login.baseApi + item.img[0]" alt="" />
                </div>
                <!-- 右侧内容 -->
                <div class="newsContect">
                  <!-- 右侧标题 -->
                  <div class="contectTitle">
                    <h3>{{ item.title }}</h3>
                  </div>
                  <!-- 右侧内容 -->
                  <div
                    class="contect"
                    @click="readMore(item.id)"
                    style="text-overflow: ellipsis"
                  >
                    {{ item.content }}
                  </div>
                  <!-- 右侧底部 -->
                  <div class="contectBottom">
                    <el-icon size="22"><Location /></el-icon>
                    <span>{{ item.useraddress }}</span>
                    <div class="userPic">
                      <img :src="login.baseApi + item.pic" alt="" />
                    </div>
                    <span>{{ item.userid }}</span>
                    <svg
                      t="1677635386775"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="2751"
                      width="200"
                      height="200"
                      @click="isLike($event, item.id, item.likeCount)"
                    >
                      <path
                        d="M910.88 364.8l-1.28-10.08a236.96 236.96 0 0 0-6.24-28 201.44 201.44 0 0 0-42.56-80 46.08 46.08 0 0 0-3.84-4.48 212 212 0 0 0-160-71.68c-75.68 0-146.72 29.76-185.12 74.08-38.4-44.32-109.6-74.08-185.12-74.08a212 212 0 0 0-160 71.68 46.08 46.08 0 0 0-3.84 4.48 201.44 201.44 0 0 0-42.56 80 236.96 236.96 0 0 0-6.24 28l-1.28 10.08A186.4 186.4 0 0 0 112 385.92a205.28 205.28 0 0 0 1.12 21.28c16 194.08 368 423.2 382.88 432.96l16 10.4 16-10.4c15.04-9.6 367.04-238.72 382.88-432.96a205.28 205.28 0 0 0 1.12-21.28 186.4 186.4 0 0 0-1.12-21.12z"
                        :fill="item.islike ? '#d81e06' : '#ffffff'"
                        p-id="2752"
                        class="like"
                      ></path>
                    </svg>
                    <span style="float: right">{{ item.likeCount }}</span>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <!-- 我来发布 -->
          <el-tab-pane label="我来发布" name="second">
            <el-form :model="form" label-width="140px">
              <el-form-item label="标题">
                <el-input v-model="form.title" />
              </el-form-item>
              <el-form-item label="体验">
                <el-input v-model="form.practice" type="textarea" />
              </el-form-item>
              <el-form-item label="封面">
                <el-upload
                  v-model:file-list="fileList"
                  class="upload-demo"
                  action="http://127.0.0.1:3007/high/addBanner"
                  multiple
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :limit="3"
                  :on-exceed="handleExceed"
                  name="img"
                  :headers="header"
                  :on-success="onSuccess"
                >
                  <el-button type="primary">Click to upload</el-button>
                  <template #tip>
                    <div class="el-upload__tip">
                      jpg/png files with a size less than 500KB.
                    </div>
                  </template>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">发布</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import {
  ElMessage,
  ElMessageBox,
  UploadProps,
  UploadUserFile,
} from "element-plus";
import { Location } from "@element-plus/icons-vue";
import login from "@/api/login";
import qs from "qs";
import store from "../store/index";
import { useStore } from "vuex";
// 轮播图功能
import { Swiper, SwiperSlide } from "swiper/vue"; // swiper 所需组件
import { Autoplay, Navigation, Pagination, A11y } from "swiper"; // 分页器
// import 'swiper/swiper-bundle.css'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ustore = useStore();
const modules = [Autoplay, Pagination, Navigation, A11y];

const router = useRouter();

const imgData = ref();

login.getBanner().then(({ data }) => {
  // console.log(data.data);
  imgData.value = data.data;
});

// smallbanner
const smallbanner = ref();
login.getSmallBanner().then(({ data }) => {
  smallbanner.value = data.data;
});

// 文章信息获取
const articleMessage = ref();
login
  .getArticle(qs.stringify({ username: store.state.userInfo.username }))
  .then(({ data }) => {
    console.log(data.data);
    data.data.forEach((item) => {
      item.img = JSON.parse(item.img);
    });
    articleMessage.value = data.data;
    // console.log(articleMessage.value[0].isexamine);
  });

// upload
const header = ref({
  Authorization: localStorage.token,
});

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePreview = (file) => {
  console.log(file);
};
const handleExceed = (files, uploadFiles) => {
  ElMessage.warning(
    `最多选择3条, 加上你现在选择的 ${files.length} 条, 一共有 ${
      files.length + uploadFiles.length
    } 条`
  );
};

// 旅游专栏点击事件
const getByTitle = (title) => {
  console.log(title);
  // 跳转到对应的旅游攻略上
};

// 旅游攻略点击
const introduceClick = () => {
  router.push("/strategy");
};

// 点击更多攻略
const getMore = () => {
  router.push("/strategy");
};

// tab标签页 点赞
const LikeInfo = reactive({
  id: "",
  likeCount: 0,
});
const activeName = ref("first");
const isLike = (event, id, likeCount) => {
  // console.log(event.currentTarget.getAttribute("data-id"));
  // console.log(event.target.getAttribute("fill"));
  if (event.target.getAttribute("fill") == "#ffffff") {
    LikeInfo.id = id;
    LikeInfo.likeCount = likeCount;
    LikeInfo.likeCount += 1;
    login.changeIsLike(
      qs.stringify({
        articleid: LikeInfo.id,
        islike: 1,
        username: store.state.userInfo.username,
      })
    );
    login.changeLike(qs.stringify(LikeInfo)).then(({ data }) => {
      if (data.status == 200) {
        event.target.setAttribute("fill", "#d81e06");
        login
          .getArticle(qs.stringify({ username: store.state.userInfo.username }))
          .then(({ data }) => {
            data.data.forEach((item) => {
              item.img = JSON.parse(item.img);
            });
            articleMessage.value = data.data;
          });
      }
    });
  } else {
    LikeInfo.id = id;
    LikeInfo.likeCount = likeCount;
    if (LikeInfo.likeCount > 0) {
      LikeInfo.likeCount -= 1;
    }
    login.changeIsLike(
      qs.stringify({
        articleid: LikeInfo.id,
        islike: 0,
        username: store.state.userInfo.username,
      })
    );
    login.changeLike(qs.stringify(LikeInfo)).then(({ data }) => {
      if (data.status == 200) {
        event.target.setAttribute("fill", "#ffffff");
        login
          .getArticle(qs.stringify({ username: store.state.userInfo.username }))
          .then(({ data }) => {
            data.data.forEach((item) => {
              item.img = JSON.parse(item.img);
            });
            articleMessage.value = data.data;
          });
      }
    });
  }
};
const readMore = (id) => {
  ustore.commit("setArticleId", id);
  ustore.commit("changeOp", "wz");
  router.push("/community");
  store.state.isshow = false;
};

// cover
const coverImg = ref([]);
const onSuccess = (response, uploadFile, uploadFiles) => {
  // fileList.value = [];
  coverImg.value.push(response.url);
  // coverImg.value = response.url;
  // console.log(response.url);
  // console.log(coverImg.value);
  // console.log(JSON.stringify(coverImg.value));
};
// 发布文章
const fileList = ref([]);
const form = reactive({
  title: "",
  practice: "",
  cover: "",
});

const onSubmit = () => {
  // console.log(store.state.userInfo.username);
  // console.log(form);
  // console.log("submit!");
  login
    .publishArticle(
      qs.stringify({
        title: form.title,
        content: form.practice,
        userid: store.state.userInfo.username,
        useraddress: store.state.address,
        img: JSON.stringify(coverImg.value),
        pic: store.state.pic,
        likeCount: 0,
        isexamine: 0,
      })
    )
    .then(({ data }) => {
      console.log(data);
      if (data.status == 200) {
        ElMessage({
          message: "发布成功！",
          type: "success",
        });
        login.getArticle().then(({ data }) => {
          data.data.forEach((item) => {
            item.img = JSON.parse(item.img);
          });
          articleMessage.value = data.data;
        });
      }
    });
  form.title = "";
  form.practice = "";
};
</script>

<style lang="scss" scoped>
.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}
.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
.swiperbox {
  width: 100%;
  height: 20%;
}
.swiper-slide {
  img {
    margin: 0;
    width: 100%;
    height: 260px;
    object-fit: cover;
  }
}
.asidebox {
  width: 100%;
  height: 250px;
  margin-bottom: 70px;
}
.asidebox-hd {
  margin-bottom: 5px;
  h4 {
    text-align: left;
  }
}
.topTitle {
  width: 100%;
  // height: 100px;
}
.el-tabs__nav-scroll {
  width: 80px;
}
.userPic {
  display: inline-block;
  width: 26px;
  height: 26px;
  margin-left: 30px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
}

.left {
  width: 27%;
}
.right {
  width: 62%;
}
.article {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
a {
  color: black;
}
a:hover {
  color: orangered;
}
.news {
  display: flex;
  width: 100%;
  height: 160px;
  margin-bottom: 35px;
  cursor: pointer;
}
.news:hover {
  transition: all 0.5s;
  transform: translate3d(3px, -3px, 0);
  box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.2);
}
.newsImg {
  width: 40%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
.newsContect {
  margin-left: 2%;
  width: 58%;
  height: 100%;
}
.contectTitle {
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.contect {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  word-break: break-all;
  -webkit-box-orient: vertical;
  width: 100%;
  height: 100px;
  font-size: 15px;
  color: #666;
}
.contectBottom {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 8px;
  height: 25px;
  color: white;
  background-color: #000;
  svg {
    float: right;
    width: 20px;
    height: 23px;
  }
  span {
    font-size: 14px;
    margin-right: 40px;
  }
}
.el-textarea {
  height: 210px;
}
:deep(.el-textarea__inner) {
  height: 100%;
}
.el-form-item__label {
  justify-content: center;
}
.intoduceTitle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 10px;
  margin-bottom: 8px;
}
</style>
