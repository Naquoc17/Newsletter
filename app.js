const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();

// Mailchimp API
const client = require("@mailchimp/mailchimp_marketing");


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000, function () {
    console.log("Server started.");
})

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

client.setConfig({
    apiKey: "fcbe92af8ff54e83932a559f485622fa-us9",
    server: "us9",
});


app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const list_id = "7f20d2a869";

    async function runAddMember() {
        try {
            const addMember = await client.lists.addListMember(list_id, {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            });
            console.log(addMember);
            res.sendFile(__dirname + "/success.html");

        } catch (err) {
            console.log(err.status);
            res.sendFile(__dirname + "/failure.html");
        }
    };
    runAddMember();
})

app.post("/failure", function(req, res){
    res.redirect("/");
})




// API Key
// fcbe92af8ff54e83932a559f485622fa-us9


// List Id
// 7f20d2a869