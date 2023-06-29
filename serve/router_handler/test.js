const db = require("../db/index");
exports.test = (req, res) => {
  const sql = `update hotel set room=? where id=1`;
  db.query(sql, [req.body.room], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) {
      return res.cc("no");
    }
    res.send({
      status: 200,
      data: results,
    });
  });
};
