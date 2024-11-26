const chalk = require("chalk");
const request = require("request");
const config = require("./config.json");
const fs = require("fs");

let maintoken = config.main.token;
let settings = config.settings;
let mainchannelid = config.main.channelid;
let timeTerminate;

console.log(chalk.bgWhite.red.bold(" Opened Socket Client "));

//-------------------------------Terminate-------------------------------------------------//
timeTerminate = settings.times.intervals.terminate.timeout; //2820000

setTimeout(() => {
    console.log(`Auto Terminate: ${timeTerminate / 1000 / 60} minutes.`);
    setTimeout(() => {
        process.exit(0);
    }, 1500);
}, timeTerminate);

//----------------------------------------------------Check Main Token----------------------------------------------------//
request.get(
    {
        headers: {
            authorization: maintoken,
        },
        url: "https://canary.discord.com/api/v9/users/@me",
    },
    function (_error, _response, body) {
        var bod = JSON.parse(body);

        if (String(bod.message) === "401: Unauthorized") {
            console.log(
                chalk.red(`Main Token / ${String(bod.message)} (TOKEN WRONG!)`)
            );
            updateerrorsocket(
                `Main Token / ${String(bod.message)} (TOKEN WRONG!)`
            );
            setTimeout(() => {
                process.exit(0);
            }, 500);
        } else {
            console.log(chalk.dim.bgWhite.bold(" Main Token "));
            console.log(chalk.inverse(
                ` User: ${bod.username}#${bod.discriminator} `)
            );

            setTimeout(() => {
                const functions = [
                    { fn: kata1, delay: 1000, enabled: settings.kata1 === "true" },
                    { fn: kata2, delay: 3000, enabled: settings.kata2 === "true" },
                    { fn: kata3, delay: 7000, enabled: settings.kata3 === "true" },
                    { fn: kata4, delay: 10000, enabled: settings.kata4 === "true" },
                    { fn: kata5, delay: 13000, enabled: settings.kata5 === "true" },
                    { fn: phrases, delay: 16000, enabled: settings.phrases === "true" }
                ];
            
                functions.forEach(({ fn, delay, enabled }) => {
                    if (enabled) {
                        setTimeout(() => fn(maintoken, "Main Token", mainchannelid), delay);
                    }
                });
            }, 500);
        }
    }
);

//--------------------------------FUNCTION-------------------------------------------------//

function Interval(kataFunction, settingsKey, intervalSettings) {
    if (intervalSettings.enable) {
        var timeInterval = intervalSettings.time;
    } else {
        var timeInterval = 303000;
    }
    if (settings[settingsKey] === "true") {
        setInterval(() => {
            kataFunction(maintoken, "Main Token", mainchannelid);
        }, timeInterval);
    }
}

Interval(kata1, "kata1", settings.times.intervals.kata1);
Interval(kata2, "kata2", settings.times.intervals.kata2);
Interval(kata3, "kata3", settings.times.intervals.kata3);
Interval(kata4, "kata4", settings.times.intervals.kata4);
Interval(kata5, "kata5", settings.times.intervals.kata5);
Interval(phrases, "phrases", settings.times.intervals.phrases);

async function typing(token, channelid) {
    if (settings.typingindicator === "true") {
        request.post(
            {
                headers: {
                    authorization: token,
                },
                url: `https://discord.com/api/v9/channels/${channelid}/typing`,
            },
            function (error, _response, _body) {
                if (error)
                    return console.log(chalk.red("Typing indicator failed ❌"));
            }
        );
    } else return;
}

function nonce() {
    return "1098393848631590" + Math.floor(Math.random() * 9999);
}

//----------------------------------------------------Main Features----------------------------------------------------//

function sendKata(token, _tokentype, channelid, kataNumber, chalkColor, emoji) {
    var ct = settings.kata[`kata${kataNumber}`];
    typing(token, channelid);
    request.post({
        headers: {
            authorization: token,
        },
        url: `https://discord.com/api/v9/channels/${channelid}/messages`,
        json: {
            content: ct,
            nonce: nonce(),
            tts: false,
            flags: 0,
        },
    }, function (_error, _response, _body) {
        console.log(
            chalk.red(
                `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
            ) +
            chalkColor(` kata${kataNumber} ${emoji}`)
        );
    });
}

function kata1(token, _tokentype, channelid) {
    sendKata(token, "Main Token", channelid, 1, chalk.black, "1️");
}

function kata2(token, _tokentype, channelid) {
    sendKata(token, "Main Token", channelid, 2, chalk.blue, "2️");
}

function kata3(token, _tokentype, channelid) {
    sendKata(token, "Main Token", channelid, 3, chalk.cyan, "3️");
}

function kata4(token, _tokentype, channelid) {
    sendKata(token, "Main Token", channelid, 4, chalk.cyan, "4️");
}

function kata5(token, _tokentype, channelid) {
    sendKata(token, "Main Token", channelid, 5, chalk.cyan, "5️");
}

function phrases(token, tokentype, channelid, _phrasesFilePath) {
    fs.readFile("./phrases/phrases.json", "utf8", (err, data) => {
        if (tokentype == "Main Token") {
            var ilu = settings.kata.phrases;
        } else {
            var ilu = settings.kata.phrases;
        }
        
        if (err) {
            console.error("Error reading JSON file:", err);
            return;
        }

        try {
            const phrasesObject = JSON.parse(data);
            const phrases = phrasesObject.phrases;

            if (!phrases || !phrases.length) {
                console.log("Phrases array is undefined or empty.");
                return;
            }

            let result = Math.floor(Math.random() * phrases.length);
            var ilu = phrases[result];

            typing(token, channelid);
            request.post(
                {
                    headers: {
                        authorization: token,
                    },
                    url: `https://discord.com/api/v9/channels/${channelid}/messages`,
                    json: {
                        content: ilu,
                        nonce: nonce(),
                        tts: false,
                        flags: 0,
                        
                    },
                },
                function (_error, _response, _body) {
                    console.log(
                        chalk.red(
                            `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                        ) +
                            chalk.white.bold(" Phrases")
                    );
                }
                
            );
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    });
}
