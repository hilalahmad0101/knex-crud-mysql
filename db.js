const knex = require('knex')

const db = knex({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "hilalroot",
        password: "hilalroot",
        database: "knex_crud",
    },
})

module.exports=db;