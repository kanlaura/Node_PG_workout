const people = [
    { id: 1, nimi: "Henri", email: "henri@hemail.com" },
    { id: 2, nimi: "Otto", email: "otto@ugotmail.com" },
    { id: 3, nimi: "Laura", email: "laura@shemail.com" },
    { id: 4, nimi: "Pekka", email: "pekka@hemail.com" }]

const getPeople = () => {
    return people;
};

const getPerson = (tunnus) => {
    return people.find((p) => {
        return p.id == tunnus
    })
}

const createPerson = (uusiapina) => {
    people.push(uusiapina);
    return `${uusiapina.nimi} luotu!`
}

const deletePerson = (poistettavaApina) => {
    let apina = people.findIndex(x => x.id == poistettavaApina)
    let nimi = people[apina].nimi;
    people.splice(apina, 1);
    return `${nimi} poistettu!`
}

const updatePerson = (muokattavaApina) => {
    let apinaIndex = people.findIndex(y => y.id == muokattavaApina.id)
    people[apinaIndex].nimi = muokattavaApina.nimi;
    people[apinaIndex].email = muokattavaApina.email;
    return `ID ${people[apinaIndex].id} päivitetty!`
}

module.exports = { getPeople, getPerson, createPerson, deletePerson, updatePerson }