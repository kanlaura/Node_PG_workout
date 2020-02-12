// tässä vaihtoehdossa REST-api kutsuu patriqueServices-tiedostossa tehtäviä sql-hakuja asyncronoidusti ja palauttaa lopuksi haetun tiedon.

var express = require('express');
var router = express.Router();
var ss = require('../patriqueServices');

const Pool = require('pg').Pool;

const conopts = {
    user: "postgres",
    password: "SalaSana",
    host: "localhost",
    database: "harjoitus2"
}

router.route('/')
    .get(async function (req, res, next) {
        try {
            let rows = await ss.getPeople()
            res.json(rows)
        } catch (error) {
            console.log(error);
        }
    })

    .post(async function (req, res, next) {
        try {
            let rows = await ss.createPerson(req.body.nimi, req.body.sposti, req.body.kaupunki)
            res.json(rows)
        } catch (error) {
            console.log(error);
        }
    })

router.route('/:id')
    .get(async function (req, res, next) {
        try {
            let rows = await ss.getPerson(req.params.id)
            res.json(rows)
        } catch (error) {
            console.log(error);
        }
    })

    .delete(async function (req, res, next) {
        try {
            let rows = await ss.deletePerson(req.params.id)
            res.send(rows)
        } catch (error) {
            console.log(error);
        }
    })

    .put(async function (req, res, next) {
        try {
            let rows = await ss.addPerson(req.body.nimi, req.body.sposti, req.body.kaupunki, req.params.id)
            res.send(rows)
        } catch (error) {
            console.log(error);
        }
    })

module.exports = router;