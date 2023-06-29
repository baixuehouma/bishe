const db = require("../db/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const config = require("../config");

exports.regUser = (req, res) => {
  const userinfo = req.body;
  // console.log(req.body);
  const sql = "select * from users where username=?";
  db.query(sql, [userinfo.username], function (err, results) {
    if (err) {
      return res.cc(err);
    }
    if (results.length > 0) {
      return res.cc("用户名被占用，请更换再试");
    }
    // res.send("ok");
    // 加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10);
    const sql = "insert into users set ?";
    db.query(
      sql,
      {
        username: userinfo.username,
        password: userinfo.password,
        phone: userinfo.phone,
        identity: userinfo.identity,
      },
      function (err, results) {
        if (err) return res.send({ status: 1, message: err.message });
        if (results.affectedRows !== 1) {
          return res.cc("注册用户失败，请稍后再试");
        }
        res.send({
          status: 200,
          message: "注册成功！",
        });
      }
    );
  });
  //   res.send("reg ok");
};

exports.login = (req, res) => {
  const userinfo = req.body;
  const sql = "select * from users where username=?";
  db.query(sql, userinfo.username, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("登录失败！");
    const compareResult = bcrypt.compareSync(
      userinfo.password,
      results[0].password
    );
    if (!compareResult) {
      return res.cc("登录失败！");
    }
    const user = { ...results[0], password: "", pic: "" };
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: "10h",
    });
    res.send({
      status: 200,
      message: "登录成功！",
      token: "Bearer " + tokenStr,
    });
  });
};

exports.getUserInfo = (req, res) => {
  const sql = `select * from users where username=?`;
  db.query(sql, [req.query.username], (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 200,
      message: "获取成功！",
      data: results,
    });
  });
};

exports.updateUserInfo = (req, res) => {
  const sql = `update users set ? where username=?`;
  db.query(sql, [req.body, req.body.username], (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 200,
      message: "更改成功！",
      data: results,
    });
  });
};

exports.addUserPic = (req, res) => {
  const files = req.file;
  // console.log(files);
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

exports.ismanageUser = (req, res) => {
  const name = req.body.username + "";
  const sql = `select * from users where username=? and ismanager=1`;
  db.query(sql, [name], (err, results) => {
    if (err) return res.cc(err);
    if (results.length == 0) {
      res.send({ status: 100, message: "该用户不是管理员！" });
      return;
    }
    const compareResult = bcrypt.compareSync(
      req.body.password,
      results[0].password
    );
    if (!compareResult) {
      return res.cc("登录失败！");
    }
    const user = { ...results[0], password: "", pic: "" };
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: "10h",
    });
    res.send({
      status: 200,
      message: "登录成功！",
      token: "Bearer " + tokenStr,
    });
  });
};

exports.getFullUser = (req, res) => {
  const sql = `select * from users`;
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 200,
      data: results,
    });
  });
};

exports.updateIsManager = (req, res) => {
  const username = req.body.username + "";
  const sql = `update users set ismanager=? where username=?`;
  db.query(sql, [req.body.managernum, username], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows != 1) {
      return res.cc("设为管理失败！");
    }
    res.send({
      status: 200,
      message: "设为管理成功！",
    });
  });
};

exports.updateIsbadge = (req, res) => {
  if (req.body.isbdge == 1) {
    const sql = `update users set isbdge=isbdge+1 where username=?`;
    db.query(sql, [req.body.username], (err, results) => {
      if (err) return res.cc(err);
      res.send({
        status: 200,
        message: "更改成功！",
      });
    });
  } else if (req.body.isbdge == 0) {
    const sql = `update users set isbdge=0 where username=?`;
    db.query(sql, [req.body.username], (err, results) => {
      if (err) return res.cc(err);
      res.send({
        status: 200,
        message: "更改成功！",
      });
    });
  }
};

exports.shequ = (req, res) => {
  // const question = req.query.question +""
  const sql = `select * from shequ`;
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 200,
      data: results,
    });
  });
};

exports.publishQue = (req, res) => {
  const sql = `update shequ set isuse=0`;
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    const sql = `insert shequ set ?`;
    db.query(sql, [req.body], (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows != 1) {
        return res.cc("发布问题失败！");
      }
      res.send({ status: 200, message: "发布成功！" });
    });
  });
};

exports.publishAns = (req, res) => {
  const sql = `insert answer set ?`;
  db.query(sql, [req.body], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows != 1) {
      return res.cc("发布失败！");
    }
    res.send({ status: 200, message: "发布成功！" });
  });
};

exports.addAns = (req, res) => {
  // console.log(req.body);
  const sql = `update answer set children=? where id=?`;
  db.query(sql, [req.body.children, req.body.id], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows != 1) {
      return res.cc("评论失败！");
    }
    res.send({ status: 200, message: "评论成功！", data: results });
  });
};

exports.getAns = (req, res) => {
  const sql = `select * from answer`;
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    res.send({ status: 200, data: results });
  });
};

exports.setIsuse = (req, res) => {
  // console.log(req.body);
  const sql = `update shequ set isuse=0 `;
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    const sql = `update shequ set isuse=? where id=?`;
    db.query(sql, [req.body.isuse, req.body.id], (err, results) => {
      if (err) return res.cc(err);
      res.send({ status: 200, message: "ok", data: results });
    });
  });
};

exports.getrecentData = (req, res) => {
  const sql = `SELECT DATE_FORMAT(pdate,'%Y-%m-%d')dates, COUNT(*) COUNT FROM (SELECT * FROM answer WHERE DATE_SUB(CURDATE(),INTERVAL 7 DAY)<=pdate) AS v GROUP BY dates`;
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 200,
      data: results,
    });
  });
};
// 添加图片
exports.addgocityPic = (req, res) => {
  // console.log("scl");
  // console.log(req.file);
  const files = req.file;
  const pathFiles = path.join(
    __dirname,
    "../public/img/newimg/",
    files.originalname
  );
  fs.readFile(files.path, (err, data) => {
    if (err) return res.cc(err);
    fs.writeFile(pathFiles, data, (err) => {
      if (err) return res.cc(err);
    });
  });
  res.send({
    status: 200,
    message: "上传成功！",
    url: `/img/newimg/${files.originalname}`,
  });
};

exports.updategocity = (req, res) => {
  const sql = `update users set gocity=? where username=?`;
  // console.log(req.body);
  db.query(sql, [req.body.gocity, req.body.username], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows != 1) {
      return res.cc("修改失败！");
    }
    res.send({ status: 200, message: "修改成功！" });
  });
};
