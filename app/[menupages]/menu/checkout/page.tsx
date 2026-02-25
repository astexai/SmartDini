 "use client";

import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
 import Image from "next/image";

type Params = {
  menupages: string;
};

const order = [
  { id: 1, title: "Pizza Categories 1", price: 299, qty: 1, prep: "Prepare in 10 min" },
  { id: 2, title: "Pizza Categories 2", price: 199, qty: 2, prep: "Prepare in 10 min" },
  { id: 3, title: "Pizza Categories 3", price: 149, qty: 1, prep: "Prepare in 10 min" },
];

export default function CheckoutPage({ params }: { params: Params }) {
  const total = order.reduce((s, o) => s + o.price * o.qty, 0);

  return (
    <div className="min-h-svh bg-background">
      <div className="mx-auto w-full max-w-[430px] min-h-svh bg-card shadow-2xl">
        <div className="sticky top-0 z-50 bg-card bg-white border-b shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <Link href={`/${params.menupages}/menu`} className="flex items-center">
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
          <div className="rounded-xl border bg-muted/30 p-3">
            <div className="text-sm font-semibold mb-2">Order Summary</div>
            <div className="space-y-3">
              {order.map((o) => (
                <div key={o.id} className="flex items-start justify-between rounded-lg bg-white p-3 border">
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-lg bg-muted shrink-0 overflow-hidden">
                      <Image src="/images/item-pizza.svg" alt={o.title} width={48} height={48} />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{o.title}</div>
                      <div className="text-[11px] text-muted-foreground">{o.prep}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">₹{o.price}</div>
                    <div className="text-[11px] text-muted-foreground">Quantity: {o.qty}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border bg-white p-3">
            <div className="flex items-center justify-between text-sm">
              <div>Total :</div>
              <div className="font-semibold">₹{total}</div>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-3">
            <div className="text-sm font-semibold mb-2">Table Number</div>
            <Input placeholder="Enter your table no." />
            <div className="text-[11px] text-muted-foreground mt-1">eg: 01</div>
          </div>
        </div>

        <div className="sticky bottom-0 z-50 bg-card bg-white border-t px-4 py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
          <Link href={`/${params.menupages}/menu/checkout/payment`} className="block">
            <Button className="w-full">make Payment</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
