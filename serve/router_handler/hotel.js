const db = require("../db/index");
const path = require("path");
const fs = require("fs");
exports.getHotelMessageByname = (req, res) => {
  const hotelname = req.query.name + "";
  const sql = `select * from hotel where county=?`;
  db.query(sql, [hotelname], (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 200,
      data: results,
    });
  });
};

exports.getHotelMessage = (req, res) => {
  const name = req.query.name + "";
  const sql = `select * from hotel where hotelname=?`;
  db.query(sql, [name], (err, resutls) => {
    if (err) return res.cc(err);
    res.send({
      status: 200,
      message: "获取成功!",
      data: resutls,
    });
  });
};

exports.gethotelAssess = (req, res) => {
  const name = req.query.name + "";
  const sql = `select *,(tools+hygienism+service)/3 as average from assess where hotelname=?`;
  db.query(sql, [name], (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 200,
      data: results,
    });
  });
};

exports.addAssess = (req, res) => {
  const form = req.body;
  const sql = `SELECT * FROM assess WHERE username=? AND hotelname=?`;
  db.query(sql, [form.username, form.hotelname], (err, results) => {
    if (err) return res.cc(err);
    if (results.length == 0) {
      const sql = `insert assess set ?`;
      db.query(sql, [form], (err, results) => {
        if (err) return res.cc(err);
        res.send({
          status: 200,
          message: "点评成功！",
        });
      });
    } else {
      const sql = `update assess set ? WHERE username=? AND hotelname=?`;
      db.query(sql, [form, form.username, form.hotelname], (err, results) => {
        if (err) return res.cc(err);
        res.send({
          status: 100,
          message: "修改评论成功！",
        });
      });
    }
  });
};

exports.getAVG = (req, res) => {
  const sql = `SELECT AVG(service)AS avg1,AVG(hygienism) AS avg2,AVG(tools) AS avg3 FROM assess WHERE hotelname=?`;
  db.query(sql, [req.query.name], (err, results) => {
    if (err) return res.cc(err);
    res.send({ status: 200, data: results });
  });
};

exports.bookhotel = (req, res) => {
  const sql = `insert bookhotel set ?`;
  db.query(sql, [req.body], (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 200,
      message: "预定成功！",
    });
  });
};

exports.getbook = (req, res) => {
  const sql = `select * from bookhotel`;
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 200,
      data: results,
    });
  });
};

exports.getbookbyhotelname = (req, res) => {
  const sql = `select * from bookhotel where hotelname=?`;
  db.query(sql, [req.query.hotelname], (err, results) => {
    if (err) return res.cc(err);
    res.send({ status: 200, data: results });
  });
};

exports.buyroom = (req, res) => {
  const sql = `update bookhotel set isbuy=? where id=?`;
  db.query(sql, [req.body.isbuy, req.body.id], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows != 1) {
      return res.cc("预定失败！");
    }
    res.send({
      status: 200,
      message: "预定成功！",
    });
  });
};

// 添加图片
exports.addhotelpic = (req, res) => {
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

exports.addhotel = (req, res) => {
  const sql = `insert into hotel set ?`;
  db.query(sql, [req.body], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows != 1) {
      return res.cc("添加酒店失败！");
    }
    res.send({
      status: 200,
      message: "添加酒店成功！",
    });
  });
};

exports.updateAssess = (req, res) => {
  const sql = `UPDATE hotel SET assess = assess+1 WHERE hotelname=?`;
  db.query(sql, [hotelname], (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 200,
      message: "更改成功！",
    });
  });
};

exports.selecthotel = (req, res) => {
  const cityname = "%" + req.body.city + "%";
  const sql = `SELECT * FROM hotel WHERE city LIKE ?`;
  db.query(sql, [cityname], (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 200,
      data: results,
    });
  });
};

exports.getFullhotel = (req, res) => {
  const sql = `select * from hotel`;
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 200,
      data: results,
    });
  });
};

// 修改酒店信息
exports.updateHotel = (req, res) => {
  const sql = `update hotel set ? where hotelname=?`;
  db.query(sql, [req.body, req.body.hotelname], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows != 1) {
      return res.cc("修改失败！");
    }
    res.send({
      status: 200,
      message: "修改成功！",
    });
  });
};

// 删除酒店
exports.removehotel = (req, res) => {
  const sql = `delete from hotel where hotelname=?`;
  db.query(sql, [req.body.name], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows != 1) {
      return res.cc("删除失败！");
    }
    res.send({
      status: 200,
      message: "删除成功！",
    });
  });
};

// 管理酒店 入住/退房
exports.isCheck = (req, res) => {
  const sql = `update bookhotel set ischeck=? where id=?`;
  db.query(sql, [req.body.ischeck, req.body.id], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows != 1) {
      return res.cc("管理失败！");
    }
    res.send({
      status: 200,
      message: "管理成功！",
    });
  });
};
