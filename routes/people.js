// tässä vaihtoehdossa REST-api kutsuu apinaServices-tiedostossa tehtäviä functioita ja palauttaa sen jälkeen haetun tiedon. Tähän ratkaisuun ei sisälly sql-hakuja tietokannasta.

var express = require('express');
var router = express.Router();
var ps = require('../peopleServices');

router.route('/')
    .get(function (req, res, next) {
        res.json(ps.getPeople())
    })

    .post(function (req, res, next) {
        res.json(ps.createPerson(req.body))
    })

router.route('/:id')
    .get(function (req, res, next) {
        res.json(ps.getPerson(req.params.id))
    })

    .delete(function (req, res, next) {
        let id = req.params.id
        res.json(ps.deletePerson(id))
    })

    .put(function (req, res, next) {
        let info = req.body
        res.json(ps.updatePerson(info))
        console.log(info);
    })

module.exports = router;