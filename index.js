const express = require('express')
const app=express();
const port=5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users',require('./users.js'));
app.listen(port,()=>{
    console.log(`server is runing on http://localhost:${port}`);
})