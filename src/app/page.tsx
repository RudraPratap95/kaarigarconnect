"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Camera, FileText, Globe, Wand2, Loader2, IndianRupee, Tag, ShieldCheck, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function ArtisanUpload() {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("english");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleGenerate = async () => {
    if (!description && !file) {
      alert("Please provide a description or upload a photo.");
      return;
    }
    
    setLoading(true);
    setShowResult(false);
    
    // Simulate API call for the requested static result
    setTimeout(() => {
      setLoading(false);
      setShowResult(true);
    }, 1500);
  };

  const handlePublish = () => {
    const newProduct = {
      id: Date.now(),
      title: "Handcrafted Blue Pottery Vase",
      price: 1200,
      craft_type: "Pottery",
      artisan: "You",
      rating: 5.0,
      imageColor: "from-blue-600/40 to-indigo-900/40",
      previewImage: previewUrl // We'll pass the local URL for the prototype
    };

    // Retrieve existing custom products or initialize empty array
    const existingStr = sessionStorage.getItem("custom_products");
    const existingProducts = existingStr ? JSON.parse(existingStr) : [];
    
    // Add new product to the front
    sessionStorage.setItem("custom_products", JSON.stringify([newProduct, ...existingProducts]));
    
    router.push("/marketplace");
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 mt-4 md:mt-8 relative">
      <div className="bg-navy border border-teal/20 rounded-2xl shadow-xl shadow-teal/5 p-6 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Sell Your Craft</h1>
          <p className="text-gray-400">Snap. Describe. Sell. Our AI will handle the rest.</p>
        </div>

        <div className="space-y-6">
          {/* Photo Upload Section */}
          <div className="relative group">
            <label className={`flex flex-col items-center justify-center w-full ${previewUrl ? 'h-auto p-2' : 'h-48 pt-5 pb-6'} border-2 border-dashed border-teal/40 rounded-xl bg-teal/5 hover:bg-teal/10 hover:border-teal transition-all cursor-pointer overflow-hidden`}>
              {previewUrl ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden flex items-center justify-center bg-black/40">
                  <img src={previewUrl} alt="Preview" className="max-h-full max-w-full object-contain" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white font-medium flex items-center"><Camera className="w-5 h-5 mr-2" /> Change Photo</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <Camera className="w-12 h-12 text-teal mb-3 opacity-80 group-hover:opacity-100 transition-opacity" />
                  <p className="text-sm text-gray-300 font-medium font-sans">Click to upload photo</p>
                  <p className="text-xs text-gray-500 mt-1">or drag and drop here</p>
                </div>
              )}
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* Text Description */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <FileText className="w-4 h-4 mr-2 text-orange" />
              Describe your craft
            </label>
            <textarea
              className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-4 focus:ring-2 focus:ring-orange focus:border-transparent transition-all outline-none"
              rows={3}
              placeholder="E.g., Hand-painted blue pottery vase from Jaipur..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Language Selector */}
          <div>
            <div className="flex space-x-4">
              <button
                onClick={() => setLanguage("english")}
                className={`flex-1 py-2.5 rounded-xl font-medium transition-all text-sm ${
                  language === "english" 
                    ? "bg-teal/20 text-teal border-teal border" 
                    : "bg-slate-800 text-gray-400 border border-transparent hover:bg-slate-700"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage("hindi")}
                className={`flex-1 py-2.5 rounded-xl font-medium transition-all text-sm ${
                  language === "hindi" 
                    ? "bg-teal/20 text-teal border-teal border" 
                    : "bg-slate-800 text-gray-400 border border-transparent hover:bg-slate-700"
                }`}
              >
                हिंदी (Hindi)
              </button>
            </div>
          </div>

          {/* Action Button */}
          {!showResult && (
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full flex items-center justify-center p-4 bg-gradient-to-r from-teal to-teal/80 hover:from-teal/90 hover:to-teal text-white rounded-xl font-bold text-lg shadow-lg shadow-teal/20 transition-all hover:-translate-y-1 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                  Generating Listing...
                </>
              ) : (
                <>
                  <Wand2 className="w-6 h-6 mr-3 text-orange" />
                  ✨ Generate AI Listing
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* AI Result Card - Renders inline after generation */}
      {showResult && (
        <div className="mt-8 animate-in slide-in-from-bottom-8 duration-500 fade-in">
          <div className="bg-navy border-2 border-orange/30 rounded-2xl overflow-hidden shadow-2xl shadow-orange/10 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange via-teal to-orange"></div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white leading-tight mb-1">Handcrafted Blue Pottery Vase</h3>
                  <div className="flex items-center space-x-3 text-sm">
                    <span className="text-teal-400 font-medium">Home Decor</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400 flex items-center"><Tag className="w-3 h-3 mr-1" /> Pottery</span>
                  </div>
                </div>
                <div className="bg-orange/10 text-orange font-bold px-4 py-2 rounded-xl text-lg flex items-center border border-orange/20">
                  <IndianRupee className="w-4 h-4 mr-1" /> 1,200
                </div>
              </div>

              <div className="bg-slate-800/40 rounded-xl p-4 mb-5 border border-slate-700/50">
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  A beautiful hand-painted blue pottery vase crafted by skilled artisans of Jaipur, carrying 200 years of heritage.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {["Handmade", "Jaipur Craft", "Traditional Art"].map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-teal/10 text-teal-300 rounded-full text-xs font-semibold border border-teal/20">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 pt-4 border-t border-slate-700">
                <button 
                  onClick={() => setShowResult(false)}
                  className="px-6 py-3 rounded-xl font-bold text-sm bg-slate-800 text-white hover:bg-slate-700 transition"
                >
                  Edit Output
                </button>
                <button 
                  onClick={handlePublish}
                  className="flex-1 py-3 px-6 rounded-xl font-bold text-lg bg-orange text-white hover:bg-[#ff8c42] shadow-lg shadow-orange/20 transition flex justify-center items-center group"
                >
                  <ShieldCheck className="w-5 h-5 mr-2" />
                  Publish to Marketplace
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
