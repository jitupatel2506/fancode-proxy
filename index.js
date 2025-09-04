import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/proxy", async (req, res) => {
  try {
    const targetUrl = req.query.url;
    if (!targetUrl) {
      return res.status(400).send("Missing url parameter");
    }

   const response = await fetch(targetUrl, {
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    "Origin": "https://www.fancode.com",
    "Referer": "https://www.fancode.com/",
  }
});

    if (!response.ok) {
      return res.status(response.status).send("Upstream error: " + response.statusText);
    }

    res.set("Content-Type", response.headers.get("content-type") || "application/vnd.apple.mpegurl");
    response.body.pipe(res);

  } catch (err) {
    console.error(err);
    res.status(500).send("Proxy error: " + err.message);
  }
});

app.listen(3000, () => console.log("Proxy running on port 3000"));

