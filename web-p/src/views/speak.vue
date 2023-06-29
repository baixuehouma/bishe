<template>
  <div class="isshow" v-if="store.state.isshow">
    <div class="question">
      <div class="que">
        <h3>
          <svg
            t="1681782077443"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="8113"
            width="20"
            height="20"
          >
            <path
              d="M512 65.984C266.08 65.984 65.984 266.08 65.984 512c0 245.952 200.064 446.016 446.016 446.016 245.952 0 446.016-200.064 446.016-446.016C958.016 266.08 757.952 65.984 512 65.984zM512 894.016C301.344 894.016 129.984 722.624 129.984 512 129.984 301.344 301.344 129.984 512 129.984c210.624 0 382.016 171.36 382.016 382.016C894.016 722.624 722.624 894.016 512 894.016z"
              fill="#efb336"
              p-id="8114"
            ></path>
            <path
              d="M512 255.2c-77.216 0-140.032 62.272-140.032 138.816 0 17.664 14.336 32 32 32s32-14.336 32-32c0-41.952 33.376-74.816 76.032-74.816 41.952 0 76.032 34.368 76.032 76.64 0 15.968-22.848 38.784-43.008 58.944C514.56 485.216 480 519.744 480 566.016l0 45.696c0 17.696 14.336 32 32 32s32-14.304 32-32l0-45.696c0-19.744 23.52-43.264 46.272-65.984 28.928-28.928 61.76-61.728 61.76-104.192C652.032 318.272 589.216 255.2 512 255.2z"
              fill="#efb336"
              p-id="8115"
            ></path>
            <path
              d="M512 753.92m-48 0a1.5 1.5 0 1 0 96 0 1.5 1.5 0 1 0-96 0Z"
              fill="#efb336"
              p-id="8116"
            ></path>
          </svg>
          {{ currentQue.question }}
        </h3>
        <p>
          {{ currentQue.text }}
        </p>
      </div>
      <div class="ans">
        <div class="total">
          {{ assessList.length }}条回答
          <span class="answer" @click="gotoansRef = true">我来回答</span>
        </div>
        <el-input
          v-show="gotoansRef"
          v-model="assessval"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          @change="assessp"
          placeholder="点击文本框外自动提交评论"
        />
        <div class="txt" v-for="item in assessList" :key="item.id">
          <div class="userpic">
            <img :src="login.baseApi + item.userpic" alt="" />
          </div>
          <div class="txtbody">
            <!-- <div class="username">admin</div> -->
            <i>{{ item.username }}</i>
            <div class="content">{{ item.textbody }}</div>
            <div class="opt">
              <svg
                t="1681780871190"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3766"
                @click="like($event)"
              >
                <path
                  d="M510.671749 348.792894S340.102978 48.827055 134.243447 254.685563C-97.636714 486.565724 510.671749 913.435858 510.671749 913.435858s616.107079-419.070494 376.428301-658.749272c-194.095603-194.096626-376.428302 94.106308-376.428301 94.106308z"
                  fill="#dbdbdb"
                  p-id="3767"
                ></path>
                <path
                  d="M510.666632 929.674705c-3.267417 0-6.534833-0.983397-9.326413-2.950192-16.924461-11.872399-414.71121-293.557896-435.220312-529.448394-5.170766-59.482743 13.879102-111.319341 56.643068-154.075121 51.043536-51.043536 104.911398-76.930113 160.095231-76.930114 112.524796 0 196.878996 106.48115 228.475622 153.195078 33.611515-45.214784 122.406864-148.20646 234.04343-148.20646 53.930283 0 105.46603 24.205285 153.210428 71.941496 45.063335 45.063335 64.954361 99.200326 59.133795 160.920016C935.306982 641.685641 536.758893 915.327952 519.80271 926.859589a16.205077 16.205077 0 0 1-9.136078 2.815116zM282.857183 198.75574c-46.25344 0-92.396363 22.682605-137.127124 67.413365-36.149315 36.157501-51.614541 78.120218-47.25321 128.291898 17.575284 202.089671 352.199481 455.119525 412.332023 499.049037 60.434417-42.86732 395.406538-289.147446 414.567947-492.458945 4.933359-52.344159-11.341303-96.465029-49.759288-134.88199-41.431621-41.423435-85.24243-62.424748-130.242319-62.424748-122.041544 0-220.005716 152.203494-220.989114 153.742547-3.045359 4.806469-8.53335 7.883551-14.101159 7.534603a16.257266 16.257266 0 0 1-13.736863-8.184403c-0.902556-1.587148-91.569532-158.081365-213.690893-158.081364z"
                  fill="#ffffff"
                  p-id="3768"
                ></path>
              </svg>
              <svg
                t="1681781714320"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5226"
                @click="showinput(item.id)"
              >
                <path
                  d="M850.879104 96.41591l-676.303067 0c-60.681034 0-110.049418 49.367361-110.049418 110.049418l0 446.200388c0 60.681034 49.367361 110.049418 110.049418 110.049418l90.307795 0L396.936381 931.129846c3.793396 4.838192 9.598612 7.66354 15.746636 7.66354s11.952216-2.825348 15.746636-7.66354l132.052548-168.414711 290.396903 0c60.681034 0 110.049418-49.367361 110.049418-110.049418L960.928522 206.465329C960.928522 145.784294 911.561162 96.41591 850.879104 96.41591zM920.91111 652.665717c0 38.614459-31.416524 70.030983-70.030983 70.030983L550.744419 722.6967c-6.147 0-11.952216 2.825348-15.745612 7.66354L412.683017 886.356107l-122.31579-155.995867c-3.792373-4.838192-9.597589-7.66354-15.745612-7.66354l-100.045577 0c-38.614459 0-70.030983-31.416524-70.030983-70.030983L104.545054 206.465329c0-38.614459 31.416524-70.030983 70.030983-70.030983l676.303067 0c38.614459 0 70.030983 31.416524 70.030983 70.030983L920.910087 652.665717z"
                  fill="#272636"
                  p-id="5227"
                ></path>
                <path
                  d="M272.621051 344.526731c-44.132126 0-80.035848 35.903721-80.035848 80.035848 0 44.132126 35.903721 80.036871 80.035848 80.036871s80.035848-35.904745 80.035848-80.036871C352.655875 380.430452 316.752154 344.526731 272.621051 344.526731zM272.621051 464.582037c-22.065552 0-40.017412-17.951861-40.017412-40.018436 0-22.065552 17.952884-40.017412 40.017412-40.017412 22.065552 0 40.017412 17.951861 40.017412 40.017412C312.638463 446.629153 294.686602 464.582037 272.621051 464.582037z"
                  fill="#272636"
                  p-id="5228"
                ></path>
                <path
                  d="M512.727571 344.526731c-44.132126 0-80.035848 35.903721-80.035848 80.035848 0 44.132126 35.903721 80.036871 80.035848 80.036871 44.132126 0 80.035848-35.904745 80.035848-80.036871C592.763418 380.430452 556.859697 344.526731 512.727571 344.526731zM512.727571 464.582037c-22.065552 0-40.017412-17.951861-40.017412-40.018436 0-22.065552 17.951861-40.017412 40.017412-40.017412 22.065552 0 40.017412 17.951861 40.017412 40.017412C552.746006 446.629153 534.793122 464.582037 512.727571 464.582037z"
                  fill="#272636"
                  p-id="5229"
                ></path>
                <path
                  d="M752.836137 344.526731c-44.131103 0-80.035848 35.903721-80.035848 80.035848 0 44.132126 35.904745 80.036871 80.035848 80.036871s80.035848-35.904745 80.035848-80.036871C832.871985 380.430452 796.96724 344.526731 752.836137 344.526731zM752.836137 464.582037c-22.066575 0-40.017412-17.951861-40.017412-40.018436 0-22.065552 17.951861-40.017412 40.017412-40.017412s40.017412 17.951861 40.017412 40.017412C792.853549 446.629153 774.902712 464.582037 752.836137 464.582037z"
                  fill="#272636"
                  p-id="5230"
                ></path>
              </svg>
              <svg
                v-if="item.children != null"
                v-show="arrowtop"
                t="1681782940765"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="10092"
                @click="showAssess(item.id)"
              >
                <path
                  d="M183.168 332.501333a42.666667 42.666667 0 0 1 57.621333-2.496l2.709334 2.496L512 600.96l268.501333-268.48a42.666667 42.666667 0 0 1 57.621334-2.496l2.709333 2.496a42.666667 42.666667 0 0 1 2.496 57.621333l-2.496 2.709334-298.666667 298.666666a42.666667 42.666667 0 0 1-57.621333 2.496l-2.709333-2.496-298.666667-298.666666a42.666667 42.666667 0 0 1 0-60.330667z"
                  fill="#000000"
                  p-id="10093"
                ></path>
              </svg>
              <svg
                t="1681874903195"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2617"
                v-show="!arrowtop"
                v-if="item.id == showRef"
                @click="hideAssess(item.id)"
              >
                <path
                  d="M44.9792 721.9968l47.09888 47.0528 419.98848-419.94752 419.90144 419.94752 47.0528-47.05792-419.89632-419.93216v-0.00512l-47.09888-47.104-47.04768 47.04768z"
                  fill="#333333"
                  p-id="2618"
                ></path>
              </svg>
            </div>
            <input
              @blur="publishAssess(item.id)"
              v-if="item.id == inputRef"
              v-model="bodytext"
              type="text"
              name=""
              id=""
            />
            <div
              class="txt"
              v-if="item.id == listShow"
              v-for="child in JSON.parse(item.children)"
            >
              <div class="userpic">
                <img :src="login.baseApi + child.userpic" alt="" />
              </div>
              <div class="txtbody">
                <i>{{ child.username }}</i>
                <div class="content">{{ child.textbody }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="possvg">
      <svg
        t="1683777406765"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4915"
        width="20"
        height="20"
      >
        <path
          d="M764.528 432.152l-172.536-172.532-155.564 155.564 172.536 172.532 155.564-155.564z"
          fill="#DA002D"
          p-id="4916"
        ></path>
        <path
          d="M692.328 359.956l-38.888 38.888c-21.464 21.468-56.32 21.468-77.784 0L514.212 337.4l77.78-77.78 100.336 100.336z"
          fill="#EF0040"
          p-id="4917"
        ></path>
        <path
          d="M191.908 405.42a21.932 21.932 0 0 1 4.02-34.192c109.14-64.392 268.244-35.784 380.508 76.48 112.268 112.268 140.876 271.372 76.308 380.4a21.72 21.72 0 0 1-33.872 3.988c-74.824-74.536-352.284-351.996-426.964-426.676z"
          fill="#FA004E"
          p-id="4918"
        ></path>
        <path
          d="M135.384 875.812a9.244 9.244 0 0 0 12.948 12.952l350.324-264.28-98.996-98.992-264.276 350.32z"
          fill="#B4CEF6"
          p-id="4919"
        ></path>
        <path
          d="M333.984 612.548l13.704 13.704c13.856 13.856 13.856 36.352 0 50.208L136.224 887.92a9.244 9.244 0 0 1-0.84-12.108l198.6-263.264z"
          fill="#D5E4FD"
          p-id="4920"
        ></path>
        <path
          d="M191.536 405.036a21.92 21.92 0 0 1 4.392-33.808c89.188-52.62 211.744-43.136 314.836 23.356 66.492 103.092 75.948 225.632 23.184 314.732a21.72 21.72 0 0 1-33.872 3.984c-51.228-51.032-197.452-197.192-308.54-308.264z"
          fill="#FF2863"
          p-id="4921"
        ></path>
        <path
          d="M413.124 402.448a17.54 17.54 0 0 0-8.172-31.38c-35.396-4.744-87.924-7.46-130.584 8.324a16.16 16.16 0 0 0-5.42 26.44c12.74 13 30.644 30.904 43.564 43.824a26.692 26.692 0 0 0 34.98 2.416l65.632-49.624z"
          fill="#FFFFFF"
          fill-opacity=".1"
          p-id="4922"
        ></path>
        <path
          d="M544.456 234.708a32.04 32.04 0 0 1-0.128-45.176c55.932-55.064 208.436-180.784 336.636-60.26 118.804 129.64-5.524 280.976-60.304 336.572a31.96 31.96 0 0 1-45.084-0.116c-51.56-51.46-179.608-179.508-231.12-231.02z"
          fill="#FD1E4E"
          p-id="4923"
        ></path>
        <path
          d="M544.456 234.708a32.04 32.04 0 0 1-0.128-45.176c51.596-50.792 185.368-161.716 306.436-84.004 78.7 122.52-31.82 256.296-82.592 307.828a31.96 31.96 0 0 1-45.084-0.116 371899.072 371899.072 0 0 1-178.632-178.532z"
          fill="#FF3762"
          p-id="4924"
        ></path>
        <path
          d="M709.968 197.564c15.528-10.536 19.584-31.696 9.048-47.224-10.532-15.528-31.696-19.584-47.224-9.048l-52.964 35.928c-15.528 10.532-19.584 31.692-9.048 47.224 10.536 15.528 31.696 19.584 47.224 9.048l52.964-35.928z"
          fill="#FFFFFF"
          fill-opacity=".3"
          p-id="4925"
        ></path>
      </svg>
    </div>
    <div class="hostory">
      <p>历史问题</p>
      <ul>
        <li v-for="item in fullQue">{{ item.question }}</li>
      </ul>
    </div>
  </div>
  <router-view></router-view>
</template>

<script setup>
import store from "@/store";
import { inject, reactive, ref } from "vue";
import login from "../api/login";
import qs from "qs";
import { ElMessage } from "element-plus";
const reload = inject("reload");
// console.log(store.state.userpic);
const fullQue = ref([]);
const bodytext = ref();
const currentQue = ref([]);
const gotoansRef = ref(false);
const assessval = ref("");
const assessList = ref([]);
login.shequ().then(({ data }) => {
  // console.log(data);
  if (data.status == 200) {
    fullQue.value = data.data;
    data.data.forEach((item) => {
      if (item.isuse == 1) {
        currentQue.value = item;
        return;
      }
    });
  }
});

login.getans().then(({ data }) => {
  // console.log(data);
  // console.log(22, currentQue.value.id);
  if (data.status == 200) {
    // console.log(data.data);
    data.data.forEach((item) => {
      if (item.questionid == currentQue.value.id) {
        assessList.value.push(item);
      }
    });
  }
});
// console.log(assessList.value);
// 点赞
const like = (event) => {
  // console.log(event.target);
  if (event.target.getAttribute("fill") == "#dbdbdb") {
    event.target.setAttribute("fill", "#d81e06");
  } else {
    event.target.setAttribute("fill", "#dbdbdb");
  }
};

// 评论
const inputRef = ref();
const listShow = ref();
const arrowtop = ref(true);
const showRef = ref();
const showinput = (id) => {
  // console.log(id);
  inputRef.value = id;
};
const ansList = ref([]);
const ansObj = reactive({
  username: "",
  userpic: "",
  textbody: "",
});
const publishAssess = (id) => {
  assessList.value.forEach((item) => {
    // console.log(item);
    if (item.id == id) {
      // console.log(item);
      if (item.children != null) {
        ansList.value = JSON.parse(item.children);
      } else {
        ansList.value = [];
      }
    }
  });
  inputRef.value = "";
  // console.log(bodytext.value);
  // console.log(ansList.value);
  ansObj.username = store.state.userInfo.username;
  ansObj.userpic = store.state.pic;
  ansObj.textbody = bodytext.value;
  // console.log(ansObj);
  ansList.value.push(ansObj);
  // console.log(ansList.value);
  login
    .addans(qs.stringify({ children: JSON.stringify(ansList.value), id }))
    .then(({ data }) => {
      console.log(1, data);
      if (data.status == 200) {
        // location.reload();
        reload();
      }
    });
};
const showAssess = (id) => {
  showRef.value = id;
  listShow.value = id;
  arrowtop.value = !arrowtop.value;
  // console.log(111, arrowtop.value);
};
const hideAssess = (id) => {
  listShow.value = 0;
  arrowtop.value = !arrowtop.value;
};
// 时间
const timechange = (data) => {
  let year = new Date(data).getFullYear();
  let month = new Date(data).getMonth() + 1;
  let day = new Date(data).getDate();
  let time = year + "-" + month + "-" + day;
  return time;
};

// console.log(currentQue.value);
const assessp = (val) => {
  // console.log(val);
  gotoansRef.value = false;
  login
    .assessp(
      qs.stringify({
        username: store.state.userInfo.username,
        userpic: store.state.pic,
        textbody: val,
        pdate: timechange(new Date()),
        questionid: currentQue.value.id,
      })
    )
    .then(({ data }) => {
      // console.log(data);
      if (data.status == 200) {
        ElMessage({
          message: "评论成功！",
          type: "success",
        });
        login.shequ().then(({ data }) => {
          // console.log(data);
          if (data.status == 200) {
            assessList.value = [];
            fullQue.value = data.data;
            data.data.forEach((item) => {
              if (item.isuse == 1) {
                currentQue.value = item;
                return;
              }
            });
          }
          // console.log(1, currentQue.value.id);
        });
        login.getans().then(({ data }) => {
          // console.log(data);
          // console.log(22, currentQue.value.id);
          if (data.status == 200) {
            // console.log(data.data);
            data.data.forEach((item) => {
              if (item.questionid == currentQue.value.id) {
                assessList.value.push(item);
              }
            });
          }
        });
      }
    });
  assessval.value = "";
};
</script>

<style scoped lang="scss">
.isshow {
  width: 1000px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  align-items: baseline;
  // background-color: aquamarine;
}

.content {
  width: 460px;
}
.question {
  width: 700px;
  height: 100%;
  min-height: 500px;
  h3 {
    font-size: 20px;
  }
  p {
    color: #999;
  }
}
.hostory {
  width: 225px;
  // height: 500px;
  min-height: 220px;
  // background-color: rgba(255, 165, 0, 0.15);
  border: 1px solid #ccc;
  padding: 20px 8px;
  p {
    text-align: center;
    margin-bottom: 20px;
  }
  li {
    width: 100%;
    margin-bottom: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
  }
}
.ans {
  margin-top: 50px;
  .total {
    padding-bottom: 5px;
    border-bottom: 1px solid #eee;
  }
}
.txt {
  margin: 30px 0;
  display: flex;
  .userpic {
    width: 60px;
    height: 60px;
    margin-right: 40px;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }
}
.txtbody {
  width: 100%;
  i {
    display: block;
    margin-bottom: 10px;
    margin-top: 0;
  }
  input {
    margin-top: 5px;
    width: 180px;
  }
}
.opt {
  float: right;
  // background-color: #000;
  width: 150px;
  height: 20px;
  svg {
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-right: 15px;
  }
}
.assess {
  position: relative;
  top: 30px;
  left: 0;
  width: 100%;
  // background-color: #000;
}
.answer {
  float: right;
  width: 100px;
  height: 26px;
  margin-right: 20px;
  line-height: 26px;
  text-align: center;
  background-color: orange;
  cursor: pointer;
}
:deep(.el-textarea__inner) {
  margin-top: 20px;
}
.possvg {
  position: absolute;
  top: 66px;
  right: 251px;
  width: 20px;
  height: 20px;
}
</style>
