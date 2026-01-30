'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Float } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import * as THREE from 'three';

const RageLogo = ({ tension }: { tension: number }) => {
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01 + (tension * 0.05);
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
        }
    });

    return (
        <group ref={meshRef}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Text
                    fontSize={3}
                    letterSpacing={-0.1}
                    color="#E60000"
                    anchorX="center"
                    anchorY="middle"
                    font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                >
                    R A G E
                    <meshPhysicalMaterial
                        color="#FFFFFF"
                        roughness={0}
                        metalness={0.1}
                        transmission={1}
                        thickness={1.5}
                        ior={1.5}
                        clearcoat={1}
                        attenuationColor="#E60000"
                        attenuationDistance={0.5}
                    />
                </Text>
            </Float>
        </group>
    );
};

const VaultGate = ({ onUnlock }: { onUnlock: () => void }) => {
    const [tension, setTension] = useState(0);
    const [isLocked, setIsLocked] = useState(true);
    const requestRef = useRef<number>(null);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && isLocked) {
                if (!startTimeRef.current) {
                    startTimeRef.current = Date.now();
                    animateTension();
                }
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && isLocked) {
                startTimeRef.current = null;
                if (requestRef.current) {
                    cancelAnimationFrame(requestRef.current);
                }
                // Snap back
                gsap.to(tensionObj, {
                    value: 0,
                    duration: 0.5,
                    onUpdate: () => setTension(tensionObj.value)
                });
            }
        };

        const tensionObj = { value: 0 };

        const animateTension = () => {
            if (!startTimeRef.current) return;

            const elapsed = Date.now() - startTimeRef.current;
            const progress = Math.min(elapsed / 2000, 1);

            setTension(progress);

            if (progress >= 1) {
                handleUnlock();
            } else {
                requestRef.current = requestAnimationFrame(animateTension);
            }
        };

        const handleUnlock = () => {
            setIsLocked(false);
            onUnlock();
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isLocked, onUnlock]);

    return (
        <AnimatePresence>
            {isLocked && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                    transition={{ duration: 1.5, ease: 'circOut' }}
                    className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center overflow-hidden"
                >
                    <div className="absolute top-8 left-8 text-white/50 font-mono text-sm tracking-widest">
                        V 2.0 // YATI_PROTOCOL
                    </div>

                    <div className="w-full h-full absolute inset-0">
                        <Canvas gl={{ antialias: true }} camera={{ position: [0, 0, 10], fov: 45 }}>
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} intensity={1} color="#E60000" />
                            <spotLight position={[-10, -10, -10]} angle={0.3} penumbra={1} intensity={1} />
                            <RageLogo tension={tension} />
                        </Canvas>
                    </div>

                    <div className="absolute bottom-12 w-full flex flex-col items-center gap-4">
                        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-[#E60000]"
                                style={{ width: `${tension * 100}%` }}
                            />
                        </div>
                        <p className="font-mono text-xs text-white/60 tracking-[0.2em] animate-pulse">
                            HOLD [ENTER] TO ACCESS
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default VaultGate;
