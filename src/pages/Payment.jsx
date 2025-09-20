import BackToHomeButton from "../components/BackToHomeButton";
import React, { useState } from "react";

const paymentMethods = [
  { id: "card", label: "Credit/Debit Card", icon: "💳" },
  { id: "upi", label: "UPI / QR Code", icon: "📱" },
  { id: "netbanking", label: "Net Banking", icon: "🏦" },
  { id: "cod", label: "Cash on Delivery", icon: "💵" },
];

export default function Payment() {
  const [selected, setSelected] = useState("card");
  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [upi, setUpi] = useState("");
  const [paid, setPaid] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handlePay = (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setPaid(true);
      setProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="absolute left-4 top-4">
        <BackToHomeButton />
      </div>
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-green-100 p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-green-900 text-center mb-2">
          Payment
        </h1>
        <div className="bg-green-50 rounded-lg p-4 mb-2">
          <div className="flex justify-between items-center mb-1">
            <span className="font-semibold text-green-800">Order Total</span>
            <span className="text-lg font-bold text-green-900">₹2,350</span>
          </div>
          <div className="text-xs text-gray-600">
            (Demo: Replace with real cart/order summary)
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-green-800 mb-2">
            Select Payment Method
          </h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {paymentMethods.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelected(m.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                  selected === m.id
                    ? "bg-green-600 text-white border-green-700"
                    : "bg-white text-green-900 border-green-200 hover:bg-green-50"
                }`}
                type="button"
              >
                <span className="text-xl">{m.icon}</span> {m.label}
              </button>
            ))}
          </div>
          <form onSubmit={handlePay} className="space-y-4">
            {selected === "card" && (
              <div className="space-y-3">
                <input
                  type="text"
                  required
                  maxLength={16}
                  pattern="[0-9]{16}"
                  placeholder="Card Number"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                  value={card.number}
                  onChange={(e) => setCard({ ...card, number: e.target.value })}
                />
                <input
                  type="text"
                  required
                  placeholder="Name on Card"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                  value={card.name}
                  onChange={(e) => setCard({ ...card, name: e.target.value })}
                />
                <div className="flex gap-3">
                  <input
                    type="text"
                    required
                    maxLength={5}
                    pattern="[0-9]{2}/[0-9]{2}"
                    placeholder="MM/YY"
                    className="w-1/2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                    value={card.expiry}
                    onChange={(e) =>
                      setCard({ ...card, expiry: e.target.value })
                    }
                  />
                  <input
                    type="password"
                    required
                    maxLength={3}
                    pattern="[0-9]{3}"
                    placeholder="CVV"
                    className="w-1/2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                    value={card.cvv}
                    onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                  />
                </div>
              </div>
            )}
            {selected === "upi" && (
              <div className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Enter UPI ID (e.g. name@bank)"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                  value={upi}
                  onChange={(e) => setUpi(e.target.value)}
                />
                <div className="text-xs text-gray-500">
                  Or scan QR code in your UPI app
                </div>
                <div className="flex justify-center">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=upi://pay?pa=demo@upi"
                    alt="UPI QR"
                    className="rounded"
                  />
                </div>
              </div>
            )}
            {selected === "netbanking" && (
              <div className="space-y-3">
                <select
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                >
                  <option value="">Select Bank</option>
                  <option>State Bank of India</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  <option>Kotak Mahindra Bank</option>
                </select>
                <div className="text-xs text-gray-500">
                  You will be redirected to your bank's secure page.
                </div>
              </div>
            )}
            {selected === "cod" && (
              <div className="text-green-700 font-medium">
                Pay with cash when your seeds are delivered.
              </div>
            )}
            <button
              type="submit"
              disabled={processing || paid}
              className="w-full py-3 bg-green-700 text-white rounded-lg font-bold text-lg mt-2 hover:bg-green-800 transition-colors duration-200 disabled:opacity-60"
            >
              {processing
                ? "Processing..."
                : paid
                ? "Payment Successful!"
                : "Pay Now"}
            </button>
            {paid && (
              <div className="text-green-700 text-center font-semibold mt-2">
                Thank you for your purchase!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
