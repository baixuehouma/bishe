const express = require("express");
const router = express.Router();

const userHandler = require("../router_handler/user");
const expressJoi = require("@escook/express-joi");
const getBanner = require("../router_handler/banner");
const articleHandle = require("../router_handler/article");
const { reg_login_schema } = require("../schema/user");

// 注册用户
router.post("/reguser", userHandler.regUser);

// 登录
router.post("/login", expressJoi(reg_login_schema), userHandler.login);

// 获取banner
router.get("/banner", getBanner.getBanner);

// 获取smallBanner
router.get("/smallbanner", getBanner.getSmallBanner);

// 获取文章信息
router.get("/getMessage", articleHandle.getArticle);

router.post("/loginmanager", userHandler.ismanageUser);

router.get("/getfullmessage", articleHandle.getFullArticle);

module.exports = router;
