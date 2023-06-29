import axios from "./api";
const baseApi = "http://127.0.0.1:3007";

const LoginManager = (body) => {
  return axios.post("/api/loginmanager", body);
};
const getMessage = () => {
  return axios.get("/api/getfullmessage");
};
const updateIsExamine = (body) => {
  return axios.post("/high/updateIsExamine", body);
};
const getFullUsers = () => {
  return axios.get("/high/getfullusers");
};
const addmanager = (body) => {
  return axios.post("/high/addmanager", body);
};
const getbook = () => {
  return axios.get("/high/getbook");
};
const buyroom = (body) => {
  return axios.post("/high/buyroom", body);
};
const email = (body) => {
  return axios.post("/high/updateIsbadge", body);
};
const addhotel = (body) => {
  return axios.post("/high/addhotel", body);
};
const getFullhotel = () => {
  return axios.get("/high/getfullhotel");
};
const getHotelbyname = (params) => {
  return axios.get("/high/gethotelM?" + params);
};
const updateHotel = (body) => {
  return axios.post("/high/updatehotel", body);
};
const removehotel = (body) => {
  return axios.post("/high/removehotel", body);
};
const isCheck = (body) => {
  return axios.post("/high/ischeck", body);
};
const publishQue = (body) => {
  return axios.post("/high/publishque", body);
};
const getQue = () => {
  return axios.get("/high/shequ");
};
const setisuse = (body) => {
  return axios.post("/high/setisuse", body);
};
const getrecentdata = () => {
  return axios.get("/high/getrecentdata");
};
const getbookbyhotelname = (params) => {
  return axios.get("/high/getbookbyhotelname?" + params);
};
const getassess = (params) => {
  return axios.get("/high/getHotelassess?" + params);
};
export default {
  LoginManager,
  getMessage,
  baseApi,
  updateIsExamine,
  getFullUsers,
  addmanager,
  getbook,
  buyroom,
  email,
  addhotel,
  getFullhotel,
  getHotelbyname,
  updateHotel,
  removehotel,
  isCheck,
  publishQue,
  getQue,
  setisuse,
  getrecentdata,
  getbookbyhotelname,
  getassess,
};
