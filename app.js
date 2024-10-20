import express from "express";
import { getCurrencies } from "./service/api.js";
import { emojisContainer } from "./service/emojis.js";
import i18next from "i18next";
import i18nextMiddleware from "i18next-http-middleware";
import Backend from "i18next-fs-backend";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));

await i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: path.join(__dirname, "./locales/{{lng}}.json"),
    },
    fallbackLng: "en",
    supportedLngs: ["en", "ru", "de"],
    // preload: ["en", "ru", "de"],
    defaultNS: "translation",
  });

app.use(i18nextMiddleware.handle(i18next));
const localizationMiddleware = (req, res, next) => {
  const supportedLangs = ["ru", "de", "en"];
  const urlParts = req.url.split("/");

  if (supportedLangs.includes(urlParts[1])) {
    req.language = urlParts[1];
    req.url = "/" + urlParts.slice(2).join("/");
  } else {
    req.language = "en";
  }

  req.i18n.changeLanguage(req.language);

  res.locals.urlFor = (path, lang) => {
    let cleanPath = path.replace(/^\/(?:ru|de|en)/, "");

    if (cleanPath === "") cleanPath = "/";

    if (lang && lang !== "en") {
      return `/${lang}${cleanPath}`;
    } else {
      return cleanPath;
    }
  };

  next();
};
app.use(localizationMiddleware);

app.get("/", async (req, res) => {
  const url =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";
  const { result: data, date: date } = await getCurrencies(url);
  const emojis = emojisContainer();

  res.render("index", { data, date, emojis, t: req.t, req: req });
});

app.get("/about", (req, res) => {
  // res.render("about", {
  //   t: req.t,
  //   req: req,
  // });

  const date = "2024"; // hardcoded -> remove or change

  res.render("about", { date, t: req.t, req: req });
});

app.use((req, res) => {
  res.status(404).send("404");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
