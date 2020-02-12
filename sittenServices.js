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
    pool
        .query("SELECT * FROM users")
        .then(res => {
            callback(res.rows);
        })
        .catch(error => {
            console.log(error.stack);
        })
};

const getPerson = (id, callback) => {
    pool
        .query("SELECT * FROM users WHERE id = $1",
            [id])
        .then(res => {
            callback(res.rows)
        })
        .catch(error => {
            console.log(error.stack);
        })
};

const createPerson = (nimi, sposti, kaupunki, callback) => {
    pool
        .query("INSERT INTO users (nimi, sposti, kaupunki) VALUES ($1, $2, $3)",
            [nimi, sposti, kaupunki])
        .then(res => {
            callback(`New user ${nimi} created`)
        })
        .catch(error => {
            console.log(error.stack);
        })
}

const deletePerson = (id, callback) => {
    pool
        .query("DELETE FROM users WHERE id=$1",
            [id])
        .then(res => {
            callback(`ID ${id} deleted!!`)
        })
        .catch(error => {
            console.log(error.stack);
        })
}

const updatePerson = (nimi, sposti, kaupunki, id, callback) => {
    pool
        .query("UPDATE users SET nimi=$1, sposti=$2, kaupunki=$3 WHERE id=$4", [nimi, sposti, kaupunki, id])
        .then(res => {
            callback(`${nimi} updated.`)
        })
        .catch(error => {
            console.log(error.stack);
        })
}

module.exports = { getPeople, getPerson, createPerson, deletePerson, updatePerson }