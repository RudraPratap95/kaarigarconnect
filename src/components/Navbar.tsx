import Link from "next/link";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-navy border-b border-teal/20 text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Kaarigar<span className="text-orange">Connect</span>
        </Link>
        
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="hover:text-teal transition-colors">Upload</Link>
          <Link href="/marketplace" className="hover:text-teal transition-colors">Marketplace</Link>
          <button className="bg-orange hover:bg-orange/90 text-white px-5 py-2 rounded-full font-medium transition-transform hover:scale-105">
            Seller Dashboard
          </button>
        </div>

        <button className="md:hidden p-2 text-white">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}
