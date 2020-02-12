const Client = require('pg').Client;

const conopts = {
    user: 'postgres',
    password: 'SalaSana',
    host: 'localhost',
    database: 'world',
    port: 5432
}

const yhteys = new Client(conopts);
let kysely = "SELECT * FROM city WHERE name LIKE 'A%' ORDER BY name LIMIT 5 ";
kysely = "SELECT name FROM city ORDER BY population LIMIT 5";
kysely = "SELECT name FROM country WHERE continent = 'Europe' ORDER BY population LIMIT 5";
kysely = "SELECT language FROM country_language WHERE country_code = 'FIN'";
kysely = "SELECT country.name FROM country JOIN country_language on country.code = country_language.country_code WHERE language = 'Finnish'";
kysely = "SELECT country.name as country, city.name as city FROM country JOIN city ON country.code = city.country_code JOIN country_language on country.code = country_language.country_code WHERE country.capital = city.id AND language = 'English' AND isofficial = true";
// kysely = "SELECT toinen.name, taulukko.max, taulukko.continent FROM (SELECT max(lifeexpectancy), continent FROM country GROUP BY continent) taulukko LEFT JOIN( SELECT max(lifeexpectancy), name FROM country GROUP BY name) toinen on taulukko.max = toinen.max JOIN country on country.name = toinen.name WHERE country.continent = taulukko.continent ORDER BY max DESC";

yhteys.connect();
yhteys.query(kysely, (err, data) => {
    // virhekäsittely
    if (err) {
        console.error(err);
        process.exit(1);
    }
    // suljetaan yhteys
    yhteys.end();
    // tulosta haettu data
    console.log(data.rows);
}
);