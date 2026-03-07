export default function StatsBar() {
  return (
    <div className="bg-teal text-white py-3 px-4 text-center text-sm md:text-base font-medium shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center md:space-x-8 gap-2 md:gap-0">
        <span>✨ 1,200+ Artisans</span>
        <span className="hidden md:inline text-teal-200">|</span>
        <span>🛍️ 8,500+ Products</span>
        <span className="hidden md:inline text-teal-200">|</span>
        <span>💸 ₹45L+ Sales</span>
      </div>
    </div>
  );
}
