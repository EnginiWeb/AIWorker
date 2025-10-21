
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch"); 

const app = express();

app.use(cors());
app.use(bodyParser.json());


const path = require("path");
app.use(express.static(__dirname));


app.get("/api/ping", (req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

const GEMINI_KEY = "-";


app.post("/api/chat", async (req, res) => {
  try {
    const userPrompt = String(req.body?.prompt || "").trim();
    if (!userPrompt) return res.status(400).json({ error: "Missing prompt" });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;

    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: userPrompt }] }]
      })
    });

    const data = await r.json();

    if (!r.ok) {
      console.error("Gemini API error:", data);
      return res.status(r.status).json(data);
    }

    res.json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Proxy call failed", details: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

