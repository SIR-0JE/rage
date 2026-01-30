'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const products = [
    { id: 1, name: 'OBSIDIAN_JACKET', price: '950.00', image: '/img/obsidian-jacket.png' },
    { id: 2, name: 'SIGNAL_BOOTS', price: '420.00', image: '/img/signal-boots.png' },
    { id: 3, name: 'YATI_TEE', price: '120.00', image: '/img/yati-tee.png' },
    { id: 4, name: 'VOID_PANTS', price: '380.00', image: '/img/obsidian-jacket.png' }, // Reusing for now or could generate more
    { id: 5, name: 'NOISE_HOODIE', price: '240.00', image: '/img/yati-tee.png' },
    { id: 6, name: 'ARTIFACT_01', price: '???.__', image: '/img/signal-boots.png' },
];

const DistortedGrid = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24 md:gap-y-32 px-4">
            {products.map((product, index) => (
                <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={`group relative cursor-crosshair
            ${index % 2 === 0 ? 'md:translate-y-0' : 'md:translate-y-12'}
            ${index % 3 === 1 ? 'lg:-translate-y-16' : ''}
          `}
                >
                    <div className="relative aspect-[3/4] overflow-hidden bg-white/5 border border-white/10 group-hover:border-[var(--color-signal)] transition-colors duration-300">
                        {/* Image */}
                        <div className={`relative w-full h-full
                transition-all duration-500 ease-in-out
                filter grayscale contrast-125
                group-hover:grayscale-0 group-hover:contrast-100
                group-hover:scale-105
            `}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-[#E60000] mix-blend-overlay opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />

                        <div className="absolute top-2 right-2 text-[var(--color-signal)] font-mono text-xs opacity-0 group-hover:opacity-100 z-10">
                            [ADD_TO_CART]
                        </div>

                        <span className="absolute bottom-2 left-2 font-mono text-4xl font-bold tracking-tighter text-white/50 group-hover:text-white pointer-events-none z-10 mix-blend-difference">
                            {product.id.toString().padStart(2, '0')}
                        </span>
                    </div>

                    <div className="mt-4 flex justify-between items-baseline font-mono text-sm tracking-widest text-[#888] group-hover:text-white transition-colors">
                        <span>{product.name}</span>
                        <span>{product.price}</span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default DistortedGrid;
