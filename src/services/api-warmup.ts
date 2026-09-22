const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:9700/api/v1";

export function warmUpApi() {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 8000);

  void fetch(API_URL, {
    method: "GET",
    mode: "no-cors",
    cache: "no-store",
    signal: controller.signal,
  })
    .catch(() => undefined)
    .finally(() => {
      window.clearTimeout(timeoutId);
    });
}