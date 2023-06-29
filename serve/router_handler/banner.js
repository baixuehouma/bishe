const db = require("../db/index");
const fs = require("fs");
const path = require("path");
// 获取banner
exports.getBanner = (req, res) => {
  const sql = `select * from banner`;
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 200,
      message: "获取成功！",
      data: results,
    });
  });
};

// 添加banner图片
exports.addBanner = (req, res) => {
  const files = req.file;
  const pathFiles = path.join(__dirname, "../public/img/", files.originalname);
  fs.readFile(files.path, (err, data) => {
    if (err) return res.cc(err);
    fs.writeFile(pathFiles, data, (err) => {
      if (err) return res.cc(err);
    });
  });
  res.send({
    status: 200,
    message: "上传成功！",
    url: `/img/${files.originalname}`,
  });
};

exports.getSmallBanner = (req, res) => {
  const sql = `select * from smallBanner`;
  db.query(sql, (err, results) => {
    if (err) return res.cc(err.message);
    res.send({
      status: 200,
      message: "获取成功！",
      data: results,
    });
  });
};

// 发表文章
exports.publishArticle = (req, res) => {
  const articleInfo = req.body;
  const sql = `insert into article set?`;
  db.query(sql, articleInfo, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("发布失败！");
    res.send({
      status: 200,
      message: "发布成功！",
    });
  });
};
