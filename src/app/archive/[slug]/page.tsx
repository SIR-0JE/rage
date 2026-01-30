'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Mock Data - In a real app this would be fetched
const collections = {
    'S02': {
        title: 'SEASON_02 // VOID_WALKER',
        year: '2025',
        description: "Exploration of negative space and the absence of light. Materials focus on absorption and reflection.",
        items: [
            { id: 'S02-01', name: 'OBSIDIAN_JACKET', price: '950.00', image: '/img/obsidian-jacket.png' },
            { id: 'S02-02', name: 'VOID_PANTS', price: '380.00', image: '/img/obsidian-jacket.png' },
            { id: 'S02-03', name: 'NULL_VEST', price: '520.00', image: '/img/obsidian-jacket.png' },
        ]
    },
    'S01': {
        title: 'SEASON_01 // GENESIS',
        year: '2024',
        description: "The beginning. Raw, industrial, unpolished. Signal red meets concrete grey.",
        items: [
            { id: 'S01-01', name: 'SIGNAL_BOOTS', price: '420.00', image: '/img/signal-boots.png' },
            { id: 'S01-02', name: 'ALERT_PARKA', price: '890.00', image: '/img/signal-boots.png' },
        ]
    },
    'S00': {
        title: 'SEASON_00 // PROTOTYPES',
        year: '2023',
        description: "Experimental forms and rapid prototyping artifacts.",
        items: [
            { id: 'S00-01', name: 'YATI_TEE', price: '120.00', image: '/img/yati-tee.png' },
            { id: 'S00-02', name: 'SAMPLE_HOODIE', price: '240.00', image: '/img/yati-tee.png' },
        ]
    }
};

export default function CollectionPage() {
    const params = useParams();
    const slug = params.slug as string;
    const collection = collections[slug as keyof typeof collections];

    if (!collection) {
        return <div className="h-screen flex items-center justify-center bg-black text-white font-mono">COLLECTION_NOT_FOUND</div>;
    }

    return (
        <main className="min-h-screen bg-[var(--color-obsidian)] text-white font-mono selection:bg-[var(--color-signal)] selection:text-white">
            {/* Header */}
            <header className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center mix-blend-difference">
                <Link href="/archive" className="text-xl tracking-widest hover:text-[var(--color-signal)] transition-colors">
                    &larr; ARCHIVE
                </Link>
                <span className="text-xs tracking-[0.2em] opacity-50">
                    {collection.year}
                </span>
            </header>

            {/* Hero */}
            <section className="h-[60vh] flex flex-col justify-end p-6 md:p-12 border-b border-white/10">
                <motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className="text-4xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-[#333]"
                >
                    {collection.title}
                </motion.h1>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="max-w-xl mt-6 text-sm md:text-base text-white/60 leading-relaxed"
                >
                    {collection.description}
                </motion.p>
            </section>

            {/* Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/10 p-[1px]">
                {collection.items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-[var(--color-obsidian)] aspect-square relative group overflow-hidden"
                    >
                        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500"
                            />
                        </div>

                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="absolute top-4 left-4 text-xs tracking-widest opacity-50">
                            {item.id}
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end mix-blend-difference">
                            <span className="text-2xl font-black tracking-tighter">{item.name}</span>
                            <span className="font-mono text-sm">{item.price}</span>
                        </div>
                    </motion.div>
                ))}
            </section>

            <footer className="p-12 flex justify-center border-t border-white/10">
                <div className="text-center space-y-2">
                    <p className="text-[var(--color-signal)] text-xs tracking-widest animate-pulse">END_OF_COLLECTION</p>
                    <Link href="/archive" className="text-white/40 hover:text-white text-xs underline decoration-1 underline-offset-4">
                        RETURN_TO_VAULT
                    </Link>
                </div>
            </footer>
        </main>
    );
}
