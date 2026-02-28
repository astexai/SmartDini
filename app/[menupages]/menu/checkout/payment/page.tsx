"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Smartphone, Wallet, CheckCircle } from "lucide-react";

type PaymentMethod = "upi" | "cash";

// For Next.js 15, we need to handle params as a Promise
type PageProps = {
  params: Promise<{ menupages: string }>
}

export default async function PaymentPage({ params }: PageProps) {
  // Unwrap the params Promise
  const { menupages } = await params;
  
  return <PaymentPageContent menupages={menupages} />;
}

function PaymentPageContent({ menupages }: { menupages: string }) {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [upiId, setUpiId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const total = 467; // This would come from your cart state

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setProcessing(false);
    setPaymentComplete(true);
    
    // Redirect to order confirmation after 2 seconds
    setTimeout(() => {
      router.push(`/${menupages}/menu/order-confirmation`);
    }, 2000);
  };

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto bg-white min-h-screen flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-xl font-bold mb-2">Payment Successful!</h2>
            <p className="text-sm text-gray-600 mb-4">Your order has been placed</p>
            <p className="text-xs text-gray-500">Redirecting to order details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white border-b">
          <div className="px-4 py-3 flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold">Payment</h1>
          </div>
        </header>

        <div className="p-4 space-y-4">
          {/* Order Total */}
          <div className="bg-[#D32F2F]/5 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">Total Amount</p>
            <p className="text-2xl font-bold text-[#D32F2F]">₹{total}</p>
          </div>

          {/* Payment Methods */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h2 className="font-semibold mb-3">Payment Method</h2>
            <div className="space-y-3">
              {/* UPI Option */}
              <label className={`block border rounded-xl p-4 cursor-pointer transition-all ${
                paymentMethod === 'upi' ? 'border-[#D32F2F] bg-[#D32F2F]/5' : 'border-gray-200 bg-white'
              }`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                    className="w-4 h-4 text-[#D32F2F]"
                  />
                  <Smartphone className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">UPI</span>
                </div>
              </label>

              {/* Cash Only Option - Replaced COD */}
              <label className={`block border rounded-xl p-4 cursor-pointer transition-all ${
                paymentMethod === 'cash' ? 'border-[#D32F2F] bg-[#D32F2F]/5' : 'border-gray-200 bg-white'
              }`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                    className="w-4 h-4 text-[#D32F2F]"
                  />
                  <Wallet className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">Cash Only</span>
                </div>
              </label>
            </div>
          </div>

          {/* UPI Details - Show only if UPI selected */}
          {paymentMethod === 'upi' && (
            <div className="bg-gray-50 rounded-xl p-4">
              <h2 className="font-semibold mb-3">UPI Details</h2>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter UPI ID (e.g., name@okhdfcbank)"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/20"
                />
                <div className="grid grid-cols-3 gap-2">
                  {['gpay@okhdfcbank', 'phonepe@ybl', 'paytm@okhdfcbank'].map((id) => (
                    <button
                      key={id}
                      onClick={() => setUpiId(id)}
                      className="px-2 py-1.5 text-xs bg-white border rounded-lg hover:bg-gray-50"
                    >
                      {id.split('@')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Cash Only Info */}
          {paymentMethod === 'cash' && (
            <div className="bg-amber-50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Wallet className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-800 mb-1">Cash Only</h3>
                  <p className="text-xs text-amber-700">
                    Please pay ₹{total} in cash at the counter or to the delivery person. 
                    Exact change is appreciated.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={processing || (paymentMethod === 'upi' && !upiId)}
            className="w-full bg-[#D32F2F] text-white py-4 rounded-xl font-semibold hover:bg-[#B71C1C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              `Pay ₹${total}`
            )}
          </button>

          {/* Security Note */}
          <p className="text-xs text-center text-gray-500">
            🔒 Your payment information is secure
          </p>
        </div>
      </div>
    </div>
  );
}