let db = require('./db');

let users_db = {
    getAllUsers: async function(name, surname, email){
        let res = await db.executeQuery('SELECT users.id FROM users '
            + 'WHERE name::text LIKE $1 AND surname::text LIKE $2 AND email::text LIKE $3;', [name, surname, email]);

        return res.rows.map((x) => {
            return x.id;
        });
    },
    getUserById: async function(userId){
        let res = await db.executeQuery("SELECT id, username, name, surname, email FROM users WHERE id = $1", [userId]);
        return res.rows[0];
    },
    createNewUser: async function(username, name, surname, email){
        let res = await db.executeQuery('INSERT INTO users (username, name, surname, email) VALUES ($1, $2, $3, $4) RETURNING id', [username, name, surname, email]);
        let user_id = res.rows[0].id;
        return user_id;
    },
    deleteUser: async function(userId){
        // When the user is successfully deleted it returns true.
        let response_message = await db.executeQuery("DELETE FROM users WHERE id=$1", [userId]);
        return true;
    },
    getExamsPerStudent: async function(userId){
        let res = await db.executeQuery(
        "SELECT e.id "+
        "FROM exams e "+
        "INNER JOIN exam_students es "+
        "ON es.exam_id = e.id "+
        "WHERE es.student_id = $1; ", [userId]);
        
        let result = [];
        for (let i = 0; i<res.rows.length; i++){
            result.push(res.rows[i].id);
        }
        return result;
    },
    getExamsPerTeachingAssistant: async function (userId){
        let res = await db.executeQuery(
            "SELECT e.id "+
            "FROM exams e "+
            "INNER JOIN exam_tas et "+
            "ON et.exam_id = e.id "+
            "WHERE et.ta_id = $1; ", [userId]);
        
        let result = [];
        for (let i = 0; i<res.rows.length; i++){
            result.push(res.rows[i].id);
        }
        return result;
    }
};

module.exports = users_db;
/*
CREATE TABLE users (
    id SERIAL not null,
    name varchar(70) not null,
    surname varchar(70) not null,
    email varchar(70) not null,
    primary key(id)
);
*/
