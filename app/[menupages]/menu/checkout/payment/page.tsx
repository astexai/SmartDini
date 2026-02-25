 "use client";

import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type Params = {
  menupages: string;
};

export default function PaymentPage({ params }: { params: Params }) {
  const [method, setMethod] = useState<"card" | "upi" | "netbanking">("card");
  const amount = 646;

  return (
    <div className="min-h-svh bg-background">
      <div className="mx-auto w-full max-w-[430px] min-h-svh bg-card shadow-2xl">
        <div className="sticky top-0 z-50 bg-card bg-white border-b shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <Link href={`/${params.menupages}/menu/checkout`} className="flex items-center">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="text-lg font-semibold">Checkout</div>
            <Button variant="outline" size="icon" className="rounded-full bg-white border shadow-xs">
              <ShoppingCart className="h-5 w-5 text-foreground" />
            </Button>
          </div>
        </div>

        <div className="px-4 py-4 space-y-4">
          <div className="rounded-xl border bg-white p-3">
            <div className="text-sm font-semibold mb-2">Payment Method</div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="method"
                  checked={method === "card"}
                  onChange={() => setMethod("card")}
                />
                Credit/Debit Card
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="method"
                  checked={method === "upi"}
                  onChange={() => setMethod("upi")}
                />
                UPI
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="method"
                  checked={method === "netbanking"}
                  onChange={() => setMethod("netbanking")}
                />
                Net Banking
              </label>
            </div>
          </div>

          {method === "card" && (
            <div className="rounded-xl border bg-white p-3 space-y-3">
              <Input placeholder="1234 5678 1234 XXXX" />
              <div className="grid grid-cols-3 gap-2">
                <Input placeholder="MM/YY" />
                <Input placeholder="CVV" />
                <div />
              </div>
              <Input placeholder="Name On Card" defaultValue="Aditya Patel" />
            </div>
          )}
        </div>

        <div className="sticky bottom-0 z-50 bg-card bg-white border-t px-4 py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
          <Button className="w-full">Pay ₹{amount}</Button>
        </div>
      </div>
    </div>
  );
}
