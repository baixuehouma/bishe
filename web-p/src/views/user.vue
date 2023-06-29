<template>
  <div class="word">
    <Suspense>
      <template #default>
        <div>
          <World></World>
        </div>
      </template>
    </Suspense>
    <div class="potitle">
      <span>{{ activities.length }} 省份</span>
      <i></i>
      <span>{{ youjicount }} 游记</span>
    </div>
  </div>
  <div class="defaultbox">
    <ul>
      <li
        @click="
          rightcol(1);
          getgocity(store.state.userInfo.username);
        "
      >
        TA的足迹
      </li>
      <li
        @click="
          rightcol(2);
          getPublishArticle(store.state.userInfo.username);
        "
      >
        TA的游记
      </li>
      <li
        @click="
          rightcol(3);
          getLikeArticle(store.state.userInfo.username);
        "
      >
        TA的喜欢
      </li>
    </ul>
  </div>
  <div class="exit">
    <el-button type="primary" @click="exit">退出</el-button>
  </div>
  <div class="entir">
    <div class="banner">
      <div class="col">
        <div class="userpic">
          <img
            :src="login.baseApi + store.state.pic"
            alt="点击修改信息"
            @click="dialogFormVisible = true"
          />
        </div>
        <div class="name">
          <text>{{ InfoMessage.username }}</text>
          <svg
            t="1679397951447"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="7198"
            width="200"
            height="200"
            v-if="InfoMessage.sex == 0"
          >
            <path
              d="M512 105.5c-220.6 0-399.5 178.9-399.5 399.5S291.4 904.5 512 904.5 911.5 725.6 911.5 505 732.6 105.5 512 105.5z m200 621.9H561.5v75.1h-99.1v-75.1H312V627.3h150.4v-6.2c-33.6-8.6-65.5-25.9-91.8-52.2-78-78-78-204.5 0-282.5s204.5-78 282.5 0 78 204.5 0 282.5c-26.3 26.3-58.1 43.7-91.7 52.2v6.2h150.4v100.1h0.2z"
              fill="#FF4D94"
              p-id="7199"
            ></path>
            <path
              d="M582.4 356.1c-39.1-39.1-102.5-39.1-141.6 0-39.1 39.1-39.1 102.4 0 141.5 39.1 39.1 102.5 39.1 141.6 0 39.1-39 39.1-102.4 0-141.5z"
              fill="#FF4D94"
              p-id="7200"
            ></path>
          </svg>
          <svg
            v-if="InfoMessage.sex == 1"
            t="1679445885262"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="12369"
            width="200"
            height="200"
          >
            <path
              d="M512 105.3c-220.7 0-399.7 179-399.7 399.7s179 399.7 399.7 399.7 399.7-179 399.7-399.7-179-399.7-399.7-399.7z m241.6 270.8h-0.5v175.4h-99.8v-90.1l-46.6 49.7c13.7 27.1 21.4 57.6 21.4 90 0 110.4-89.5 200-199.9 200s-199.9-89.5-199.9-200 89.5-200 199.9-200c36.1 0 70.1 9.6 99.3 26.4l48.3-51.4h-97.5v-99.7h275.3v99.7z"
              fill="#0091FF"
              p-id="12370"
            ></path>
            <path
              d="M428 501.5c-55.1 0-99.7 44.8-99.7 100s44.6 100 99.7 100 99.7-44.8 99.7-100-44.7-100-99.7-100z"
              fill="#0091FF"
              p-id="12371"
            ></path>
          </svg>
          <svg
            v-if="InfoMessage.sex == 2"
            t="1679446151292"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3457"
            width="200"
            height="200"
          >
            <path
              d="M890.666667 234.666667A469.333333 469.333333 0 0 0 42.666667 512a463.36 463.36 0 0 0 12.373333 106.666667 469.333333 469.333333 0 0 1 161.92-258.133334 42.666667 42.666667 0 0 1 49.066667-3.626666A466.56 466.56 0 0 0 512 426.666667a466.56 466.56 0 0 0 245.973333-69.76 42.666667 42.666667 0 0 1 49.066667 3.626666A469.333333 469.333333 0 0 1 968.96 618.666667a469.333333 469.333333 0 0 0-78.293333-384z"
              fill="#333333"
              p-id="3458"
            ></path>
            <path
              d="M341.333333 512a42.666667 42.666667 0 0 0-42.666666 42.666667v85.333333a42.666667 42.666667 0 0 0 85.333333 0v-85.333333a42.666667 42.666667 0 0 0-42.666667-42.666667zM682.666667 512a42.666667 42.666667 0 0 0-42.666667 42.666667v85.333333a42.666667 42.666667 0 0 0 85.333333 0v-85.333333a42.666667 42.666667 0 0 0-42.666666-42.666667z"
              fill="#333333"
              p-id="3459"
            ></path>
            <path
              d="M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512z m0-938.666667a426.666667 426.666667 0 1 0 426.666667 426.666667A426.666667 426.666667 0 0 0 512 85.333333z"
              fill="#333333"
              p-id="3460"
            ></path>
          </svg>
        </div>
        <span>现居 : {{ InfoMessage.address }}</span>
        <div class="introduce">个性签名：{{ InfoMessage.introduction }}</div>
        <span>留言板</span>
        <textarea
          name=""
          id=""
          cols="30"
          rows="5"
          placeholder="给楼主留个脚印，说点什么..."
          v-model="saying"
        ></textarea>
        <el-button class="inputsay" type="info" @click="inputSay"
          >留言</el-button
        >
        <div class="boxsay">
          <div v-for="item in saycount" class="boxsaying">
            <img :src="login.baseApi + item.img" alt="" class="un" />
            <div class="cn">
              <input type="text" :value="item.content" readonly="readonly" />
            </div>
          </div>
        </div>
      </div>
      <div class="rightcol">
        <div class="userInfo" v-if="colId == 1">
          <div class="top">
            <div class="xunzhangtext">
              <span
                >走过 <strong>{{ activities.length }}</strong> 省份，到过
                <strong>{{ gocity }}</strong> 城市，留下
                <strong>{{ youjicount }}</strong> 游记</span
              >
            </div>
            <div class="xunzhang">
              <dl @click="dialogVisible = true">
                <dt>
                  <span style="font-size: 20px">共收集</span>
                  <br />
                  城市勋章
                </dt>
                <dd v-show="gocity >= 3">
                  <svg
                    t="1679456389166"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2570"
                    width="200"
                    height="200"
                  >
                    <path
                      d="M896 42.666667h-128l-170.666667 213.333333h128z"
                      fill="#FF4C4C"
                      p-id="2571"
                    ></path>
                    <path
                      d="M768 42.666667h-128l-170.666667 213.333333h128z"
                      fill="#3B8CFF"
                      p-id="2572"
                    ></path>
                    <path
                      d="M640 42.666667h-128L341.333333 256h128z"
                      fill="#F1F1F1"
                      p-id="2573"
                    ></path>
                    <path
                      d="M128 42.666667h128l170.666667 213.333333H298.666667z"
                      fill="#FF4C4C"
                      p-id="2574"
                    ></path>
                    <path
                      d="M256 42.666667h128l170.666667 213.333333h-128z"
                      fill="#3B8CFF"
                      p-id="2575"
                    ></path>
                    <path
                      d="M384 42.666667h128l170.666667 213.333333h-128z"
                      fill="#FBFBFB"
                      p-id="2576"
                    ></path>
                    <path
                      d="M298.666667 256h426.666666v213.333333H298.666667z"
                      fill="#9C9C9C"
                      p-id="2577"
                    ></path>
                    <path
                      d="M512 661.333333m-320 0a320 320 0 1 0 640 0 320 320 0 1 0-640 0Z"
                      fill="#D3D3D3"
                      p-id="2578"
                    ></path>
                    <path
                      d="M512 661.333333m-256 0a256 256 0 1 0 512 0 256 256 0 1 0-512 0Z"
                      fill="#B8B8B8"
                      p-id="2579"
                    ></path>
                    <path
                      d="M512 661.333333m-213.333333 0a213.333333 213.333333 0 1 0 426.666666 0 213.333333 213.333333 0 1 0-426.666666 0Z"
                      fill="#D3D3D3"
                      p-id="2580"
                    ></path>
                    <path
                      d="M277.333333 256h469.333334a21.333333 21.333333 0 0 1 0 42.666667h-469.333334a21.333333 21.333333 0 0 1 0-42.666667z"
                      fill="#9C9C9C"
                      p-id="2581"
                    ></path>
                    <path
                      d="M277.333333 264.533333a12.8 12.8 0 1 0 0 25.6h469.333334a12.8 12.8 0 1 0 0-25.6h-469.333334z m0-17.066666h469.333334a29.866667 29.866667 0 1 1 0 59.733333h-469.333334a29.866667 29.866667 0 1 1 0-59.733333z"
                      fill="#B8B8B8"
                      p-id="2582"
                    ></path>
                    <path
                      d="M512 746.666667l-100.309333 52.736 19.157333-111.701334-81.152-79.104 112.128-16.298666L512 490.666667l50.176 101.632 112.128 16.298666-81.152 79.104 19.157333 111.701334z"
                      fill="#F0F0F0"
                      p-id="2583"
                    ></path>
                  </svg>
                </dd>
                <dd v-show="gocity >= 6 && youjicount >= 1">
                  <svg
                    t="1679456643905"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="11243"
                    width="200"
                    height="200"
                  >
                    <path
                      d="M896 42.666667h-128l-170.666667 213.333333h128z"
                      fill="#FF4C4C"
                      p-id="11244"
                    ></path>
                    <path
                      d="M768 42.666667h-128l-170.666667 213.333333h128z"
                      fill="#3B8CFF"
                      p-id="11245"
                    ></path>
                    <path
                      d="M640 42.666667h-128L341.333333 256h128z"
                      fill="#F1F1F1"
                      p-id="11246"
                    ></path>
                    <path
                      d="M128 42.666667h128l170.666667 213.333333H298.666667z"
                      fill="#FF4C4C"
                      p-id="11247"
                    ></path>
                    <path
                      d="M256 42.666667h128l170.666667 213.333333h-128z"
                      fill="#3B8CFF"
                      p-id="11248"
                    ></path>
                    <path
                      d="M384 42.666667h128l170.666667 213.333333h-128z"
                      fill="#FBFBFB"
                      p-id="11249"
                    ></path>
                    <path
                      d="M298.666667 256h426.666666v213.333333H298.666667z"
                      fill="#A0510E"
                      p-id="11250"
                    ></path>
                    <path
                      d="M512 661.333333m-320 0a320 320 0 1 0 640 0 320 320 0 1 0-640 0Z"
                      fill="#E19449"
                      p-id="11251"
                    ></path>
                    <path
                      d="M512 661.333333m-256 0a256 256 0 1 0 512 0 256 256 0 1 0-512 0Z"
                      fill="#C2681B"
                      p-id="11252"
                    ></path>
                    <path
                      d="M512 661.333333m-213.333333 0a213.333333 213.333333 0 1 0 426.666666 0 213.333333 213.333333 0 1 0-426.666666 0Z"
                      fill="#E19449"
                      p-id="11253"
                    ></path>
                    <path
                      d="M277.333333 256h469.333334a21.333333 21.333333 0 0 1 0 42.666667h-469.333334a21.333333 21.333333 0 0 1 0-42.666667z"
                      fill="#A0510E"
                      p-id="11254"
                    ></path>
                    <path
                      d="M277.333333 264.533333a12.8 12.8 0 1 0 0 25.6h469.333334a12.8 12.8 0 1 0 0-25.6h-469.333334z m0-17.066666h469.333334a29.866667 29.866667 0 1 1 0 59.733333h-469.333334a29.866667 29.866667 0 1 1 0-59.733333z"
                      fill="#C2681B"
                      p-id="11255"
                    ></path>
                    <path
                      d="M512 746.666667l-100.309333 52.736 19.157333-111.701334-81.152-79.104 112.128-16.298666L512 490.666667l50.176 101.632 112.128 16.298666-81.152 79.104 19.157333 111.701334z"
                      fill="#FFDCA6"
                      p-id="11256"
                    ></path>
                  </svg>
                </dd>
                <dd v-show="gocity >= 12 && youjicount >= 8">
                  <svg
                    t="1679456424145"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="3749"
                    width="200"
                    height="200"
                  >
                    <path
                      d="M896 42.666667h-128l-170.666667 213.333333h128z"
                      fill="#FF4C4C"
                      p-id="3750"
                    ></path>
                    <path
                      d="M768 42.666667h-128l-170.666667 213.333333h128z"
                      fill="#3B8CFF"
                      p-id="3751"
                    ></path>
                    <path
                      d="M640 42.666667h-128L341.333333 256h128z"
                      fill="#F1F1F1"
                      p-id="3752"
                    ></path>
                    <path
                      d="M128 42.666667h128l170.666667 213.333333H298.666667z"
                      fill="#FF4C4C"
                      p-id="3753"
                    ></path>
                    <path
                      d="M256 42.666667h128l170.666667 213.333333h-128z"
                      fill="#3B8CFF"
                      p-id="3754"
                    ></path>
                    <path
                      d="M384 42.666667h128l170.666667 213.333333h-128z"
                      fill="#FBFBFB"
                      p-id="3755"
                    ></path>
                    <path
                      d="M298.666667 256h426.666666v213.333333H298.666667z"
                      fill="#E3A815"
                      p-id="3756"
                    ></path>
                    <path
                      d="M512 661.333333m-320 0a320 320 0 1 0 640 0 320 320 0 1 0-640 0Z"
                      fill="#FDDC3A"
                      p-id="3757"
                    ></path>
                    <path
                      d="M512 661.333333m-256 0a256 256 0 1 0 512 0 256 256 0 1 0-512 0Z"
                      fill="#E3A815"
                      p-id="3758"
                    ></path>
                    <path
                      d="M512 661.333333m-213.333333 0a213.333333 213.333333 0 1 0 426.666666 0 213.333333 213.333333 0 1 0-426.666666 0Z"
                      fill="#F5CF41"
                      p-id="3759"
                    ></path>
                    <path
                      d="M277.333333 256h469.333334a21.333333 21.333333 0 0 1 0 42.666667h-469.333334a21.333333 21.333333 0 0 1 0-42.666667z"
                      fill="#D19A0E"
                      p-id="3760"
                    ></path>
                    <path
                      d="M277.333333 264.533333a12.8 12.8 0 1 0 0 25.6h469.333334a12.8 12.8 0 1 0 0-25.6h-469.333334z m0-17.066666h469.333334a29.866667 29.866667 0 1 1 0 59.733333h-469.333334a29.866667 29.866667 0 1 1 0-59.733333z"
                      fill="#F9D525"
                      p-id="3761"
                    ></path>
                    <path
                      d="M512 746.666667l-100.309333 52.736 19.157333-111.701334-81.152-79.104 112.128-16.298666L512 490.666667l50.176 101.632 112.128 16.298666-81.152 79.104 19.157333 111.701334z"
                      fill="#FFF2A0"
                      p-id="3762"
                    ></path>
                  </svg>
                </dd>
              </dl>
            </div>
          </div>
          <div class="botom">
            <el-timeline center>
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
              >
                <p>{{ activity.content }}</p>
                <div class="citypic" v-for="item in activity.timestamp">
                  <span v-for="(v, k) in item">
                    <h3>{{ k }}</h3>

                    <img
                      class="imghh"
                      v-for="child in v"
                      :src="login.baseApi + child"
                      alt=""
                    />
                  </span>
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
        <div class="userRun" v-if="colId == 2">
          <div
            v-if="messagebox == true"
            class="body"
            :key="item.id"
            v-for="item in publishMessage"
          >
            <div class="coverImg">
              <img :src="login.baseApi + item.img[0]" alt="" />
            </div>
            <div class="bodytext">
              <h3>{{ item.title }}</h3>
              <div class="mid">
                <div class="xihuan">
                  <svg
                    t="1679540003951"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="6653"
                    width="200"
                    height="200"
                  >
                    <path
                      d="M998.162542 368.639918c0 50.89925-9.987468 100.631932-29.67588 147.826813-17.304108 41.4746-42.712801 82.34545-75.519997 121.466446-61.336974 73.15616-140.325979 131.402749-209.511711 178.720428-9.332553 6.375198-22.062482 3.990894-28.447912-5.341658-6.385431-9.322319-3.990894-22.062482 5.341658-28.447912 66.883293-45.75202 143.099139-101.870132 201.25363-171.219593 64.345494-76.758198 95.627964-156.248623 95.627964-243.004523 0-124.229372-101.071953-225.291093-225.291093-225.291093-75.622328 0-145.8109 37.708833-187.756221 100.877525l-17.048281 25.674753-17.048281-25.674753c-41.945321-63.168692-112.133893-100.877525-187.756221-100.877525-124.219139 0-225.291093 101.06172-225.291093 225.291093 0 215.712947 197.764156 348.108303 342.173127 444.769806 39.949874 26.749224 74.455759 49.845245 101.020788 71.989591 8.68787 7.234775 9.864672 20.138666 2.619664 28.816303-4.042059 4.860704-9.864672 7.367805-15.728216 7.367805-4.625344 0-9.260921-1.555425-13.088086-4.748141-24.927739-20.762883-58.604746-43.306318-97.592712-69.410859-72.644507-48.627511-163.05361-109.145839-234.17339-185.750541-39.571251-42.620703-69.001537-85.282339-89.979314-130.430608-24.006763-51.697429-36.184107-106.403379-36.184107-162.603355 0-71.109548 27.690666-137.962142 77.986165-188.247408 50.285267-50.285267 117.137861-77.975932 188.237175-77.975932 79.787184 0 154.447605 35.508725 204.804503 96.231715 50.356898-60.72299 125.017318-96.231715 204.804503-96.231715 71.099315 0 137.962142 27.690666 188.237175 77.975932C970.471876 230.677776 998.162542 297.53037 998.162542 368.639918z"
                      p-id="6654"
                      fill="#8a8a8a"
                    ></path>
                  </svg>
                  <span>{{ item.likeCount }}</span>
                </div>
              </div>
              <div class="content">{{ item.content }}</div>
            </div>
          </div>
          <div class="lazy" v-if="messagebox == false">
            <h3>该游记正在路上~</h3>
          </div>
        </div>
        <div class="userLike" v-if="colId == 3">
          <el-row>
            <el-col :key="item.id" v-for="item in likeMessage">
              <el-card :body-style="{ padding: '20px 0 5px 70px' }">
                <img
                  :src="login.baseApi + item.img[0]"
                  class="image"
                  @click="gotoArticle(item.id)"
                />
                <div style="padding: 14px">
                  <span>{{ item.title }}</span>
                  <div class="bottomLike">
                    <span>
                      <svg
                        t="1679967403396"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="4520"
                        width="200"
                        height="200"
                      >
                        <path
                          d="M698.4 122c-67.5 0-134.9 25.9-186.4 77.8-51.5-51.9-118.9-77.8-186.4-77.8s-134.9 25.9-186.4 77.8c-102.9 103.7-102.9 271.8 0 375.6l289.9 292.1C452 890.5 482 902 512 902c30 0 60-11.5 82.8-34.6l289.9-292.1c102.9-103.7 102.9-271.8 0-375.6-51.4-51.8-118.8-77.7-186.3-77.7z"
                          fill="#d81e06"
                          p-id="4521"
                        ></path>
                      </svg>
                    </span>
                    {{ item.likeCount }}
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
  <!-- 奖杯详情dialog -->
  <el-dialog v-model="dialogVisible" title="奖杯详情" width="30%">
    <div class="detail">
      <ul>
        <li>
          <svg
            t="1679456389166"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2570"
            width="200"
            height="200"
          >
            <path
              d="M896 42.666667h-128l-170.666667 213.333333h128z"
              fill="#FF4C4C"
              p-id="2571"
            ></path>
            <path
              d="M768 42.666667h-128l-170.666667 213.333333h128z"
              fill="#3B8CFF"
              p-id="2572"
            ></path>
            <path
              d="M640 42.666667h-128L341.333333 256h128z"
              fill="#F1F1F1"
              p-id="2573"
            ></path>
            <path
              d="M128 42.666667h128l170.666667 213.333333H298.666667z"
              fill="#FF4C4C"
              p-id="2574"
            ></path>
            <path
              d="M256 42.666667h128l170.666667 213.333333h-128z"
              fill="#3B8CFF"
              p-id="2575"
            ></path>
            <path
              d="M384 42.666667h128l170.666667 213.333333h-128z"
              fill="#FBFBFB"
              p-id="2576"
            ></path>
            <path
              d="M298.666667 256h426.666666v213.333333H298.666667z"
              fill="#9C9C9C"
              p-id="2577"
            ></path>
            <path
              d="M512 661.333333m-320 0a320 320 0 1 0 640 0 320 320 0 1 0-640 0Z"
              fill="#D3D3D3"
              p-id="2578"
            ></path>
            <path
              d="M512 661.333333m-256 0a256 256 0 1 0 512 0 256 256 0 1 0-512 0Z"
              fill="#B8B8B8"
              p-id="2579"
            ></path>
            <path
              d="M512 661.333333m-213.333333 0a213.333333 213.333333 0 1 0 426.666666 0 213.333333 213.333333 0 1 0-426.666666 0Z"
              fill="#D3D3D3"
              p-id="2580"
            ></path>
            <path
              d="M277.333333 256h469.333334a21.333333 21.333333 0 0 1 0 42.666667h-469.333334a21.333333 21.333333 0 0 1 0-42.666667z"
              fill="#9C9C9C"
              p-id="2581"
            ></path>
            <path
              d="M277.333333 264.533333a12.8 12.8 0 1 0 0 25.6h469.333334a12.8 12.8 0 1 0 0-25.6h-469.333334z m0-17.066666h469.333334a29.866667 29.866667 0 1 1 0 59.733333h-469.333334a29.866667 29.866667 0 1 1 0-59.733333z"
              fill="#B8B8B8"
              p-id="2582"
            ></path>
            <path
              d="M512 746.666667l-100.309333 52.736 19.157333-111.701334-81.152-79.104 112.128-16.298666L512 490.666667l50.176 101.632 112.128 16.298666-81.152 79.104 19.157333 111.701334z"
              fill="#F0F0F0"
              p-id="2583"
            ></path>
          </svg>
          到过3个城市
        </li>
        <li>
          <svg
            t="1679456643905"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="11243"
            width="200"
            height="200"
          >
            <path
              d="M896 42.666667h-128l-170.666667 213.333333h128z"
              fill="#FF4C4C"
              p-id="11244"
            ></path>
            <path
              d="M768 42.666667h-128l-170.666667 213.333333h128z"
              fill="#3B8CFF"
              p-id="11245"
            ></path>
            <path
              d="M640 42.666667h-128L341.333333 256h128z"
              fill="#F1F1F1"
              p-id="11246"
            ></path>
            <path
              d="M128 42.666667h128l170.666667 213.333333H298.666667z"
              fill="#FF4C4C"
              p-id="11247"
            ></path>
            <path
              d="M256 42.666667h128l170.666667 213.333333h-128z"
              fill="#3B8CFF"
              p-id="11248"
            ></path>
            <path
              d="M384 42.666667h128l170.666667 213.333333h-128z"
              fill="#FBFBFB"
              p-id="11249"
            ></path>
            <path
              d="M298.666667 256h426.666666v213.333333H298.666667z"
              fill="#A0510E"
              p-id="11250"
            ></path>
            <path
              d="M512 661.333333m-320 0a320 320 0 1 0 640 0 320 320 0 1 0-640 0Z"
              fill="#E19449"
              p-id="11251"
            ></path>
            <path
              d="M512 661.333333m-256 0a256 256 0 1 0 512 0 256 256 0 1 0-512 0Z"
              fill="#C2681B"
              p-id="11252"
            ></path>
            <path
              d="M512 661.333333m-213.333333 0a213.333333 213.333333 0 1 0 426.666666 0 213.333333 213.333333 0 1 0-426.666666 0Z"
              fill="#E19449"
              p-id="11253"
            ></path>
            <path
              d="M277.333333 256h469.333334a21.333333 21.333333 0 0 1 0 42.666667h-469.333334a21.333333 21.333333 0 0 1 0-42.666667z"
              fill="#A0510E"
              p-id="11254"
            ></path>
            <path
              d="M277.333333 264.533333a12.8 12.8 0 1 0 0 25.6h469.333334a12.8 12.8 0 1 0 0-25.6h-469.333334z m0-17.066666h469.333334a29.866667 29.866667 0 1 1 0 59.733333h-469.333334a29.866667 29.866667 0 1 1 0-59.733333z"
              fill="#C2681B"
              p-id="11255"
            ></path>
            <path
              d="M512 746.666667l-100.309333 52.736 19.157333-111.701334-81.152-79.104 112.128-16.298666L512 490.666667l50.176 101.632 112.128 16.298666-81.152 79.104 19.157333 111.701334z"
              fill="#FFDCA6"
              p-id="11256"
            ></path>
          </svg>
          到过6个城市 留过1个足迹
        </li>
        <li>
          <svg
            t="1679456424145"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3749"
            width="200"
            height="200"
          >
            <path
              d="M896 42.666667h-128l-170.666667 213.333333h128z"
              fill="#FF4C4C"
              p-id="3750"
            ></path>
            <path
              d="M768 42.666667h-128l-170.666667 213.333333h128z"
              fill="#3B8CFF"
              p-id="3751"
            ></path>
            <path
              d="M640 42.666667h-128L341.333333 256h128z"
              fill="#F1F1F1"
              p-id="3752"
            ></path>
            <path
              d="M128 42.666667h128l170.666667 213.333333H298.666667z"
              fill="#FF4C4C"
              p-id="3753"
            ></path>
            <path
              d="M256 42.666667h128l170.666667 213.333333h-128z"
              fill="#3B8CFF"
              p-id="3754"
            ></path>
            <path
              d="M384 42.666667h128l170.666667 213.333333h-128z"
              fill="#FBFBFB"
              p-id="3755"
            ></path>
            <path
              d="M298.666667 256h426.666666v213.333333H298.666667z"
              fill="#E3A815"
              p-id="3756"
            ></path>
            <path
              d="M512 661.333333m-320 0a320 320 0 1 0 640 0 320 320 0 1 0-640 0Z"
              fill="#FDDC3A"
              p-id="3757"
            ></path>
            <path
              d="M512 661.333333m-256 0a256 256 0 1 0 512 0 256 256 0 1 0-512 0Z"
              fill="#E3A815"
              p-id="3758"
            ></path>
            <path
              d="M512 661.333333m-213.333333 0a213.333333 213.333333 0 1 0 426.666666 0 213.333333 213.333333 0 1 0-426.666666 0Z"
              fill="#F5CF41"
              p-id="3759"
            ></path>
            <path
              d="M277.333333 256h469.333334a21.333333 21.333333 0 0 1 0 42.666667h-469.333334a21.333333 21.333333 0 0 1 0-42.666667z"
              fill="#D19A0E"
              p-id="3760"
            ></path>
            <path
              d="M277.333333 264.533333a12.8 12.8 0 1 0 0 25.6h469.333334a12.8 12.8 0 1 0 0-25.6h-469.333334z m0-17.066666h469.333334a29.866667 29.866667 0 1 1 0 59.733333h-469.333334a29.866667 29.866667 0 1 1 0-59.733333z"
              fill="#F9D525"
              p-id="3761"
            ></path>
            <path
              d="M512 746.666667l-100.309333 52.736 19.157333-111.701334-81.152-79.104 112.128-16.298666L512 490.666667l50.176 101.632 112.128 16.298666-81.152 79.104 19.157333 111.701334z"
              fill="#FFF2A0"
              p-id="3762"
            ></path>
          </svg>
          到过12个城市 留下8个足迹
        </li>
      </ul>
    </div>
  </el-dialog>
  <!-- 修改个人信息dialog -->
  <el-dialog v-model="dialogFormVisible" title="完善用户信息" width="35%">
    <el-form :model="form">
      <el-upload
        class="avatar-uploader"
        action="http://127.0.0.1:3007/high/adduserpic"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        name="img"
        :headers="header"
      >
        <img v-if="imageUrl" :src="login.baseApi + imageUrl" class="avatar" />
        <img v-else :src="login.baseApi + empty.webp" class="avatar" />
      </el-upload>
      <el-form-item label="用户名" label-width="90px">
        <el-input :disabled="true" v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" label-width="90px">
        <el-radio-group v-model="form.resource">
          <el-radio :label="1" @click="changeRadio(1)">男</el-radio>
          <el-radio :label="0" @click="changeRadio(0)">女</el-radio>
          <el-radio :label="2" @click="changeRadio(2)">保密</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="地址" label-width="90px">
        <el-input v-model="form.address"> </el-input>
      </el-form-item>
      <el-form-item label="个性签名" label-width="90px">
        <el-input v-model="form.desc" />
      </el-form-item>
      <el-form-item label="手机号" label-width="90px">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="身份证号" label-width="90px">
        <el-input
          v-model="form.identity"
          :disabled="form.identity == null ? false : true"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="onSubmit"> 修改 </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 确认退出dialog -->
  <el-dialog v-model="isexit" title="退出登录" width="25%">
    <span>是否确认退出当前账号</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="info" @click="isexit = false"> 取消 </el-button>
        <el-button type="primary" @click="isexits"> 确认退出 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import World from "../components/word.vue";
