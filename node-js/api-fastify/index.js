const app = require('fastify')({logger: true, ignoreTrailingSlash: true, trustProxy: true });
var port = process.env.PORT || 8080 || 3000 || 4000;

app.get('/', async function(request, reply){
    return reply.code(200).send(JSON.stringify({
        "status": "oke",
        "message": "server run normal"
    }, null,2));
});

app.listen({ port: port, host: '0.0.0.0', backlog: 511 }, async function (err, addres) {
    if (err) throw err;
    console.log(`bot on ${addres}`);
});