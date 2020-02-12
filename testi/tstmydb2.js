const Pool = require('pg').Pool;

const conopts = {
    user: "postgres",
    password: "SalaSana",
    host: "localhost",
    database: "harjoitus2"
}

const pool = new Pool(conopts);
let lisaa = "INSERT INTO users (nimi, sposti, kaupunki) VALUES ($1, $2, $3)"
let lisat = ['Kaisa', 'kaisa@mail.com', 'Vantaa'];

let hae = "SELECT * FROM users";

pool.connect((err, client) => {
    client.query(hae, (error, result) => {
        if (error) {
            client.release();
            throw error;
        }
        console.log(result.rows);
    })
});