import store from "../store/index";
import { useStore } from "vuex";
import login from "../api/login";
import { reactive, ref } from "vue";
// import {  LocationInformation } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import qs from "qs";
import { useRouter } from "vue-router";

const router = useRouter();
const imageUrl = ref("");
const ustore = useStore();
const saying = ref();
const colId = ref(1);
const isexit = ref(false);
// 获取喜欢的文章
const likeMessage = ref();
const getLikeArticle = (username) => {
  login.getlikeArticle(qs.stringify({ username })).then(({ data }) => {
    if (data.status == 200) {
      data.data.forEach((item) => {
        item.img = JSON.parse(item.img);
      });
      likeMessage.value = data.data;
    }
  });
};
// 获取自己发布的文章
const youjicount = ref();
const publishMessage = ref();
// messagebox = true 发布过文章
const messagebox = ref(true);
const getPublishArticle = (username) => {
  login.getPublishArticle(qs.stringify({ username })).then(({ data }) => {
    if (data.status == 200) {
      data.data.forEach((item) => {
        item.img = JSON.parse(item.img);
      });
      publishMessage.value = data.data;
      youjicount.value = data.data.length;
    } else if (data.status == 100) {
      messagebox.value = false;
    }
  });
};
// 发布留言
const inputSay = () => {
  // console.log(saying.value);
  // console.log(store.state.pic);
  login
    .submitSaying(
      qs.stringify({
        speaker: store.state.userInfo.username,
        content: saying.value,
        user: store.state.userInfo.username,
        img: store.state.pic,
      })
    )
    .then(({ data }) => {
      if (data.status == 200) {
        getsaying();
        saying.value = "";
      }
    });
};
// 获取留言
const saycount = ref();
const getsaying = () => {
  login
    .getSaying(qs.stringify({ user: store.state.userInfo.username }))
    .then(({ data }) => {
      // console.log(data);
      if (data.status == 200) {
        saycount.value = data.data;
      }
    });
};
getsaying();
const rightcol = (id) => {
  colId.value = id;
};
// 获取个人信息
const InfoMessage = reactive({
  username: "",
  introduction: "",
  sex: "",
  address: "",
});
login
  .getUserinfo(qs.stringify({ username: store.state.userInfo.username }))
  .then(({ data }) => {
    imageUrl.value = data.data[0].pic;
    InfoMessage.username = data.data[0].username;
    InfoMessage.introduction = data.data[0].introduction;
    InfoMessage.sex = data.data[0].sex;
    InfoMessage.address = data.data[0].address;
    form.phone = data.data[0].phone;
    form.identity = data.data[0].identity;
    form.name = data.data[0].username;
    form.desc = data.data[0].introduction;
    form.resource = data.data[0].sex;
    form.address = data.data[0].address;
  });
