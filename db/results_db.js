let db = require('./db');

let results_db = {
  getAllResults: async function(exam, user) {
    let query = 'SELECT results.id FROM results ';
    let params = [];
    if (exam !== null) {
      params.push(exam);
      query = query + " WHERE exam_id = $1 ";
    }
    if (user !== null) {
      params.push(user);
      if (params.length == 2)
        query = query + " AND user_id = $2 ";
      else
        query = query + " WHERE user_id = $1 ";
    }
    query += ";";
    let res = await db.executeQuery(query, params);

    return res.rows.map((x) => {
      return x.id;
    });
  },
};

module.exports = results_db;
