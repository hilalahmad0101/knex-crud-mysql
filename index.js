/* The above code is creating a server and listening to port 5000. */
const express = require('express')
const app=express();
const port=5000;

/* Parsing the request body. */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users',require('./users.js'));
app.use('/api/products',require('./products.js'));
app.listen(port,()=>{
    console.log(`server is runing on http://localhost:${port}`);
})