const dialogVisible = ref(false);
const dialogFormVisible = ref(false);

const form = reactive({
  name: "",
  desc: "",
  resource: 2,
  address: "保密",
  phone: "",
  identity: "",
});
const onSubmit = () => {
  login
    .editUser(
      qs.stringify({
        username: form.name,
        pic: imageUrl.value,
        introduction: form.desc,
        sex: form.resource,
        address: form.address,
        phone: form.phone,
        identity: form.identity,
      })
    )
    .then(({ data }) => {
      if (data.status == 200) {
        dialogFormVisible.value = false;
        ustore.commit("changePic", imageUrl.value);
        ustore.commit("setUser", {
          phone: form.phone,
          identity: form.identity,
        });
        ElMessage({
          message: "修改成功！",
          type: "success",
        });
        login
          .getUserinfo(
            qs.stringify({ username: store.state.userInfo.username })
          )
          .then(({ data }) => {
            imageUrl.value = data.data[0].pic;
            InfoMessage.username = data.data[0].username;
            InfoMessage.introduction = data.data[0].introduction;
            InfoMessage.sex = data.data[0].sex;
            InfoMessage.address = data.data[0].address;
            form.name = data.data[0].username;
            form.desc = data.data[0].introduction;
            form.resource = data.data[0].sex;
            form.address = data.data[0].address;
          });
      }
    });
};
const changeRadio = (num) => {
  form.resource = num;
};
const header = ref({
  Authorization: localStorage.token,
});

