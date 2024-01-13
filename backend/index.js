const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const dbConnect = require("./config/dbConnect");
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('Hello World');
}
);

dbConnect();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});