'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const collections = [
    { id: 'S02', title: 'SEASON_02 // VOID_WALKER', year: '2025', image: '/img/obsidian-jacket.png' },
    { id: 'S01', title: 'SEASON_01 // GENESIS', year: '2024', image: '/img/signal-boots.png' },
    { id: 'S00', title: 'SEASON_00 // PROTOTYPES', year: '2023', image: '/img/yati-tee.png' },
];

export default function ArchivePage() {
    return (
        <main className="min-h-screen bg-[var(--color-obsidian)] text-white overflow-hidden flex flex-col">
            <div className="fixed top-0 left-0 w-full p-6 z-30 flex justify-between items-center mix-blend-difference">
                <Link href="/" className="text-4xl font-black tracking-tighter text-stretch text-[var(--color-signal)] hover:text-white transition-colors">
                    RAGE
                </Link>
                <span className="font-mono text-xs tracking-widest text-white/50">
                    ARCHIVE_VAULT
                </span>
            </div>

            <div className="flex-1 flex items-center overflow-x-auto gap-12 px-12 md:px-24 snap-x snap-mandatory hide-scrollbar">
                {collections.map((col, index) => (
                    <motion.div
                        key={col.id}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.8, ease: "circOut" }}
                        className="flex-shrink-0 w-[80vw] md:w-[40vw] h-[70vh] relative group snap-center"
                    >
                        <div className="absolute -top-12 left-0 font-mono text-xs text-white/40 tracking-[0.2em] group-hover:text-[var(--color-signal)] transition-colors">
                            {col.id}
                        </div>

                        <div className="w-full h-full relative border border-white/10 group-hover:border-[var(--color-signal)] transition-all duration-500 overflow-hidden">
                            <Image
                                src={col.image}
                                alt={col.title}
                                fill
                                className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 group-hover:from-[var(--color-signal)] group-hover:to-white transition-all">
                                    {col.title}
                                </h2>
                                <div className="flex justify-between font-mono text-sm text-white/60 border-t border-white/20 pt-4 mt-4">
                                    <Link href={`/archive/${col.id}`} className="hover:text-[var(--color-signal)] transition-colors cursor-pointer">
                                        FULL_COLLECTION_VIEW &rarr;
                                    </Link>
                                    <span>{col.year}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}

                <div className="flex-shrink-0 w-[20vw] flex items-center justify-center font-mono text-xs text-white/20 tracking-widest -rotate-90">
                    END_OF_ARCHIVE
                </div>
            </div>
        </main>
    );
}
