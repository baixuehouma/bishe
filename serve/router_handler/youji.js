const db = require("../db/index");
exports.getYouji = (req, res) => {
  const sql = `select * from youji`;
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 200,
      message: "获取成功！",
      data: results,
    });
  });
};

exports.getYoujiById = (req, res) => {
  const sql = `select * from youji where id =?`;
  db.query(sql, [req.query.id], (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 200,
      message: "获取成功！",
      data: results,
    });
  });
};

exports.getgocity = (req, res) => {
  const username = req.query.username + "";
  console.log(username);
  const sql = `SELECT * FROM (SELECT COUNT(userid) AS youjiID FROM article WHERE userid=?)a JOIN (SELECT gocity FROM users WHERE username=?)b`;
  db.query(sql, [username, username], (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 200,
      data: results,
    });
  });
};
