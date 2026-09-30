import { Download, LoaderCircle } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import type { DocumentKind, DocumentValues } from "./document-types";
import { InvoicePreview } from "./invoice-preview";
import { formatInputNumber, parseDecimal } from "./number-utils";

const documentSchema = z.object({
  kind: z.enum(["quote", "invoice"]),
  clientName: z.string().trim().min(1, "Client name is required · اسم العميل مطلوب"),
  description: z.string(),
  amount: z.string().refine((value) => {
    const amount = parseDecimal(value);
    return amount !== null && amount > 0;
  }, "Enter an amount above zero · أدخل مبلغاً أكبر من صفر"),
  date: z.string(),
  documentNumber: z.string(),
  freelanceNumber: z.string(),
});

function currentDate(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Riyadh", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

function suggestedNumber(): string {
  const year = new Intl.DateTimeFormat("en", { timeZone: "Asia/Riyadh", year: "numeric" }).format(new Date());
  return `MA-${year}-001`;
}

export function InvoiceGenerator() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const { register, setValue, watch, trigger, formState: { errors, isValid } } = useForm<DocumentValues>({
    resolver: zodResolver(documentSchema),
    mode: "onChange",
    defaultValues: { kind: "quote", clientName: "", description: "", amount: "", date: currentDate(), documentNumber: suggestedNumber(), freelanceNumber: "" },
  });
  const values = watch();

  async function downloadPdf() {
    const valid = await trigger();
    if (!valid || !previewRef.current) return;
    setExporting(true);
    try {
      await document.fonts.ready;
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas"), import("jspdf")]);
      const canvas = await html2canvas(previewRef.current, { scale: 3, backgroundColor: "#ffffff", useCORS: true, logging: false });
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.98), "JPEG", 0, 0, 210, 297, undefined, "FAST");
      const safeNumber = values.documentNumber.trim().replace(/[^a-zA-Z0-9_-]+/g, "_") || "Document";
      const label = values.kind === "quote" ? "Quote" : "Invoice";
      pdf.save(`MontageAqari_${label}_${safeNumber}.pdf`);
    } finally {
      setExporting(false);
    }
  }

  return (
    <section aria-labelledby="document-heading" className="space-y-7">
      <div>
        <h1 id="document-heading" className="font-display text-3xl font-semibold text-foreground sm:text-4xl">Quote / Invoice</h1>
        <p dir="rtl" className="mt-1 text-sm text-muted-foreground">عرض سعر / فاتورة</p>
      </div>

      <ToggleGroup type="single" value={values.kind} onValueChange={(value) => { if (value) setValue("kind", value as DocumentKind, { shouldValidate: true }); }} className="grid grid-cols-2 rounded-md border border-border bg-muted p-1">
        <ToggleGroupItem value="quote" className="h-11 data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm">Quote · عرض سعر</ToggleGroupItem>
        <ToggleGroupItem value="invoice" className="h-11 data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm">Invoice · فاتورة</ToggleGroupItem>
      </ToggleGroup>

      <div className="space-y-5">
        <Field label="Client name" arabic="اسم العميل" error={errors.clientName?.message}>
          <Input className="h-12" dir="auto" autoComplete="name" {...register("clientName")} aria-invalid={Boolean(errors.clientName)} />
        </Field>
        <Field label="Service description" arabic="وصف الخدمة">
          <Textarea className="min-h-28 resize-y" dir="auto" {...register("description")} />
        </Field>
        <Field label="Amount in SAR" arabic="المبلغ" error={errors.amount?.message}>
          <div className="relative"><Input className="h-12 pe-14" inputMode="decimal" {...register("amount", { onChange: (event) => setValue("amount", formatInputNumber(event.target.value), { shouldValidate: true }) })} aria-invalid={Boolean(errors.amount)} /><span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground">SAR</span></div>
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Date" arabic="التاريخ"><Input className="h-12" type="date" {...register("date")} /></Field>
          <Field label="Document number" arabic="رقم المستند"><Input className="h-12" {...register("documentNumber")} /></Field>
        </div>
        <Field label="Freelance document no. (optional)" arabic="رقم وثيقة العمل الحر (اختياري)"><Input className="h-12" inputMode="numeric" {...register("freelanceNumber")} /></Field>
      </div>

      <div className="space-y-3">
        <div className="flex items-end justify-between gap-4"><div><h2 className="font-display text-2xl font-semibold">Live preview</h2><p dir="rtl" className="text-xs text-muted-foreground">معاينة المستند</p></div><span className="text-xs font-medium text-muted-foreground">A4</span></div>
        <div className="mx-auto w-full max-w-[560px] overflow-hidden rounded-sm border border-border"><InvoicePreview ref={previewRef} values={values} /></div>
      </div>

      <Button type="button" onClick={() => void downloadPdf()} disabled={!isValid || exporting} className="h-12 w-full bg-brand-gold text-brand-navy shadow hover:bg-brand-gold/90">
        {exporting ? <LoaderCircle className="animate-spin" aria-hidden="true" /> : <Download aria-hidden="true" />}
        {exporting ? "Preparing PDF · جاري إعداد الملف" : "Download PDF · تحميل PDF"}
      </Button>
      {!isValid ? <p className="text-center text-xs text-muted-foreground">Add a client name and valid amount to download · <span dir="rtl">أضف اسم العميل ومبلغاً صحيحاً للتحميل</span></p> : null}
    </section>
  );
}

interface FieldProps { label: string; arabic: string; error?: string | undefined; children: React.ReactNode; }
function Field({ label, arabic, error, children }: FieldProps) {
  return <div className="space-y-2"><Label className="flex items-center justify-between gap-3"><span>{label}</span><span dir="rtl" className="text-end text-muted-foreground">{arabic}</span></Label>{children}{error ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}</div>;
}