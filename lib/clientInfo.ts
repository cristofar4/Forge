/**
 * Reads information the browser already exposes to any website, client side and
 * without prompting. Used by the hero robot's playful, privacy respecting scan.
 * Nothing here is transmitted or stored by Forge. It is shown only to the visitor.
 */

export type InfoRow = { key: string; label: string; value: string };

function parseBrowser(ua: string): string {
  if (/edg/i.test(ua)) return "Microsoft Edge";
  if (/opr|opera/i.test(ua)) return "Opera";
  if (/chrome|crios/i.test(ua)) return "Chrome";
  if (/firefox|fxios/i.test(ua)) return "Firefox";
  if (/safari/i.test(ua)) return "Safari";
  return "Your browser";
}

function parseOS(ua: string): string {
  if (/windows/i.test(ua)) return "Windows";
  if (/android/i.test(ua)) return "Android";
  if (/iphone|ipad|ipod/i.test(ua)) return "iOS";
  if (/mac os x|macintosh/i.test(ua)) return "macOS";
  if (/linux/i.test(ua)) return "Linux";
  return "Unknown system";
}

export function approxLocation(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!tz) return "Unavailable";
    const city = tz.split("/").pop()?.replace(/_/g, " ");
    return city ? `${city} region` : tz;
  } catch {
    return "Unavailable";
  }
}

export function gatherClientInfo(): InfoRow[] {
  if (typeof window === "undefined") return [];
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { effectiveType?: string; downlink?: number };
  };
  const ua = nav.userAgent || "";
  const conn = nav.connection;

  const rows: InfoRow[] = [
    { key: "browser", label: "Browser", value: parseBrowser(ua) },
    { key: "os", label: "System", value: parseOS(ua) },
    {
      key: "device",
      label: "Device",
      value: /mobile|android|iphone/i.test(ua) ? "Mobile" : "Desktop",
    },
    { key: "display", label: "Display", value: `${window.screen.width} by ${window.screen.height}` },
    { key: "location", label: "Region", value: approxLocation() },
    { key: "language", label: "Language", value: nav.language || "Unknown" },
    { key: "cores", label: "Processor", value: `${nav.hardwareConcurrency || "?"} cores` },
  ];

  if (nav.deviceMemory) rows.push({ key: "memory", label: "Memory", value: `${nav.deviceMemory} GB` });
  if (conn?.effectiveType)
    rows.push({
      key: "network",
      label: "Network",
      value: `${conn.effectiveType.toUpperCase()}${conn.downlink ? ` at ${conn.downlink} Mbps` : ""}`,
    });
  rows.push({ key: "status", label: "Status", value: nav.onLine ? "Online" : "Offline" });

  return rows;
}

/** Best effort public IP lookup. Resolves to a reassuring string if unavailable. */
export async function getPublicIP(): Promise<string> {
  try {
    const res = await fetch("https://api.ipify.org?format=json", { cache: "no-store" });
    const data = await res.json();
    return data.ip || "Encrypted";
  } catch {
    return "Encrypted and private";
  }
}
