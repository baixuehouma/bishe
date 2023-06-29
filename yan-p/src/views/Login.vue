<template>
  <div class="loginPage">
    <div class="allbox">
      <div class="imgbox">
        <img src="../assets/img/login.png" alt="" />
      </div>
      <div class="loginBox">
        <el-form
          ref="LoginRuleFormRef"
          :model="LoginForm"
          status-icon
          :rules="LoginRules"
          class="demo-ruleForm"
        >
          <h3 class="loginTitle">后台登录</h3>
          <el-form-item label="账号" prop="username">
            <el-input v-model="LoginForm.username" type="text" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="LoginForm.password" type="password" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :round="true"
              @click="submitLoginForm(LoginRuleFormRef)"
              >login</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import login from "../api/login";
import qs from "qs";
import { useRouter } from "vue-router";
import { FormInstance, FormRules, ElMessage } from "element-plus";
import { useStore } from "vuex";
const router = useRouter();
const store = useStore();
// LoginRuleFormRef
const LoginRuleFormRef = ref();
// LoginForm 登录表单信息
const LoginForm = reactive({
  username: "",
  password: "",
});
// 自动验证规则校验 LoginRules
const LoginRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

// 登录按钮
const submitLoginForm = () => {
  LoginRuleFormRef.value.validate((valid) => {
    // console.log(valid);
    // console.log(LoginForm);
    if (valid) {
      login.LoginManager(qs.stringify(LoginForm)).then(({ data }) => {
        if (data.status === 200) {
          store.commit("setUserInfo", LoginForm.username);
          localStorage.setItem("token", data.token);
          router.push("/center");
          ElMessage({
            message: "登录成功！",
            type: "success",
          });
        } else if (data.status == 100) {
          ElMessage.error("该用户不是管理员！");
        } else {
          ElMessage.error("账号或密码错误！");
        }
      });
    }
  });
};
</script>

<style scoped lang="scss">
.loginTitle {
  font-size: 26px;
  text-align: center;
  margin-bottom: 30px;
  margin-top: 70px;
}
.el-form-item {
  margin-top: 8px;
}
.loginPage {
  width: 100vw;
  height: 100vh;
  //   background: url("../assets/images/bg.jpg");
  display: flex;
  justify-content: center;
  align-items: center;
  // background: url("../assets/img/bg.png");
  // background: #ddf0d7;
  background-size: 100%;
  background-image: linear-gradient(to top, #cbeaf7, #74b1f3);
}
.allbox {
  box-shadow: 8px 8px 10px rgba(0, 0, 0, 0.3);
  width: 850px;
  height: 500px;
  display: flex;
  background-color: #fff;
  .imgbox {
    width: 540px;
    height: 100%;
    background-color: #f7f7f7;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
.loginBox {
  width: 320px;
  height: 480px;
  position: relative;
  // border: 2px solid #000;
  background-color: #fff;
  padding: 20px 20px 0 10px;
}
.el-button {
  //   margin: 5px 10px 0 100px;
  flex: 1;
}
a {
  float: right;
  font-size: 14px;
}
</style>
