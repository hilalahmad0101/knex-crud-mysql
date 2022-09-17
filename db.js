const knex = require('knex')

const db = knex({
    client: "mysql",
    conconnection: {
        host: "localhost",
        user: "hilalroot",
        password: "hilalroot",
        database: "knex_crud",
    },
})

module.exports=db;