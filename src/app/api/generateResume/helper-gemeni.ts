

export async function generateWithRetry(
  model: any,
  prompt: string,
  retries = 3
) {
  let delay = 600;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });
      return result;
    } catch (err: any) {
      const status = err?.status || err?.response?.status;

      // Retry only on overload / rate limit
      if ((status === 503 || status === 429) && attempt < retries - 1) {
        await new Promise(res => setTimeout(res, delay));
        delay *= 2;
        continue;
      }

      throw err;
    }
  }
}
