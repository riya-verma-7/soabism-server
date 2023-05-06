const express = require('express');
const bodyParser = require('body-parser');

const nodemailer = require("nodemailer");

const cors = require('cors');
const mongoose = require("mongoose")
const User = require('./model');
const path = require('path');


require('dotenv').config();

const app = express();
app.use(express.static("public"));


app.use(cors({
    origin: "http://codes-soabism.netlify.app/"
}))



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(process.env.DBURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log("DB connected"))


//configuration for email 
let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: process.env.EMAILID,
        pass: process.env.EMAILPASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});


// app.get('/', (req, res) => {
//     res.send('Welcome to the codes.soabism server');
// })

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

//sending post request on home route
app.post('/', function(req, res) {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    console.log(firstName, lastName, email);


    // Send welcome email
    let HelperOptions = {

        from: process.env.NAME + '<' + (process.env.EMAILID) + '>',
        to: email,
        subject: "Welcome to codes.soabism community",

        html: "<br><h2>Welcome to codes.soabism.</h2><br><br><b>You have successfully signed up on codes.soabism</b>.<br> This channel will feature educational content related to <b>coding</b> and <b>technology</b>.In this channel you will find a wide range of courses which have been carefully researched and created to provide comprehensive and in-depth knowledge of all the topics. <br>For more insights, <b>You can go on to my channel and get started !.</b><br><br>Any suggestions are always welcome.<br>Regards,Saurav Raj"

    };

    transporter.sendMail(HelperOptions, (err, info) => {
        if (err) throw err;
        console.log("The message was sent");
    });






})

app.post("/contact", (req, res) => {
    console.log(req.body)
    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err
            });
        }

        res.json({
            user
        })
    })
})

const port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log(`Server started on port ${port}`);
});