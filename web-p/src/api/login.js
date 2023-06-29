import axios from "./api";
const baseApi = "http://127.0.0.1:3007";
const login = (body) => {
  return axios.post("/api/login", body);
};
const regUser = (body) => {
  // console.log(body);
  return axios.post("/api/reguser", body);
};
const getBanner = () => {
  return axios.get("/api/banner");
};
const getSmallBanner = () => {
  return axios.get("/api/smallbanner");
};
const getArticle = (params) => {
  return axios.get("/api/getMessage?" + params);
};
const changeLike = (body) => {
  return axios.post("/high/changelike", body);
};
const changeIsLike = (body) => {
  return axios.post("/high/changeislike", body);
};
const publishArticle = (body) => {
  return axios.post("/high/publisharticle", body);
};
const editArticleById = (body) => {
  return axios.post("/high/editArticleById", body);
};
const getUserinfo = (params) => {
  return axios.get("/high/getuserinfo?" + params);
};
const getArticleById = (params) => {
  return axios.get("/high/getarticlebyid?" + params);
};
const getcitydetail = (params) => {
  return axios.get("/high/gethotcity?" + params);
};
// 用
const test = (body) => {
  return axios.post("/high/test", body);
};
const editUser = (body) => {
  return axios.post("/high/updateUserinfo", body);
};
const getViews = (params) => {
  return axios.get("/high/getcityviews?" + params);
};
const getYouji = () => {
  return axios.get("/high/getyouji");
};
const getYoujiById = (params) => {
  return axios.get("/high/getYoujiById?" + params);
};
const submitSaying = (body) => {
  return axios.post("/high/submitsaying", body);
};
const getSaying = (params) => {
  return axios.get("/high/getsaying?" + params);
};
const getlikeArticle = (params) => {
  return axios.get("/high/getlikeArticle?" + params);
};
const getPublishArticle = (params) => {
  return axios.get("/high/getPublishArticle?" + params);
};
const getHotelMessageBycityName = (params) => {
  return axios.get("/high/gethotelbyname?" + params);
};
const getHotelMessage = (params) => {
  return axios.get("/high/gethotelM?" + params);
};
const getHotelAssess = (params) => {
  return axios.get("/high/getHotelassess?" + params);
};
const addAssess = (body) => {
  return axios.post("/high/addAssess", body);
};
const getAVG = (params) => {
  return axios.get("/high/getsvg?" + params);
};
const getgocity = async (params) => {
  return await axios.get("/high/getgocity?" + params);
};
const bookhotel = (body) => {
  return axios.post("/high/bookhotel", body);
};
const getbook = () => {
  return axios.get("/high/getbook");
};
const email = (body) => {
  return axios.post("/high/updateIsbadge", body);
};
const updateassess = (body) => {
  return axios.post("/high/updateAssess", body);
};
const selectHotel = (body) => {
  return axios.post("/high/selectHotel", body);
};
const shequ = () => {
  return axios.get("/high/shequ");
};
const assessp = (body) => {
  return axios.post("/high/publishans", body);
};
const getans = () => {
  return axios.get("/high/getans");
};
const addans = (body) => {
  return axios.post("/high/addans", body);
};
const addgocity = (body) => {
  // console.log(body);
  return axios.post("/high/updategocity", body);
};
export default {
  login,
  regUser,
  getBanner,
  baseApi,
  getSmallBanner,
  getArticle,
  changeLike,
  publishArticle,
  getArticleById,
  test,
  editArticleById,
  getUserinfo,
  editUser,
  getcitydetail,
  getViews,
  getYouji,
  getYoujiById,
  changeIsLike,
  submitSaying,
  getSaying,
  getlikeArticle,
  getPublishArticle,
  getHotelMessageBycityName,
  getHotelMessage,
  getHotelAssess,
  addAssess,
  getAVG,
  getgocity,
  bookhotel,
  getbook,
  email,
  updateassess,
  selectHotel,
  shequ,
  assessp,
  getans,
  addans,
  addgocity,
};
