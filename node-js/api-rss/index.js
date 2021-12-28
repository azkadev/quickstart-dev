var app = require('fastify').fastify({ "logger": true, "ignoreTrailingSlash": true, "trustProxy": true });
var port = process.env.PORT || 8080 || 3000 || 4000;

app.all("/", async function (req, res) {
    var response = {
        "status_bool": true,
        "status_code": 200,
        "result": {}
    };
    try {
        response["message"] = "Server run";
    } catch (e) {
        response["status_bool"] = false;
        response["status_code"] = 500;
        response["message"] = "server Error";
    }
    return res.status(response["status_code"]).send(response);
});

app.all("/", async function (req, res) {
    var response = {
        "status_bool": true,
        "status_code": 200,
        "result": {}
    };
    response["message"] = "Server run";
    return res.status(response["status_code"]).send(response);
});

app.listen({ "port": port, "host": '0.0.0.0', "backlog": 511 }, async function (err, addres) {
    if (err) throw err;
    console.log(`server run on ${addres}`);
});