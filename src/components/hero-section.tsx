"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function HeroSection() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-background py-24 flex items-center justify-center">
            
            <div className="absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 to-transparent to-70% -z-0"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-4xl mx-auto rounded-2xl border border-white/10 overflow-hidden"
                style={{
                    boxShadow: '0 0 40px rgba(123, 97, 255, 0.2)'
                }}
            >
                <Image
                    src="https://cgljmcahcshjqglctjwk.supabase.co/storage/v1/object/public/floor-plans-optimized//unnamed.webp"
                    alt="Zionary Dashboard Background"
                    fill
                    className="object-cover -z-20"
                    data-ai-hint="dashboard ui"
                    priority
                />
                
                <div className="absolute inset-0 bg-black/60 backdrop-blur-md -z-10"></div>
                
                <div className="relative z-20 p-8 text-center md:p-12">
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
                            className="w-full sm:w-auto font-bold bg-transparent border-white/20 text-white transition-all duration-300 hover:bg-white/10"
                        >
                            Ver Planes
                        </Button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
