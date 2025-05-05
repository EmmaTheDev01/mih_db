const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

const port = process.env.PORT || 6000;


app.use(express.json());

app.get("/" , (req, res) => {
    res.send("App is running");
});

app.listen(port, () =>{
    console.log("App Listening to Port");
});