"use client";

import { useState, useEffect } from "react";
import { Search, Filter, ShoppingBag, CheckCircle2, Star } from "lucide-react";

// 6 Dummy products
const initialDummyProducts = [
  {
    id: 1,
    title: "Handpainted Blue Pottery Vase",
    price: 650,
    craft_type: "Pottery",
    artisan: "Ramesh Kumar",
    rating: 4.8,
    imageColor: "from-blue-600/40 to-indigo-900/40"
  },
  {
    id: 2,
    title: "Intricate Chikankari Kurta",
    price: 1800,
    craft_type: "Embroidery",
    artisan: "Fatima Begum",
    rating: 4.9,
    imageColor: "from-teal-600/40 to-emerald-900/40"
  },
  {
    id: 3,
    title: "Banarasi Silk Saree",
    price: 4500,
    craft_type: "Weaving",
    artisan: "Varanasi Weavers Co.",
    rating: 5.0,
    imageColor: "from-orange-600/40 to-red-900/40"
  },
  {
    id: 4,
    title: "Madhubani Wall Painting",
    price: 1200,
    craft_type: "Painting",
    artisan: "Sita Devi",
    rating: 4.7,
    imageColor: "from-yellow-600/40 to-orange-900/40"
  },
  {
    id: 5,
    title: "Oxidised Silver Jhumkas",
    price: 850,
    craft_type: "Jewellery",
    artisan: "Kutch Silversmiths",
    rating: 4.6,
    imageColor: "from-slate-500/40 to-slate-800/40"
  },
  {
    id: 6,
    title: "Terracotta Horse Figurine",
    price: 450,
    craft_type: "Pottery",
    artisan: "Bankura Artisans",
    rating: 4.5,
    imageColor: "from-red-800/40 to-orange-900/40"
  }
];

const craftTypes = ["All", "Pottery", "Embroidery", "Weaving", "Painting", "Jewellery", "Home Decor"];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCraft, setSelectedCraft] = useState("All");
  const [purchasedId, setPurchasedId] = useState<number | null>(null);
  const [products, setProducts] = useState<any[]>(initialDummyProducts);

  useEffect(() => {
    // Load any custom products added by the artisan from session storage
    const customStr = sessionStorage.getItem("custom_products");
    if (customStr) {
      try {
        const customProducts = JSON.parse(customStr);
        setProducts([...customProducts, ...initialDummyProducts]);
      } catch (e) {
        console.error("Failed to parse custom products", e);
      }
    }
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.artisan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCraft = selectedCraft === "All" || product.craft_type === selectedCraft;
    return matchesSearch && matchesCraft;
  });

  const handleBuyNow = (id: number) => {
    setPurchasedId(id);
    setTimeout(() => {
      setPurchasedId(null);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Header section with Search and Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Discover Authentic Crafts</h1>
          <p className="text-gray-400 font-medium">Support Indian artisans directly.</p>
        </div>
        
        <div className="w-full md:w-1/3 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search crafts, artisans..."
            className="w-full bg-slate-800/80 border border-slate-700 text-white rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-teal"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Craft Filters */}
      <div className="flex overflow-x-auto pb-4 mb-8 custom-scrollbar gap-3 hide-scrollbar">
        <div className="flex items-center text-gray-400 mr-2 flex-shrink-0">
          <Filter className="w-5 h-5 mr-2" />
          <span className="font-medium text-sm">Filter by:</span>
        </div>
        {craftTypes.map(craft => (
          <button
            key={craft}
            onClick={() => setSelectedCraft(craft)}
            className={`px-5 py-2 rounded-full text-sm font-semibold flex-shrink-0 transition-all ${
              selectedCraft === craft 
              ? "bg-teal text-white shadow-lg shadow-teal/20" 
              : "bg-slate-800 text-gray-300 hover:bg-slate-700"
            }`}
          >
            {craft}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-teal/50 transition-all hover:shadow-xl hover:shadow-teal/10 group flex flex-col h-full">
            
            {/* Image mock or real preview */}
            {product.previewImage ? (
              <div className="h-56 w-full relative flex items-center justify-center bg-black/60 overflow-hidden">
                <img src={product.previewImage} alt={product.title} className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-semibold text-white absolute top-4 left-4 border border-white/10 z-10">
                  {product.craft_type}
                </span>
                <span className="absolute top-4 right-4 px-2 py-0.5 bg-orange/90 text-white text-[10px] font-bold rounded uppercase tracking-wider shadow-lg">New</span>
              </div>
            ) : (
              <div className={`h-56 w-full bg-gradient-to-br ${product.imageColor} relative flex items-center justify-center`}>
                 <span className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-xs font-semibold text-white absolute top-4 left-4 border border-white/10 z-10">
                   {product.craft_type}
                 </span>
                 <span className="group-hover:scale-110 transition-transform duration-500 opacity-60 text-white font-serif italic tracking-widest text-lg px-4 text-center">
                   Kaarigar Connect
                 </span>
              </div>
            )}

            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-white mb-1 line-clamp-1" title={product.title}>{product.title}</h3>
              <p className="text-teal-400 text-sm font-medium mb-3">by {product.artisan}</p>
              
              <div className="flex items-center mb-4 text-xs font-medium text-gray-400">
                <Star className="w-4 h-4 text-orange fill-orange mr-1" />
                <span>{product.rating} (120+ reviews)</span>
              </div>

              <div className="mt-auto flex items-center justify-between">
                <span className="text-2xl font-bold text-white">₹{product.price}</span>
                
                {purchasedId === product.id ? (
                  <button disabled className="bg-green-600/20 text-green-400 border border-green-500/30 px-4 py-2 rounded-xl font-bold flex items-center transition-all">
                    <CheckCircle2 className="w-5 h-5 mr-1" />
                    Order Placed!
                  </button>
                ) : (
                  <button 
                    onClick={() => handleBuyNow(product.id)}
                    className="bg-orange hover:bg-[#ff8c42] text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center shadow-lg shadow-orange/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Buy Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-slate-800/20 rounded-3xl border border-slate-700/50 border-dashed">
          <p className="text-gray-400 text-lg">No products found matching your criteria.</p>
          <button 
            onClick={() => {setSearchTerm(""); setSelectedCraft("All");}}
            className="mt-4 text-teal hover:text-teal-400 font-medium"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
