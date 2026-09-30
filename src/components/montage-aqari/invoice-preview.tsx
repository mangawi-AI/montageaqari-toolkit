import { forwardRef } from "react";

import type { DocumentValues } from "./document-types";
import { formatDocumentDate, formatSar, parseDecimal } from "./number-utils";

interface InvoicePreviewProps {
  values: DocumentValues;
}

export const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(
  ({ values }, ref) => {
    const isQuote = values.kind === "quote";
    const amount = parseDecimal(values.amount);
    const title = isQuote ? "QUOTE" : "INVOICE";
    const arabicTitle = isQuote ? "عرض سعر" : "فاتورة";

    return (
      <div
        ref={ref}
        className="flex aspect-[210/297] w-full flex-col overflow-hidden bg-document text-document-ink shadow-tool [container-type:inline-size]"
        aria-label="Document preview"
      >
        <div className="flex h-[21cqw] items-center justify-between bg-brand-navy px-[6cqw] text-document">
          <div>
            <div className="font-display text-[5.2cqw] font-semibold leading-none">MontageAqari</div>
            <div dir="rtl" className="mt-[1cqw] text-[1.8cqw] text-brand-gold-light">
              مونتاج عقاري
            </div>
          </div>
          <div className="text-end">
            <div className="text-[2.4cqw] font-semibold">{title}</div>
            <div dir="rtl" className="mt-[0.7cqw] text-[1.8cqw] text-brand-gold-light">
              {arabicTitle}
            </div>
          </div>
        </div>

        <div className="flex-1 px-[7cqw] py-[6cqw]">
          <div className="mb-[6cqw] h-[0.7cqw] w-[15cqw] bg-brand-gold" />
          <div className="grid grid-cols-2 gap-[5cqw] text-[1.65cqw]">
            <div>
              <p className="font-semibold text-document-muted">DOCUMENT NO. · رقم المستند</p>
              <p className="mt-[1cqw] font-medium">{values.documentNumber || "—"}</p>
            </div>
            <div className="text-end">
              <p className="font-semibold text-document-muted">DATE · التاريخ</p>
              <p className="mt-[1cqw] font-medium">{formatDocumentDate(values.date)}</p>
            </div>
          </div>

          <div className="mt-[7cqw] border-s-[0.7cqw] border-brand-gold ps-[3cqw]">
            <p className="text-[1.7cqw] font-semibold text-document-muted">BILLED TO / إلى</p>
            <p dir="auto" className="mt-[1.2cqw] min-h-[3cqw] text-[2.6cqw] font-semibold">
              {values.clientName || "—"}
            </p>
          </div>

          <div className="mt-[8cqw] overflow-hidden border border-document-line">
            <div className="grid grid-cols-[1fr_30%] bg-document-soft px-[3cqw] py-[2cqw] text-[1.6cqw] font-semibold">
              <span>DESCRIPTION · الوصف</span>
              <span className="text-end">AMOUNT · المبلغ</span>
            </div>
            <div className="grid min-h-[20cqw] grid-cols-[1fr_30%] px-[3cqw] py-[3cqw] text-[1.8cqw]">
              <p dir="auto" className="whitespace-pre-wrap pe-[2cqw] leading-relaxed">
                {values.description || "—"}
              </p>
              <p className="text-end font-semibold">{amount !== null && amount > 0 ? formatSar(amount) : "—"}</p>
            </div>
            <div className="grid grid-cols-[1fr_30%] border-t border-document-line bg-document-soft px-[3cqw] py-[2.5cqw] text-[2cqw] font-bold">
              <span>TOTAL · الإجمالي</span>
              <span className="text-end">{amount !== null && amount > 0 ? formatSar(amount) : "—"}</span>
            </div>
          </div>

          <p dir="auto" className="mt-[5cqw] text-[1.55cqw] leading-relaxed text-document-muted">
            Prices in SAR. VAT not applicable · الأسعار بالريال السعودي، لا تنطبق ضريبة القيمة المضافة
          </p>
          {values.freelanceNumber.trim() ? (
            <p dir="auto" className="mt-[2cqw] text-[1.55cqw] text-document-muted">
              Freelance document no. · رقم وثيقة العمل الحر: {values.freelanceNumber}
            </p>
          ) : null}
        </div>

        <div className="border-t border-document-line px-[7cqw] py-[2.5cqw] text-center text-[1.35cqw] text-document-muted">
          MontageAqari · By Mohsen Sami Angawi · <span dir="rtl">محسن سامي عنقاوي</span>
        </div>
      </div>
    );
  },
);

InvoicePreview.displayName = "InvoicePreview";