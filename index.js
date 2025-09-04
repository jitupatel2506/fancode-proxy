import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 10000;

// Proxy endpoint
app.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send("Missing url parameter");
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Origin": "https://www.fancode.com",
        "Referer": "https://www.fancode.com/"
      }
    });

    // पास headers
    res.setHeader("Content-Type", response.headers.get("content-type"));
    res.setHeader("Access-Control-Allow-Origin", "*");

    response.body.pipe(res);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).send("Proxy failed: " + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
