"use client";
import { useState } from "react";
import { Mic, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="relative z-20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-sky-500 to-indigo-500 p-1.5 rounded-lg">
            <Mic className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl text-slate-900">VoiceForm</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-slate-600 hover:text-indigo-600 font-medium text-sm transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-700 hover:text-indigo-600"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-lg z-20">
          <ul className="flex flex-col p-4">
            {navItems.map((item) => (
              <li key={item.label} className="py-2">
                <a
                  href={item.href}
                  className="text-slate-700 hover:text-indigo-600 font-medium block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-4 mt-2 border-t border-slate-100">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                Get Started
              </Button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
