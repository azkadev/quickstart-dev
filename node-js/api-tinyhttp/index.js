var { App } = require("@tinyhttp/app");
var app = new App();
var port = process.env.PORT || 8080 || 3000 || 4000;

app.get('/', async function (_, res) {
    return res.send('<h1>Hello World</h1>');
});

app.post('/post', async function (_, res) {
    return res.send('<h1>Hello World</h1>');
});


app.listen(port, function(){
    console.log(`Run on port ${port}`)
});
