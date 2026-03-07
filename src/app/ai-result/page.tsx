"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ChevronRight, Tag, Info, Sparkles } from "lucide-react";

export default function AIResult() {
  const router = useRouter();
  const [listing, setListing] = useState<any>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("ai_listing_result");
    if (data) {
      setListing(JSON.parse(data));
    } else {
      // Fallback if accessed directly
      router.push("/");
    }
  }, [router]);

  const handleApprove = () => {
    router.push("/pricing");
  };

  if (!listing) return null; // Or a loading skeleton here if needed

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 mt-4 md:mt-10">
      <div className="flex items-center justify-center space-x-2 text-teal mb-8">
        <Sparkles className="w-6 h-6" />
        <h1 className="text-3xl font-bold text-white text-center">AI Crafted Listing</h1>
        <Sparkles className="w-6 h-6" />
      </div>

      <div className="bg-navy border border-teal/20 rounded-3xl overflow-hidden shadow-2xl shadow-teal/5">
        
        {/* Mock Image Area (since we aren't uploading an actual image to a bucket yet) */}
        <div className="h-64 bg-slate-800 relative w-full flex items-center justify-center overflow-hidden">
             <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal via-navy to-navy"></div>
             <p className="text-gray-500 z-10 font-medium tracking-widest uppercase text-sm">Product Image Preview</p>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">{listing.title}</h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange/20 text-orange whitespace-nowrap ml-4">
                {listing.craft_type}
              </span>
            </div>
          </div>

          <div className="space-y-4">
             <h3 className="text-lg font-semibold text-teal flex items-center">
              <Info className="w-5 h-5 mr-2" /> 
              Description
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              {listing.description}
            </p>
          </div>

          <div className="bg-teal/5 border border-teal/10 rounded-2xl p-5 mt-6">
             <h3 className="text-md font-semibold text-orange mb-2 flex items-center">
               Artisan Story
             </h3>
             <p className="text-teal-50 italic text-md">
               &ldquo;{listing.artisan_story}&rdquo;
             </p>
          </div>

          {listing.suggested_keywords && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-700/50">
              <Tag className="w-5 h-5 text-gray-500 mr-2" />
              {listing.suggested_keywords.map((tag: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-slate-800 text-gray-300 rounded-full text-sm font-medium"> # {tag} </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row gap-4">
        <button 
          onClick={() => router.push("/")}
          className="flex-1 py-4 px-6 rounded-xl font-bold text-lg bg-slate-800 text-white hover:bg-slate-700 transition"
        >
          Edit Details
        </button>
        <button 
          onClick={handleApprove}
          className="flex-[2] py-4 px-6 rounded-xl font-bold text-lg bg-teal text-white hover:bg-teal-600 shadow-lg shadow-teal/20 transition flex justify-center items-center"
        >
          <CheckCircle2 className="w-6 h-6 mr-2" />
          Approve & Set Price
          <ChevronRight className="w-5 h-5 ml-1" />
        </button>
      </div>
    </div>
  );
}
