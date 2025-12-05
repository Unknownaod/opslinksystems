export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Missing URL" });

  try {
    const start = Date.now();
    const response = await fetch(url);
    const latencyMs = Date.now() - start;
    const data = await response.json().catch(() => ({}));

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json({
      status: data.status || "ok",
      latencyMs,
      source: url,
    });
  } catch (err) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json({
      status: "down",
      latencyMs: null,
      source: url,
      error: err.message,
    });
  }
}
