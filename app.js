import express from "express";
import { getCurrencies } from "./service/api.js";
import { emojisContainer } from "./service/emojis.js";
import i18n from "i18n";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

i18n.configure({
  locales: ["en", "ru", "de"],
  directory: path.join(__dirname, "locales"),
  defaultLocale: "en",
  cookie: "lang",
});

const PORT = process.env.PORT || 3001;

app.set("view engine", "ejs");
app.set("views", "views");
app.use(i18n.init);

app.use(express.static("public"));

// app.use((req, res, next) => {
//   const { lang, page } = req.params;

//   // const lang = req.params.lang || "en";
//   const supportedLanguages = ["en", "ru", "de"];

//   if (supportedLanguages.includes(lang)) {
//     res.setLocale(lang);
//   } else {
//     res.setLocale("en");
//   }

//   next();
// });

app.get("/:lang?/:page?", async (req, res) => {
  const { lang, page } = req.params;
  res.setLocale(lang || "en");
  console.log(req.params);
  console.log(res.locale);
  const url =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";
  const { result: data, date: date } = await getCurrencies(url);
  const emojis = emojisContainer();

  res.render(page || "index", { data, date, emojis, __: res.__ });
});

app.get("/", async (req, res) => {
  const url =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";
  const { result: data, date: date } = await getCurrencies(url);
  const emojis = emojisContainer();
  res.render("index", { data, date, emojis, __: res.__ });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
