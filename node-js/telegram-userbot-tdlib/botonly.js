var { app_id, app_hash, id_bot, token_bot } = {
    "app_id": Number(process.env.app_id ?? 273729),
    "app_hash": String(process.env.app_hash ?? "0f7a4f1ed6c06469bf0ecf70ce92b49d"),
    "id_bot": 123455,
    "token_bot": ""
};

if (typeof id_bot != "number") {
    id_bot = Date.now();
}

var { telegram, telegramApi } = require("tdl-lib");
var clientBot = new telegram(app_id, app_hash, `./client/${id_bot}`, "./libtdjson.so");
var tg = new telegramApi(clientBot.client);

clientBot.client.on('error', function (err) {
    console.error('Got error:', JSON.stringify(err, null, 2));
})
clientBot.client.on('destroy', function () {
    console.log('Destroy event');
})
clientBot.on('update', async function (update) {
    try {
        if (update) {
            if (update["message"]) {
                var msg = update["message"];
                var chat_id = msg["chat"]["id"];
                var text = msg["text"];
                var is_outgoing = msg["outgoing"];
                try {
                    if (!is_outgoing) {
                        if (text) {
                            if (text == "/start") {
                                var option = {
                                    "chat_id": chat_id,
                                    "text": "Hello"
                                };
                                return await tg.request("sendMessage", option);
                            } else {
                                var option = {
                                    "chat_id": chat_id,
                                    "text": "hay"
                                };
                                return await tg.request("sendMessage", option);
                            }
                        }
                    }
                } catch (e) {
                    var option = {
                        "chat_id": chat_id,
                        "text": "Error"
                    };
                    return await tg.request("sendMessage", option);
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
});

clientBot.bot(token_bot);