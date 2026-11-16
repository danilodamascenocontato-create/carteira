export default async function handler(req, res) {
  const token = process.env.BRAPI_TOKEN;
  if (!token) return res.status(503).json({ error: "Token da brapi não configurado no servidor." });
  const tickers = String(req.query.tickers || "").split(",")
    .map(s => s.trim().toUpperCase())
    .filter(s => /^[A-Z0-9]{5,6}$/.test(s)).slice(0, 20);
  if (!tickers.length) return res.status(400).json({ error: "Informe tickers válidos." });
  try {
    const url = `https://brapi.dev/api/quote/${encodeURIComponent(tickers.join(","))}?token=${encodeURIComponent(token)}`;
    const upstream = await fetch(url, { headers: { "accept": "application/json" } });
    const body = await upstream.json();
    if (!upstream.ok) return res.status(upstream.status).json({ error: body.message || "Erro retornado pela brapi." });
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=120");
    return res.status(200).json({ results: body.results || [] });
  } catch {
    return res.status(502).json({ error: "Não foi possível consultar a fonte de cotações." });
  }
}
