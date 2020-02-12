// tässä vaihtoehdossa sgl-haut ovat suoraan REST-apissa

var express = require('express');
var router = express.Router();
// var ps = require('../peopleServices');

const Pool = require('pg').Pool;

const conopts = {
    user: "postgres",
    password: "SalaSana",
    host: "localhost",
    database: "harjoitus2"
}

const pool = new Pool(conopts);

router.route('/')
    .get(function (req, res, next) {
        pool.query("SELECT * FROM users", (err, response) => {
            res.json(response.rows)
        })
    })

    .post(function (req, res, next) {
        pool.query("INSERT INTO users (nimi, sposti, kaupunki) VALUES ($1, $2, $3)",
            [req.body.nimi, req.body.sposti, req.body.kaupunki],
            (err, response) => {
                res.json(`New user ${req.body.nimi} created`)
            })
    })

router.route('/:id')
    .get(function (req, res, next) {
        pool.query("SELECT * FROM users WHERE id = $1",
            [req.params.id], (err, response) => {
                res.json(response.rows)
            })
    }) 

    .delete(function (req, res, next) {
        pool.query("DELETE FROM users WHERE id=$1",
            [req.params.id], (err, response) => {
                res.json(`ID ${req.params.id} deleted!!`)
            })
    })

    .put(function (req, res, next) {
        pool.query("UPDATE users SET nimi=$1, sposti=$2, kaupunki=$3 WHERE id=$4",
            [req.body.nimi, req.body.sposti, req.body.kaupunki, req.body.id],
            (err, response) => {
                res.json(`${req.body.nimi} updated.`)
            })
    })

module.exports = router;