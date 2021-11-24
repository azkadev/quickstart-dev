var express = require("express");
var app = express();
var port = process.env.PORT || 8080 || 3000 || 4040;

app.set("json spaces", 2);
app.use(express.json());

app.all("/", async function (req, res) {
    return res.send("oke");
});

app.listen(port, async function () {
    console.log("server start on " + port);
});