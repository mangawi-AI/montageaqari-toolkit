import { Check, Copy } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { formatInputNumber, formatSar, parseDecimal } from "./number-utils";

export function FeeCalculator() {
  const [price, setPrice] = useState("");
  const [percent, setPercent] = useState("");
  const [copied, setCopied] = useState(false);
  const parsedPrice = parseDecimal(price);
  const parsedPercent = parseDecimal(percent);

  const priceError = price !== "" && (parsedPrice === null || parsedPrice <= 0);
  const percentError = percent !== "" && (parsedPercent === null || parsedPercent < 0 || parsedPercent > 100);
  const isValid = parsedPrice !== null && parsedPrice > 0 && parsedPercent !== null && parsedPercent >= 0 && parsedPercent <= 100;
  const fee = isValid ? (parsedPrice * parsedPercent) / 100 : 0;
  const net = isValid ? parsedPrice - fee : 0;

  const copyText = useMemo(() => {
    if (!isValid) return "";
    return `Price: ${formatSar(parsedPrice)} · Fee ${parsedPercent}%: ${formatSar(fee)}`;
  }, [fee, isValid, parsedPercent, parsedPrice]);

  async function copyResult() {
    if (!copyText) return;
    await navigator.clipboard.writeText(copyText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section aria-labelledby="fee-heading" className="space-y-7">
      <div>
        <h1 id="fee-heading" className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
          Broker fee calculator
        </h1>
        <p dir="rtl" className="mt-1 text-sm text-muted-foreground">حاسبة عمولة الوسيط</p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="property-price" className="flex items-center justify-between gap-3">
            <span>Property price</span><span dir="rtl" className="text-muted-foreground">سعر العقار</span>
          </Label>
          <div className="relative">
            <Input id="property-price" inputMode="decimal" value={price} onChange={(event) => setPrice(formatInputNumber(event.target.value))} placeholder="800,000" className="h-12 pe-14 text-base" aria-invalid={priceError} aria-describedby={priceError ? "price-error" : undefined} />
            <span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground">SAR</span>
          </div>
          {priceError ? <p id="price-error" role="alert" className="text-sm text-destructive">Enter a price above zero · <span dir="rtl">أدخل سعراً أكبر من صفر</span></p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="fee-percent" className="flex items-center justify-between gap-3">
            <span>Broker fee</span><span dir="rtl" className="text-muted-foreground">نسبة العمولة</span>
          </Label>
          <div className="relative">
            <Input id="fee-percent" inputMode="decimal" value={percent} onChange={(event) => setPercent(formatInputNumber(event.target.value))} placeholder="2.5" className="h-12 pe-12 text-base" aria-invalid={percentError} aria-describedby={percentError ? "percent-error" : undefined} />
            <span className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">%</span>
          </div>
          <div className="grid grid-cols-3 gap-2" aria-label="Quick fee percentages">
            {["1", "2", "2.5"].map((value) => (
              <Button key={value} type="button" variant={percent === value ? "default" : "outline"} className="h-11" onClick={() => setPercent(value)} aria-pressed={percent === value}>
                {value}%
              </Button>
            ))}
          </div>
          {percentError ? <p id="percent-error" role="alert" className="text-sm text-destructive">Use a percentage from 0 to 100 · <span dir="rtl">أدخل نسبة بين 0 و100</span></p> : null}
        </div>
      </div>

      <div className="brand-gradient rounded-md p-6 text-primary-foreground sm:p-8" aria-live="polite">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-brand-gold-light">Broker fee · <span dir="rtl">العمولة</span></p>
            <p className="mt-3 break-words font-display text-4xl font-semibold text-brand-gold-light sm:text-5xl">{isValid ? formatSar(fee) : "— SAR"}</p>
          </div>
          <Button type="button" variant="outline" size="sm" disabled={!isValid} onClick={() => void copyResult()} className="h-11 shrink-0 border-primary-foreground/35 bg-transparent px-3 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
            <span className="hidden sm:inline">{copied ? "Copied" : "Copy result"}</span>
          </Button>
        </div>
        <div className="mt-6 border-t border-primary-foreground/20 pt-4 text-sm">
          <span className="text-primary-foreground/70">Price after fee · <span dir="rtl">الصافي للمالك</span></span>
          <strong className="mt-1 block text-lg">{isValid ? formatSar(net) : "— SAR"}</strong>
        </div>
      </div>
    </section>
  );
}