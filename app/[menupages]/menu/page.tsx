 "use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
 import Image from "next/image";

type Params = {
  menupages: string;
};

type Item = {
  id: number;
  title: string;
  price: number;
  prep: string;
};

const items: Item[] = Array.from({ length: 7 }, (_, i) => ({
  id: i + 1,
  title: `Pizza Categories ${i + 1}`,
  price: 149,
  prep: "Prepare in 10 min",
}));

export default function MenuPage({ params }: { params: Params }) {
  const [qty, setQty] = useState<Record<number, number>>({});

  const totalItems = Object.values(qty).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(qty).reduce((sum, [id, q]) => {
    const item = items.find((it) => it.id === Number(id));
    return sum + (item ? item.price * q : 0);
  }, 0);

  const inc = (id: number) =>
    setQty((s) => ({ ...s, [id]: (s[id] || 0) + 1 }));
  const dec = (id: number) =>
    setQty((s) => {
      const v = (s[id] || 0) - 1;
      const n = { ...s };
      if (v <= 0) {
        delete n[id];
      } else {
        n[id] = v;
      }
      return n;
    });

  return (
    <div className="min-h-svh bg-background">
      <div className="mx-auto w-full max-w-[430px] min-h-svh bg-card shadow-2xl">
        <div className="sticky top-0 z-50 bg-card bg-white border-b shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-lg overflow-hidden bg-muted">
                <Image src="/images/item-pizza.svg" alt="logo" width={24} height={24} />
              </div>
              <div className="text-xl font-semibold text-foreground">
                <span className="text-primary">Smart</span>Dini
              </div>
            </div>
            <div className="relative">
              <div className="relative">
                <Button
                  aria-label="Open cart"
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white border shadow-xs"
                >
                  <ShoppingCart className="h-5 w-5 text-foreground" />
                </Button>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] leading-none px-1.5 py-0.5 rounded-full pointer-events-none">
                    {totalItems}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-3">
          <div className="rounded-xl bg-primary text-primary-foreground p-4 shadow">
            <div className="font-semibold">
              Scan. Order. Enjoy.
            </div>
            <div className="text-sm opacity-90">
              Where Menus Go Digital.
            </div>
          </div>

          <div className="mt-3 overflow-auto">
            <div className="flex items-center gap-4">
              {[
                { label: "Pizza", icon: "/images/pizza.svg" },
                { label: "French Fries", icon: "/images/fries.svg" },
                { label: "Burger", icon: "/images/burger.svg" },
                { label: "Maggie", icon: "/images/maggie.svg" },
                { label: "Cold Coffee", icon: "/images/cold-coffee.svg" },
                { label: "Momos", icon: "/images/momos.svg" },
              ].map((c, i) => (
                <div key={i} className="flex flex-col items-center gap-1 min-w-16">
                  <div className="size-12 rounded-full bg-white border flex items-center justify-center overflow-hidden">
                    <Image src={c.icon} alt={c.label} width={24} height={24} />
                  </div>
                  <span className="text-[11px] text-foreground/80 text-center">
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <div className="text-base font-semibold text-foreground mb-2">
              Pizza Categories
            </div>
            <div className="space-y-3">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex items-center justify-between rounded-lg border bg-card px-3 py-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-lg bg-muted shrink-0 overflow-hidden">
                      <Image
                        src="/images/item-pizza.svg"
                        alt={it.title}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {it.title}
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        {it.prep}
                      </div>
                      <div className="text-xs text-foreground/70">₹{it.price}</div>
                    </div>
                  </div>
                  <div>
                    {qty[it.id] ? (
                      <div className="flex items-center gap-2 bg-muted rounded-full px-2 py-1">
                        <Button
                          size="icon-sm"
                          variant="outline"
                          onClick={() => dec(it.id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <div className="w-6 text-center text-sm">
                          {qty[it.id]}
                        </div>
                        <Button
                          size="icon-sm"
                          onClick={() => inc(it.id)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button onClick={() => inc(it.id)} className="px-6 bg-muted text-foreground hover:bg-muted/90 border rounded-full">
                        ADD
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 z-50 bg-card bg-white border-t px-4 py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm text-foreground/90">
              {totalItems} items in cart
              <div className="text-xs text-muted-foreground">Total ₹{totalPrice}</div>
            </div>
            <Link
              href={`/${params.menupages}/menu/checkout`}
              prefetch={false}
              className="w-40"
            >
              <Button className="w-full">Checkout</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
