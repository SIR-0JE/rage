'use client';

import { useState } from 'react';
import Link from 'next/link';
import VaultGate from '@/components/vault/VaultGate';
import DistortedGrid from '@/components/store/DistortedGrid';
import BrutalistCart from '@/components/cart/BrutalistCart';

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[var(--color-obsidian)] text-white overflow-x-hidden">
      <VaultGate onUnlock={() => setIsUnlocked(true)} />
      <BrutalistCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Main Content */}
      <div
        className={`transition-opacity duration-1000 ${isUnlocked ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none fixed inset-0'}`}
      >
        <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-30 mix-blend-difference">
          <h1 className="text-4xl font-black tracking-tighter text-stretch text-[var(--color-signal)] cursor-pointer select-none">
            RAGE
          </h1>
          <nav className="font-mono text-xs tracking-widest flex gap-4">
            <Link href="/archive" className="hover:text-[var(--color-signal)] cursor-pointer">[ARCHIVE]</Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="hover:text-[var(--color-signal)] cursor-pointer uppercase"
            >
              cart(03)
            </button>
          </nav>
        </header>

        <section className="pt-32 pb-20 max-w-7xl mx-auto">
          <DistortedGrid />
        </section>

        <footer className="py-12 flex justify-between items-end px-6 border-t border-white/10 text-white/20 font-mono text-xs">
          <div>
            <p>EST. 2026 // YATI_CORP</p>
            <p>DIGITAL_FLAGSHIP_V2</p>
          </div>
          <div className="text-right">
            <p>NO RETURNS</p>
            <p>NO REGRETS</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
