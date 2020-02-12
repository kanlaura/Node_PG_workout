// tässä vaihtoehdossa REST-api kutsuu sittenServices-tiedostossa tehtäviä sql-hakuja then-promisien avulla ja palauttaa lopuksi haetun tiedon.

var express = require('express');
var router = express.Router();
var ss = require('../sittenServices');

const Pool = require('pg').Pool;

const conopts = {
    user: "postgres",
    password: "SalaSana",
    host: "localhost",
    database: "harjoitus2"
}

router.route('/')
    .get(function (req, res, next) {
        ss.getPeople((rows) => {
            res.json(rows)
        })
    })
    .post(function (req, res, next) {
        ss.createPerson(req.body.nimi, req.body.sposti, req.body.kaupunki, (rows) => {
            res.json(rows)
        })
    })

router.route('/:id')
    .get(function (req, res, next) {
        ss.getPerson(req.params.id, (rows) => {
            res.send(rows)
        })
    })

    .delete(function (req, res, next) {
        ss.deletePerson(req.params.id, (rows) => {
            res.send(rows)
        })
    })

    .put(function (req, res, next) {
        ss.updatePerson(req.body.nimi, req.body.sposti, req.body.kaupunki, req.params.id, (rows) => {
            res.send(rows)
        })
    })

module.exports = router;