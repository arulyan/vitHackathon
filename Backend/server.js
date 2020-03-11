//importing modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require('bcrypt');

//declaring the middlewares
app.use(cors()); //Cross-origin resource sharing
app.use(bodyParser.urlencoded({ extended: false })); //request goes to the server in the url encoded form
app.use(bodyParser.json()); // response data should be in json format

let PORT = 4999;

//Creating Connection to database
const connection = mysql.createConnection({
    host: "localhost",
    user: "arulyan",
    password: "forza",
    database: "vithacklogin"
})

//Connection Status
connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to DB");
})

//SignUp
app.post("/signUp", (req, res) => {
    getName = req.body.name;
    getMail = req.body.email;
    getPass = req.body.password;
    let command = 'select Email from UserInfo where (Email) = ("' + getMail + '")';
    connection.query(command, (err, rows) => {
        if (err) throw err;

        if (rows.length) {
            console.log("Username Already Exists");
            res.json({
                success: false,
                status: 409
            })
        }

        else {
            bcrypt.hash(getPass, 10, (err, hash) => {
                var inser = 'insert into UserInfo (Name,Email,Password) values ("' + getName + '","' + getMail + '","' + hash + '")';
                connection.query(inser, (err, rows) => {
                    if (err) {
                        throw err;
                    }
                    else {
                        res.json({
                            success: true,
                            status: 200
                        })
                        console.log("Data Inserted");
                    }
                })
            })
        }
    })
})

//Login
app.post("/login", (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;
    var sql = 'select * from UserInfo where (Email)=("' + email + '")';
    connection.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                status: 400
            })
        }
        else if (rows.length) {
            bcrypt.compare(pass, rows[0].password, (err, resp) => {
                if (resp) {
                    res.json(rows);
                    console.log("success");
                }
                else {
                    res.json({
                        success: false,
                        status: 401
                    })
                    console.log("Wrong Passowrd!")
                }
            })
        }
        else {
            console.log("You are not yet registered!");
            res.json({
                success: false,
                status: 404
            })
        }
    })
})

app.listen(PORT);