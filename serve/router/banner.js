const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "/uploads" });

const bannerHandler = require("../router_handler/banner");
const likeHandler = require("../router_handler/article");
const hotcityHandler = require("../router_handler/hotcity");
const userHandler = require("../router_handler/user");
const test = require("../router_handler/test");
const YoujiHandler = require("../router_handler/youji");
const hotelHandler = require("../router_handler/hotel");
// 添加banner 图片
router.post("/addBanner", upload.single("img"), bannerHandler.addBanner);
// 添加酒店图片
router.post("/addhotelpic", upload.single("img"), hotelHandler.addhotelpic);
// 添加城市图片
router.post("/addgocityPic", upload.single("img"), userHandler.addgocityPic);
// 更改是否喜欢文章
router.post("/changelike", likeHandler.changeLikeCount);
router.post("/changeislike", likeHandler.changeIsLike);
// 发表文章
router.post("/publisharticle", bannerHandler.publishArticle);
// 热门城市详情
router.get("/gethotcity", hotcityHandler.getHotCity);
router.post("/test", test.test);
router.get("/getarticlebyid", likeHandler.getArticleById);
router.post("/editArticleById", likeHandler.editArticleById);
router.get("/getuserinfo", userHandler.getUserInfo);
router.post("/updateUserinfo", userHandler.updateUserInfo);
router.post("/adduserpic", upload.single("img"), userHandler.addUserPic);
router.get("/getcityviews", hotcityHandler.getCityViews);
router.get("/getyouji", YoujiHandler.getYouji);
router.get("/getYoujiById", YoujiHandler.getYoujiById);
router.get("/getsaying", likeHandler.getSaying);
router.post("/submitsaying", likeHandler.publicSaying);
router.get("/getlikeArticle", likeHandler.getlikeArticle);
router.get("/getPublishArticle", likeHandler.getarticlePublishBymyself);
router.get("/gethotelbyname", hotelHandler.getHotelMessageByname);
router.get("/gethotelM", hotelHandler.getHotelMessage);
router.get("/getHotelassess", hotelHandler.gethotelAssess);
router.post("/addAssess", hotelHandler.addAssess);
router.get("/getsvg", hotelHandler.getAVG);
router.get("/getgocity", YoujiHandler.getgocity);
router.post("/updateIsExamine", likeHandler.updateIsExamine);
router.get("/getfullusers", userHandler.getFullUser);
router.post("/addmanager", userHandler.updateIsManager);
router.post("/bookhotel", hotelHandler.bookhotel);
router.get("/getbook", hotelHandler.getbook);
router.post("/buyroom", hotelHandler.buyroom);
router.post("/updateIsbadge", userHandler.updateIsbadge);
router.post("/addhotel", hotelHandler.addhotel);
router.post("/updateassess", hotelHandler.updateAssess);
router.post("/selectHotel", hotelHandler.selecthotel);
router.get("/getfullhotel", hotelHandler.getFullhotel);
router.post("/updatehotel", hotelHandler.updateHotel);
router.post("/removehotel", hotelHandler.removehotel);
router.post("/ischeck", hotelHandler.isCheck);

router.get("/shequ", userHandler.shequ);
router.post("/publishque", userHandler.publishQue);
router.post("/publishans", userHandler.publishAns);
router.post("/setisuse", userHandler.setIsuse);
router.post("/addans", userHandler.addAns);
router.get("/getans", userHandler.getAns);
router.get("/getrecentdata", userHandler.getrecentData);
router.get("/getbookbyhotelname", hotelHandler.getbookbyhotelname);
router.post("/updategocity", userHandler.updategocity);
module.exports = router;
