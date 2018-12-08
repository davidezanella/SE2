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
    deleteUser: async function(id){
        // When the user is successfully deleted it returns true.
        let response_message = await db.executeQuery("DELETE FROM users WHERE id=$1", [id]);
        return true;
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
