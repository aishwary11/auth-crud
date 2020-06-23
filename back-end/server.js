const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 3030;
const app = express();
const mongoose = require("mongoose");

app.use(
    express.json({
        limit: "50mb",
    })
);

app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
    })
);

app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get("/", (req, res) => {
    res.status(200).send("Welcome to crud operation");
});

const index = require("./components/index")(app);

const server = app.listen(port, () => console.log(`Server Started on ${port}`));

mongoose.connect("mongodb://localhost:27017/crud", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) console.log("Error connecting mongodb....");
    else console.log("Connected to mongodb....");
});

module.exports = app;