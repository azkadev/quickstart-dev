var { Telegram } = require("telegram_client");
var client = new Telegram("paste_toke_bot");
var tg = client.api;
var express = require("express");
var app = express();
var port = process.env.PORT || 8080 || 3000 || 4040;

app.set("json spaces", 2);
app.use(express.json());

app.all("/", async function (req, res) {
    return res.send("oke");
});

app.get("/setWebhook", async function (req, res) {
    var url = "url";
    var option = {
        "url": url
    };
    var data = await tg.request("setWebhook", option);
    return res.json(data);
});

app.get("/bot", async function (req, res) {
    return res.json({
        "oke": "ke"
    });
});

app.post("/bot", async function (req, res) {
    var { body } = req;
    res.json({
        "status": "ok"
    });
    if (body) {
        var update = body;
        if (update) {
            if (update.message) {
                var msg = update.message;
                try {
                    return await tg.copyMessage(msg.chat.id, msg.chat.id, msg.message_id);
                } catch (e) {
                    var option = {
                        "chat_id": msg.chat.id,
                        "text": "Failed",
                        "reply_to_message_id": msg.message_id
                    };
                   return  await tg.request("sendMessage", option);
                }

            }

        }
    } else {
        return res.json({
            "status": "ok"
        });
    }
});

app.listen(port, async function () {
    console.log("server start on " + port);
});