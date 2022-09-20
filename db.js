const knex = require('knex')

/* Connecting to the database. */
const db = knex({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "hilalroot",
        password: "hilalroot",
        database: "knex_crud",
    },
})
/* Exporting the database connection to the other files. */

module.exports=db;