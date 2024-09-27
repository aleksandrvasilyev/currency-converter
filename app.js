import express from "express";
import { getCurrencies } from "./service/api.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));

app.get("/", async (req, res) => {
  const url =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";
  const { result: data, date: date } = await getCurrencies(url);

  const emojis = {
    eur: "🇪🇺",
    usd: "🇺🇸",
    pln: "🇵🇱",
    jpy: "🇯🇵",
    gbp: "🇬🇧",
    aud: "🇦🇺",
    cad: "🇨🇦",
    chf: "🇨🇭",
    cny: "🇨🇳",
    sek: "🇸🇪",
    nzd: "🇳🇿",
    sgd: "🇸🇬",
    hkd: "🇭🇰",
    krw: "🇰🇷",
    try: "🇹🇷",
    inr: "🇮🇳",
    uah: "🇺🇦",
    brl: "🇧🇷",
    zar: "🇿🇦",
    dkk: "🇩🇰",
  };
  res.render("index", { data, date, emojis });
});

app.listen(1234, () => {
  console.log("Server runs on 1234 port");
});
