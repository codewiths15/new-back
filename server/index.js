const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const { application } = require("express");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "sahil",
    database: "crud_contact"

});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post("/api/post", (req, res) => {
    const { name, email, contact } = req.body;
    const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES (?, ?, ?)";
    db.query(sqlInsert, [name, email, contact], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.get("/", (req, res) => {
    const sqlInsert =
        "INSERT INTO contact_db (name, email, contact) VALUES ('johnwww', 'john@gmail.com2', 7778889)";
    db.query(sqlInsert, (error, result) => {
        console.log("error", error);
        console.log("result", result);
        res.send("Hello world1");
    });

});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
}
)