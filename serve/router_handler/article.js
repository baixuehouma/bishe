const db = require("../db/index");
exports.getArticle = (req, res) => {
  const username = req.query.username + "";
  const sql = `SELECT * FROM article LEFT JOIN 
  (SELECT * FROM isLike WHERE username = ?) AS b
  ON article.id=b.articleid`;
  db.query(sql, [username], (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 200,
      message: "获取成功！",
      data: results,
    });
  });
};

exports.changeLikeCount = (req, res) => {
  const info = req.body;
  const sql = `update article set likeCount=? where id=?`;
  db.query(sql, [info.likeCount, info.id], (err, results) => {
    if (err) return err;
    if (results.affectedRows !== 1) return;
    res.send({
      status: 200,
      message: "更新成功！",
    });
  });
};

exports.changeIsLike = (req, res) => {
  const sql = `select * from isLike where articleid=? and username=?`;
  db.query(sql, [req.body.articleid, req.body.username], (err, results) => {
    if (err) return res.cc(err);
    if (results.length > 0) {
      const sql = `update isLike set islike=? where articleid=? and username=?`;
      db.query(
        sql,
        [req.body.islike, req.body.articleid, req.body.username],
        (err, results) => {
          if (err) return res.cc(err);
          if (results.affectedRows !== 1) return res.cc("no");
          res.send({
            status: 200,
            message: "点赞成功！",
          });
        }
      );
    } else if (results.length == 0) {
      const sql = `insert into isLike set ?`;
      db.query(sql, [req.body], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) {
          return res.cc("失败，请稍后再试");
        }
        res.send("ok");
      });
    }
  });
};

exports.getArticleById = (req, res) => {
  // res.send("ok");
  const id = req.query.id;
  const sql = `select * from article where id=?`;
  db.query(sql, id, (err, results) => {
    if (err) return res.cc(err);
    res.send({ status: 200, message: "获取成功！", data: results });
  });
};

exports.editArticleById = (req, res) => {
  const sql = `update article set? where id=?`;
  db.query(sql, [req.body, req.body.id], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("修改失败！");
    res.send({
      status: 200,
      message: "修改成功！",
    });
  });
};

exports.publicSaying = (req, res) => {
  const sql = `insert into saying set ?`;
  db.query(sql, [req.body], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return;
    res.send({
      status: 200,
      message: "ok",
    });
  });
};

exports.getSaying = (req, res) => {
  const sql = `select * from saying where user=?`;
  db.query(sql, req.query.user, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 200,
      data: results,
    });
  });
};

exports.getlikeArticle = (req, res) => {
  const username = req.query.username + "";
  const sql = `SELECT * FROM article WHERE id IN (
    SELECT articleid FROM islike WHERE username=? AND islike='1') `;
  db.query(sql, username, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 200,
      data: results,
    });
  });
};

exports.getarticlePublishBymyself = (req, res) => {
  const username = req.query.username + "";
  const sql = `select * from article where userid = ?`;
  db.query(sql, username, (err, results) => {
    if (err) return res.cc(err);
    if (results.length == 0)
      return res.send({ status: 100, message: "没有发布过哦！" });
    res.send({
      status: 200,
      data: results,
    });
  });
};

exports.getFullArticle = (req, res) => {
  const sql = `select * from article`;
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 200,
      data: results,
    });
  });
};

exports.updateIsExamine = (req, res) => {
  const sql = "UPDATE article SET isexamine=? WHERE id=?";
  db.query(sql, [req.body.judgenum, req.body.id], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows != 1) {
      return res.cc("更改失败！");
    }
    res.send({
      status: 200,
      message: "更改成功！",
    });
  });
};