const handleAvatarSuccess = (response, uploadFile) => {
  imageUrl.value = response.url;
};

// 根据文章id跳转
const gotoArticle = (id) => {
  ustore.commit("changeOp", "wz");
  store.state.isshow = false;
  ustore.commit("setArticleId", id);
  router.push("/community");
};
// 获取足迹
const gocity = ref(0);
const activities = ref([]);
const obj = ref({});
const getgocity = (username) => {
  // console.log(username);
  login.getgocity(qs.stringify({ username })).then(({ data }) => {
    // activities.value = [];
    // console.log(data);
    if (data.status == 200) {
      data.data[0].gocity = JSON.parse(data.data[0].gocity);
      // console.log();
      gocity.value = data.data[0].gocity.length;
      obj.value = {};
      data.data[0].gocity.forEach((item) => {
        var obj1 = {};
        if (obj.value[item.name]) {
          console.log(item.pic);
          if (item.pic != undefined) {
            item.pic = item.pic.split(",");
            // console.log(item.pic.split(","), 22);
          } else {
            item.pic = [];
          }
          // console.log(item.pic, 11);
          item.pic = item.pic.filter((item) => {
            return item != "";
          });
          console.log(item.pic, 88);
          obj1[item.city] = item.pic;
          obj.value[item.name].push(obj1);
        } else {
          // var obj1 = {};
          obj1[item.city] = item.pic;
          obj.value[item.name] = [obj1];
        }
      });
      // console.log(obj);
      activities.value = [];
      for (var k in obj.value) {
        // console.log(k, obj[k]);
        var obj1 = { content: "", timestamp: [] };
        obj1.content = k;
        obj.value[k].forEach((item) => {
          // console.log(item);
          obj1.timestamp.push(item);
        });
        activities.value.push(obj1);
      }
    }
  });
};
getgocity(store.state.userInfo.username);
getPublishArticle(store.state.userInfo.username);
const exit = () => {
  isexit.value = true;
  // router.push("/login");
  // sessionStorage.clear();
  // window.location.reload();
};
const isexits = () => {
  router.push("/login");
  sessionStorage.clear();
};
</script>

