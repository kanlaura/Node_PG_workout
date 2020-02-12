var express = require('express');
var router = express.Router();
const Pool = require('pg').Pool;

const conopts = {
    user: "postgres",
    password: "SalaSana",
    host: "localhost",
    database: "harjoitus2"
}

const pool = new Pool(conopts);

const getPeople = (callback) => {
    pool.query("SELECT * FROM users", (err, data) => {
        callback(data.rows);
    })
};

const getPerson = (id, callback) => {
    pool.query("SELECT * FROM users WHERE id = $1",
        [id], (err, data) => {
            callback(data.rows)
        })
};

const createPerson = (nimi, sposti, kaupunki, callback) => {
    pool.query("INSERT INTO users (nimi, sposti, kaupunki) VALUES ($1, $2, $3)",
        [nimi, sposti, kaupunki],
        (err, data) => {
            callback(`New user ${nimi} created`)
        })
}

const deletePerson = (id, callback) => {
    pool.query("DELETE FROM users WHERE id=$1",
        [id], (err, response) => {
            callback(`ID ${id} deleted!!`)
        })
}

const addPerson = (nimi, sposti, kaupunki, id, callback) => {
    pool.query("UPDATE users SET nimi=$1, sposti=$2, kaupunki=$3 WHERE id=$4",
        [nimi, sposti, kaupunki, id],
        (err, response) => {
            callback(`${nimi} updated.`)
        })
}

module.exports = { getPeople, getPerson, createPerson, deletePerson, addPerson }