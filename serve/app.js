const express = require("express");
const app = express();
const cors = require("cors");
const joi = require("joi");
const config = require("./config");
const expressJwt = require("express-jwt");

// 用户注册登录模块
const userRouter = require("./router/user");
const bannerRouter = require("./router/banner");

// res.cc
app.use(function (req, res, next) {
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

// 托管静态资源文件
app.use(express.static("./public"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(
  expressJwt({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] })
);

// 登录注册 轮播图 文章信息
app.use("/api", userRouter);
// 添加轮播图
app.use("/high", bannerRouter);

// 错误中间件
app.use((err, req, res, next) => {
  if (err instanceof joi.ValidationError) return res.cc(err);
  if (err.name === "UnauthorizedError") return res.cc("身份认证失败！");
});

app.listen(3007, function () {
  console.log("api server running at http://127.0.0.1:3007");
});
