'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CartProps {
    isOpen: boolean;
    onClose: () => void;
}

const BrutalistCart = ({ isOpen, onClose }: CartProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm cursor-alias"
                    />

                    {/* Cart Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', ease: 'circOut', duration: 0.4 }}
                        className="fixed top-0 right-0 z-50 h-full w-full md:w-[480px] bg-[var(--color-obsidian)] border-l-4 border-[var(--color-signal)] flex flex-col"
                    >
                        <div className="p-8 border-b border-white/10 flex justify-between items-center">
                            <h2 className="text-4xl font-black tracking-tighter text-stretch text-white">
                                CART (03)
                            </h2>
                            <button
                                onClick={onClose}
                                className="font-mono text-[#E60000] hover:text-white uppercase text-sm tracking-widest border border-[#E60000] px-4 py-2 hover:bg-[#E60000]"
                            >
                                [Close]
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 space-y-8">
                            {/* Cart Item Mockups */}
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-4 group">
                                    <div className="w-24 h-32 bg-white/5 border border-white/10 flex items-center justify-center text-white/20">
                                        0{i}
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div>
                                            <div className="flex justify-between font-mono text-sm text-[#888]">
                                                <span>OBSIDIAN_JACKET</span>
                                                <span>950.00</span>
                                            </div>
                                            <div className="text-xs text-white/30 text-stretch mt-1">SIZE: L / V.2.0</div>
                                        </div>
                                        <button className="text-left text-[#E60000] font-mono text-xs uppercase hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-8 border-t-4 border-[var(--color-signal)] bg-white text-black">
                            <div className="flex justify-between font-mono text-lg mb-6 tracking-widest uppercase">
                                <span>Total</span>
                                <span className="font-bold">2,850.00</span>
                            </div>
                            <button className="w-full h-16 bg-black text-white hover:bg-[#E60000] hover:text-black transition-colors font-black text-2xl uppercase tracking-tighter">
                                Checkout_&gt;
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default BrutalistCart;
