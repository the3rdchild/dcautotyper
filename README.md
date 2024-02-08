# DISCORD TYPER

---------------------------------------
## Usage

> npm install

> node bot.js

---------------------------------------

## Features

1. TIMER
2. TYPE INDICATOR
3. 5 WORDs (You can add more function to add more word/cycle)
4. Phrase (Random Word Generator)

---------------------------------------

## HOW TO GET TOKEN ID:

```js
(webpackChunkdiscord_app.push([
    [""],
    {},
    (e) => {
        m = [];
        for (let c in e.c) m.push(e.c[c]);
    },
]),
m)
    .find((m) => m?.exports?.default?.getToken !== void 0)
    .exports.default.getToken();
```

--------------------------------------- 
## CHANGELOG

1. Make the code more simple (removing repetitions)
2. Add Fn functions:
```js
const functions = [
        { fn: kata1, delay: 1000, enabled: settings.kata1 === "true" },
        { fn: kata2, delay: 3000, enabled: settings.kata2 === "true" },
        { fn: kata3, delay: 7000, enabled: settings.kata3 === "true" },
        { fn: kata4, delay: 10000, enabled: settings.kata4 === "true" },
        { fn: kata5, delay: 13000, enabled: settings.kata5 === "true" },
        { fn: phrases, delay: 16000, enabled: settings.phrases === "true" }
    ];
```
3. Make the interval time in config.js more simple:
```js
"settings": {
    "times": {
        "enable": true,
        "intervals": {
            "kata1": 60293,
            "kata2": 225508,
            "kata3": 44104,
            "kata4": 10104,
            "kata5": 10104,
            "phrases": 10104
        }
    }
}
```