<style lang="scss" scoped>
:deep(.el-icon) {
  display: initial;
}
svg {
  display: inline-block;
  width: 22px;
  height: 22px;
  margin-left: 5px;
}
.word {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #000;
  background-image: url("../assets/images/bg3.jpg");
  color: #fff;
}
.potitle {
  position: absolute;
  top: 98px;
  right: 150px;
  display: inline-block;
  font-size: 20px;
  font-weight: 700;
  width: 200px;
  height: 50px;
  i {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: coral;
    margin: 0 10px;
  }
}
.defaultbox {
  width: 70%;
  height: 58.8px;
  border-bottom: #d6d6d6 1px solid;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 30%;
  font-size: 18px;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.12);
  li {
    cursor: pointer;
  }
}
.entir {
  height: 100%;
  background-color: #000;
  background: url("../assets/images/bg3_ico.png") no-repeat,
    url("../assets/images/bg3.jpg") repeat;
  background-position: 50% 20%;
  margin-bottom: 30px;
}
.banner {
  margin-top: 0;
}
textarea {
  padding: 12px;
  border-color: #ccc;
  color: #656464;
  resize: none;
}
.inputsay {
  width: 260px;
  height: 40px;
  margin-top: 15px;
}
.col {
  position: relative;
  width: 32%;
  min-height: 550px;
  color: #656464;
  text-align: center;
  background-color: #fff;
  padding: 0 10px;
  padding-bottom: 50px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.05);
  border: #e2e2e2 1px solid;
  span {
    margin: 25px 0;
    display: block;
    width: 100%;
    height: 20px;
    font-size: 14px;
    color: #b8a12e;
  }
  .introduce {
    height: 35px;
    margin: 15px 0;
  }
}
.rightcol {
  width: 58%;
}
.userInfo {
  margin-top: 15px;
  .top {
    .xunzhangtext {
      margin-left: 50px;
    }
    width: 94%;
    height: 105px;
    background-color: #fff;
    padding: 17px 25px;
    font-size: 17px;
    color: #656464;
    margin-bottom: 20px;
    // text-align: center;
    strong {
      color: #000;
      font-size: 20px;
    }
  }
}
.xunzhang {
  width: 100%;
  height: 62px;
  margin-top: 15px;
  margin-left: 50px;
  cursor: pointer;
  dt {
    float: left;
    width: 20%;
  }
  dd {
    width: 20%;
    height: 62px;
    float: left;
    margin-right: 5px;
  }
  svg {
    width: 80px;
    height: 60px;
  }
}
.userpic {
  position: absolute;
  top: -10%;
  left: 35%;
  width: 120px;
  height: 120px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    cursor: pointer;
  }
}
.name {
  margin-top: 85px;
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #656464;
  font-size: 20px;
}
.detail {
  width: 100%;
  height: 110px;
  svg {
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
  li {
    display: flex;
    height: 30px;
    width: 100%;
    line-height: 30px;
    margin-top: 10px;
  }
}
.body {
  width: 100%;
  // height: 600px;
  background-color: #fff;
}
.body:last-child {
  margin-bottom: 20px;
}
.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  margin-bottom: 30px;
  margin-left: 30px;
}
.coverImg {
  width: 100%;
  height: 400px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.bodytext {
  width: 100%;
  padding: 15px;
}
.mid {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 15px;
  color: #656464;
  margin: 15px 0;
  .liulan,
  .xihuan {
    display: flex;
    align-items: center;
    margin-right: 15px;
  }
  span {
    margin-left: 5px;
  }
}
.bottomLike {
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 70px;
  height: 46px;
  span {
    margin-right: 5px;
  }
}
.userLike {
  margin-top: 5px;
}
.el-col:last-child {
  margin-bottom: 30px;
}
.el-col {
  margin-top: 5px;
  cursor: pointer;
}
.image {
  width: 440px;
  height: 300px;
}
.lazy {
  width: 100%;
  height: 300px;
  background-color: #fff;
  h3 {
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
  }
}
.botom {
  padding: 17px 25px;
  width: 94%;
  background-color: #fff;
  height: 100%;
  margin-bottom: 30px;
  min-height: 350px;
  li {
    float: none;
  }
  p {
    font-size: 22px;
    color: #000;
  }
  h3 {
    font-size: 18px;
    font-weight: 300;
  }
}
.imghh {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-right: 5px;
}
.citypic {
  width: 100%;
  min-height: 30px;
  margin-top: 5px;
}
.exit {
  position: absolute;
  top: 554px;
  right: 160px;
}
.boxsaying {
  display: flex;
  margin: 40px;
  margin-bottom: 10px;
  margin-top: 20px;
  .un {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 20px;
  }
  .cn {
    height: 50px;
    // display: flex;
    font-size: 20px;
    line-height: 48px;
    input {
      border: none;
    }
  }
}
</style>
