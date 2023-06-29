<template>
  <div class="loginPage">
    <div class="allbox" v-show="showBox">
      <div class="loginBox">
        <el-form
          ref="LoginRuleFormRef"
          :model="LoginForm"
          status-icon
          :rules="LoginRules"
          class="demo-ruleForm"
          label-width="75px"
        >
          <h3 class="loginTitle">登录</h3>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="LoginForm.username" type="text" />
          </el-form-item>
          <el-form-item label="密 码" prop="password">
            <el-input v-model="LoginForm.password" type="password" />
          </el-form-item>
          <el-form-item label-width="18px">
            <el-button
              type="primary"
              :round="true"
              @click="submitLoginForm(LoginRuleFormRef)"
              >登录</el-button
            >
          </el-form-item>
          <a class="gotoreg" href="javascript:;" @click="gotoReg"
            >没有账号？ 去注册一个-></a
          >
        </el-form>
      </div>
      <div class="imgbox">
        <img src="../assets/images/login.png" alt="" />
      </div>
    </div>

    <!-- 注册 -->
    <div class="allbox" v-show="!showBox">
      <div class="imgbox" style="width: 480px">
        <img src="../assets/images/reg.png" alt="" />
      </div>
      <div class="regBox">
        <el-form
          ref="RegRuleFormRef"
          :model="RegForm"
          status-icon
          :rules="RegRules"
          label-width="95px"
        >
          <h3 class="loginTitle">注册</h3>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="RegForm.username" type="text" />
          </el-form-item>
          <el-form-item label="密  码" prop="password">
            <el-input v-model="RegForm.password" type="password" />
          </el-form-item>
          <el-form-item label="确认密码" prop="checkpass">
            <el-input v-model="RegForm.checkpass" type="password" />
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="RegForm.phone" type="text" />
          </el-form-item>
          <el-form-item label="身份号" prop="identity">
            <el-input v-model="RegForm.identity" type="text" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :round="true"
              @click="submitRegForm(RegRuleFormRef)"
              >注册</el-button
            >
          </el-form-item>
          <a href="javascript:;" @click="gotoReg">登录 -></a>
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
import { validateSfz } from "../sfh.js";
const router = useRouter();
const store = useStore();
const showBox = ref(true);
// 点击跳转注册页面
const gotoReg = () => {
  showBox.value = !showBox.value;
  console.log(showBox.value);
};
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
  //   console.log(LoginRuleFormRef.value.validate);
  LoginRuleFormRef.value.validate((valid) => {
    // console.log(valid);
    // console.log(LoginForm);
    if (valid) {
      login.login(qs.stringify(LoginForm)).then(({ data }) => {
        if (data.status === 200) {
          store.commit("setUserInfo", { username: LoginForm.username });
          localStorage.setItem("token", data.token);
          router.push("/center");
          ElMessage({
            message: "登录成功！",
            type: "success",
          });
        } else {
          ElMessage.error("账号或密码错误！");
        }
      });
    }
  });
};

// RegForm 注册表单信息
const RegForm = reactive({
  username: "",
  password: "",
  checkpass: "",
  phone: "",
  identity: "",
});
// RegRuleFormRef
const RegRuleFormRef = ref(FormInstance);
// RegRules 注册规则自动验证
const validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("密码不能为空"));
  } else {
    if (RegForm.checkpass !== "") {
      if (!RegRuleFormRef.value) return;
      RegRuleFormRef.value.validateField("checkpass", () => null);
    }
    callback();
  }
};
const validatePass2 = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== RegForm.password) {
    callback(new Error("两次密码不一致！"));
  } else {
    callback();
  }
};
const RegRules = reactive({
  username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  password: [
    { required: true, validator: validatePass, trigger: "blur" },
    { min: 6, max: 12, message: "密码在6~12位之间", trigger: "blur" },
  ],
  phone: [
    { required: true, trigger: "blur" },
    { min: 11, max: 11, message: "请输入11位手机号码", trigger: "blur" },
  ],
  identity: [{ required: true, validator: validateSfz, trigger: "blur" }],
  checkpass: [{ required: true, validator: validatePass2, trigger: "blur" }],
});
// 注册按钮
const submitRegForm = () => {
  RegRuleFormRef.value.validate((valid) => {
    if (valid) {
      login.regUser(qs.stringify(RegForm)).then(({ data }) => {
        if (data.status === 200) {
          ElMessage({
            message: "注册成功！请登录",
            type: "success",
          });
          gotoReg();
          RegForm.username = "";
          RegForm.password = "";
          RegForm.checkpass = "";
          RegForm.phone = "";
          RegForm.identity = "";
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
  margin-top: 50px;
}
.loginPage {
  width: 100vw;
  height: 100vh;
  //   background: url("../assets/images/bg.jpg");
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: skyblue;
  background-image: linear-gradient(to top, #cbeaf7, #d0e5ee);
  // background: url("../assets/images/bg.webp");
  // background-size: cover;
}
.loginBox {
  width: 300px;
  height: 480px;
  position: relative;
  // border: 2px solid #000;
  background-color: #fff;
  padding: 20px 20px 0 10px;
}
.el-button {
  //   margin: 5px 10px 0 100px;
  flex: 1;
  margin-top: 15px;
}
.el-form-item {
  margin-top: 8px;
}
a {
  float: right;
  font-size: 14px;
}
.regBox {
  width: 370px;
  height: 480px;
  position: relative;
  // border: 2px solid #000;
  background-color: #fff;
  padding: 20px 20px 0 10px;
}
.allbox {
  box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.3);
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
      object-fit: cover;
    }
  }
}
.gotoreg {
  font-size: 12px;
  color: #999;
  position: absolute;
  bottom: 50px;
  right: 15px;
}
</style>
