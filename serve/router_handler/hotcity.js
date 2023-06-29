const db = require("../db/index");
exports.getHotCity = (req, res) => {
  const id = req.query.cityId;
  const sql = `select * from hotcity where cityId= ?`;
  db.query(sql, id, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 200,
      message: "获取成功！",
      data: results,
    });
  });
};
exports.getCityViews = (req, res) => {
  const sql = `select * from views where cityId=?`;
  db.query(sql, [req.query.cityId], (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 200,
      message: "获取成功！",
      data: results,
    });
  });
};
