"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Info, IndianRupee, Store, TrendingUp } from "lucide-react";

// Helper for price ranges based on user requirements
const getPriceRange = (craftType: string) => {
  const type = craftType?.toLowerCase() || "";
  if (type.includes("pottery")) return { min: 300, max: 800, suggest: 500 };
  if (type.includes("chikankari") || type.includes("embroidery")) return { min: 800, max: 2500, suggest: 1500 };
  if (type.includes("weaving") || type.includes("fabric")) return { min: 500, max: 1500, suggest: 900 };
  if (type.includes("painting") || type.includes("art")) return { min: 400, max: 1200, suggest: 800 };
  if (type.includes("jewellery") || type.includes("jewelry")) return { min: 600, max: 2000, suggest: 1200 };
  
  // Default range
  return { min: 400, max: 1500, suggest: 800 };
};

export default function SmartPricing() {
  const router = useRouter();
  const [listing, setListing] = useState<any>(null);
  const [range, setRange] = useState({ min: 400, max: 1500, suggest: 800 });
  const [price, setPrice] = useState(800);

  useEffect(() => {
    const data = sessionStorage.getItem("ai_listing_result");
    if (data) {
      const parsed = JSON.parse(data);
      setListing(parsed);
      const calculatedRange = getPriceRange(parsed.craft_type);
      setRange(calculatedRange);
      setPrice(calculatedRange.suggest);
    } else {
      router.push("/");
    }
  }, [router]);

  const handleListProduct = () => {
    // We could save this to a global state/db, for prototype we just navigate to marketplace
    alert("Product listed successfully!");
    router.push("/marketplace");
  };

  if (!listing) return null;

  return (
    <div className="max-w-xl mx-auto p-4 md:p-8 mt-4 md:mt-12 bg-navy border border-teal/20 rounded-3xl shadow-xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white mb-3">Smart Pricing</h1>
        <p className="text-gray-400">Set a competitive price for your <strong>{listing.craft_type}</strong> based on market trends.</p>
      </div>

      <div className="bg-slate-800/50 rounded-2xl p-6 mb-8 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-200 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-teal" />
            Suggested Range
          </h2>
          <span className="text-teal font-bold bg-teal/10 px-3 py-1 rounded-full">
            ₹{range.min} - ₹{range.max}
          </span>
        </div>

        <div className="space-y-6 mt-8">
          <div className="flex justify-between text-sm font-medium text-gray-400">
            <span>₹{Math.max(100, range.min - 300)}</span>
            <span>₹{range.max + 500}</span>
          </div>
          
          <input
            type="range"
            min={Math.max(100, range.min - 300)}
            max={range.max + 500}
            step="50"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange"
          />
          
          <div className="flex items-center justify-center p-4 bg-navy border-2 border-orange/40 rounded-xl">
            <IndianRupee className="w-8 h-8 text-orange mr-2" />
            <span className="text-4xl font-bold text-white">{price}</span>
          </div>
        </div>
      </div>

      <div className="bg-teal/10 rounded-xl p-4 flex items-start mb-8 text-sm text-teal-100 border border-teal/20">
        <Info className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-teal" />
        <p>
          Products priced within our suggested AI range sell <strong>3x faster</strong>. 
          Your listing looks great and is ready for the KaarigarConnect marketplace!
        </p>
      </div>

      <button
        onClick={handleListProduct}
        className="w-full py-4 px-6 bg-gradient-to-r from-orange to-[#ff8c42] hover:from-[#d1611d] hover:to-orange text-white rounded-xl font-bold text-xl shadow-lg shadow-orange/20 transition-all hover:-translate-y-1 flex items-center justify-center"
      >
        <Store className="w-6 h-6 mr-3" />
        List My Product
      </button>
    </div>
  );
}
