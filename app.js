import express from "express";
import { getCurrencies } from "./service/api.js";
import { emojisContainer } from "./service/emojis.js";
const app = express();

const PORT = process.env.PORT || 3001;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));

app.get("/", async (req, res) => {
  const url =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";
  const { result: data, date: date } = await getCurrencies(url);
  const emojis = emojisContainer();

  res.render("index", { data, date, emojis });
});

app.get("/about", (req, res) => {
  res.send("about page");
});
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
