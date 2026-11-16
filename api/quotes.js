export default async function handler(req, res) {
  const token = process.env.BRAPI_TOKEN;

  if (!token) {
    return res.status(503).json({
      error: "Token da brapi não configurado."
    });
  }

  const tickers = String(req.query.tickers || "")
    .split(",")
    .map(s => s.trim().toUpperCase())
    .filter(s => /^[A-Z0-9]{5,6}$/.test(s))
    .slice(0, 20);

  if (!tickers.length) {
    return res.status(400).json({
      error: "Informe tickers válidos."
    });
  }

  const results = [];
  const errors = [];

  for (const ticker of tickers) {
    try {
      const url =
        `https://brapi.dev/api/quote/${ticker}?token=${encodeURIComponent(token)}`;

      const response = await fetch(url);
      const body = await response.json();

      if (response.ok && body.results?.[0]) {
        results.push(body.results[0]);
      } else {
        errors.push({
          ticker,
          error: body.message || body.error || "Cotação indisponível."
        });
      }
    } catch (error) {
      errors.push({
        ticker,
        error: "Falha na consulta."
      });
    }

    await new Promise(resolve => setTimeout(resolve, 500));
  }

  res.setHeader(
    "Cache-Control",
    "s-maxage=60, stale-while-revalidate=120"
  );

  return res.status(200).json({
    results,
    errors
  });
}
