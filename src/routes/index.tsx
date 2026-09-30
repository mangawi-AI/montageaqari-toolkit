import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/montage-aqari/app-shell";
import { FeeCalculator } from "@/components/montage-aqari/fee-calculator";
import { InvoiceGenerator } from "@/components/montage-aqari/invoice-generator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MontageAqari Broker Toolkit" },
      { name: "description", content: "A private, browser-based broker fee calculator and bilingual quote or invoice generator for Saudi real-estate professionals." },
      { property: "og:title", content: "MontageAqari Broker Toolkit" },
      { property: "og:description", content: "Calculate broker fees and create polished bilingual quotes or invoices directly in your browser." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <AppShell>
      <Tabs defaultValue="fee" className="w-full">
        <TabsList className="grid h-auto w-full grid-cols-2 rounded-none border-b border-border bg-transparent p-0">
          <TabsTrigger value="fee" className="min-h-16 whitespace-normal rounded-none border-b-2 border-transparent px-2 py-3 text-xs shadow-none data-[state=active]:border-brand-gold data-[state=active]:bg-transparent data-[state=active]:shadow-none sm:text-sm">
            حاسبة العمولة · Fee Calculator
          </TabsTrigger>
          <TabsTrigger value="document" className="min-h-16 whitespace-normal rounded-none border-b-2 border-transparent px-2 py-3 text-xs shadow-none data-[state=active]:border-brand-gold data-[state=active]:bg-transparent data-[state=active]:shadow-none sm:text-sm">
            عرض سعر / فاتورة · Quote / Invoice
          </TabsTrigger>
        </TabsList>
        <div className="mt-6 rounded-lg border border-border bg-card p-5 text-card-foreground shadow-tool sm:p-8">
          <TabsContent value="fee" className="mt-0"><FeeCalculator /></TabsContent>
          <TabsContent value="document" className="mt-0"><InvoiceGenerator /></TabsContent>
        </div>
      </Tabs>
    </AppShell>
  );
}
