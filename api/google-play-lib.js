import gplay from "google-play-scraper";
import store from "app-store-scraper";
import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
const PORT = 3000;

// google play apis
app.get("/app-details", async (req, res) => {
  const appId = req.query.id;
  const lang = "en";
  const country = "in";

  try {
    const appDetails = await gplay.app({ appId, lang, country });
    res.json(appDetails);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Error fetching app details" });
  }
});

app.get("/app-search", async (req, res) => {
  let terms = req.query.keyword;
  let country = req.query.gl || "in";
  let lang = req.query.hl || "en";
  let apps = await gplay.search({
    term: terms,
    country: country,
    lang: lang,
    num: 20,
  });
  res.json(apps);
});

app.get("/app-developer-id", async (req, res) => {
  let devId = req.query.devId;
  let country = req.query.gl || "in";
  let lang = req.query.hl || "en";
  let apps = await gplay.developer({
    devId: devId,
    country: country,
    lang: lang,
    fullDetail: true,
    num: 10,
  });
  res.json(apps);
});

app.get("/app-review/rating", async (req, res) => {
  let appId = req.query.appId;
  let apps = await gplay.reviews({
    appId: appId,
    sort: gplay.sort.RATING,
    paginate: true,
    num: 10,
  });
  res.json(apps);
});

app.get("/suggest", async (req, res) => {
  const term = req.query.term;
  const country = req.query.gl || "in"; // default to India
  const lang = req.query.hl || "en"; // default to English
  const suggestions = await gplay.suggest({ term, country, lang });
  res.json(suggestions);
});

// appStore apis

app.get("/appstore/search", async (req, res) => {
  let terms = req.query.keyword;
  let country = req.query.gl || "in";
  let lang = req.query.hl || "en";
  let apps = await store.search({
    term: terms,
    country: country,
    lang: lang,
    num: 20,
  });
  res.json(apps);
});

app.get("/appstore/suggest", async (req, res) => {
  const term = req.query.term;
  const country = req.query.gl || "in"; // default to India
  const lang = req.query.hl || "en"; // default to English
  const suggestions = await store.suggest({ term, country, lang });
  res.json(suggestions);
});

// app.listen(PORT, () => {
//   console.log(`API running on http://localhost:${PORT}`);
// });

// /app-review/rating?appId=com.dxco.pandavszombies
