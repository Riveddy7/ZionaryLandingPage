"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function HeroSection() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-background py-24 flex items-center justify-center">
            
            <div className="absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 to-transparent to-70% -z-0"></div>

            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 z-0"
            >
                <Image
                    src="https://cgljmcahcshjqglctjwk.supabase.co/storage/v1/object/public/floor-plans-optimized//unnamed.webp"
                    alt="Zionary Dashboard Preview"
                    width={900}
                    height={600}
                    className="w-[900px] max-w-none rounded-t-2xl border-t border-x border-white/10"
                    data-ai-hint="dashboard ui"
                    priority
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                className="relative z-10 mx-auto max-w-3xl px-4"
            >
                <div 
                    className="rounded-2xl border border-white/10 bg-black/60 p-8 text-center backdrop-blur-lg md:p-12"
                    style={{
                        boxShadow: '0 0 40px rgba(123, 97, 255, 0.2)'
                    }}
                >
                    <h1 className="font-sans text-5xl font-bold tracking-tight text-white lg:text-6xl">
                        El Sistema Operativo para Datacenter.
                    </h1>
                    
                    <p className="mt-6 font-sans text-lg text-muted-foreground lg:text-xl">
                        Infraestructura compleja, gestión simple.
                    </p>
                    
                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button 
                            size="lg" 
                            className="w-full sm:w-auto font-bold bg-gradient-to-r from-[#8A78FF] to-[#7B61FF] text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
                        >
                            Probar Diseñador Gratuito
                        </Button>
                        <Button 
                            size="lg" 
                            variant="outline" 
                            className="w-full sm:w-auto font-bold bg-white/5 border-white/10 text-muted-foreground transition-all duration-300 hover:bg-white/10 hover:text-white"
                        >
                            Ver Planes
                        </Button>
                    </div>
                </div>
            </motion.div>

        </section>
    );
}
