// tässä vaihtoehdossa REST-api kutsuu apinaServices-tiedostossa tehtäviä sql-hakuja ja palauttaa sen jälkeen callback-functiona haetun tiedon.

var express = require('express');
var router = express.Router();
var ps = require('../apinaServices');

const Pool = require('pg').Pool;

const conopts = {
    user: "postgres",
    password: "SalaSana",
    host: "localhost",
    database: "harjoitus2"
}

router.route('/')
    .get(function (req, res, next) {
        ps.getPeople(rows => {
            res.json(rows)
        })
    })

    .post(function (req, res, next) {
        ps.createPerson(req.body.nimi, req.body.sposti, req.body.kaupunki, rows => {
            res.json(rows)
            })
    })

router.route('/:id')
    .get(function (req, res, next) {
        ps.getPerson(req.params.id, rows => {
            res.send(rows)
        })
    })

    .delete(function (req, res, next) {
        ps.deletePerson(req.params.id, rows => {
            res.send(rows)
        })
    })

    .put(function (req, res, next) {
        ps.addPerson(req.body.nimi, req.body.sposti, req.body.kaupunki, req.params.id, rows => {
            res.send(rows)
        })
    })

module.exports = router;