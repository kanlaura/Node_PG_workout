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

async function getPeople() {
    let data = await pool.query("SELECT * FROM users")
    return data.rows;
}

async function getPerson(id) {
    let data = await pool.query("SELECT * FROM users WHERE id = $1",
        [id])
    return data.rows;
}

async function createPerson(nimi, sposti, kaupunki) {
    await pool.query("INSERT INTO users (nimi, sposti, kaupunki) VALUES ($1, $2, $3)", [nimi, sposti, kaupunki])
    return (`New user ${nimi} created`)
}

async function deletePerson(id) {
    await pool.query("DELETE FROM users WHERE id=$1", [id])
    return (`ID ${id} deleted!!`)
}

async function addPerson(nimi, sposti, kaupunki, id) {
    await pool.query("UPDATE users SET nimi=$1, sposti=$2, kaupunki=$3 WHERE id=$4", [nimi, sposti, kaupunki, id])
    return (`${nimi} updated.`)
}

module.exports = { getPeople, getPerson, createPerson, deletePerson, addPerson }