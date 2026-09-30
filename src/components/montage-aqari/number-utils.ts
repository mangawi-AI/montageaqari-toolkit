export function sanitizeDecimal(value: string): string {
  const withoutGrouping = value.replace(/,/g, "").replace(/[^\d.]/g, "");
  const [whole = "", ...fractionParts] = withoutGrouping.split(".");
  const fraction = fractionParts.join("");
  return fractionParts.length > 0 ? `${whole}.${fraction}` : whole;
}

export function parseDecimal(value: string): number | null {
  const normalized = value.replace(/,/g, "").trim();
  if (normalized === "") return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

export function formatInputNumber(value: string): string {
  const sanitized = sanitizeDecimal(value);
  const [whole = "", fraction] = sanitized.split(".");
  const grouped = whole.replace(/^0+(?=\d)/, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fraction === undefined ? grouped : `${grouped}.${fraction}`;
}

export function formatSar(value: number): string {
  return `${new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value)} SAR`;
}

export function formatDocumentDate(value: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "—";
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}