import { Button } from "@/components/ui/button";
import Image from "next/image";

export function HeroSection() {
    return (
        <section className="pt-28 md:pt-32 pb-10">
            <div className="container max-w-5xl mx-auto">
                <div className="relative text-center overflow-hidden rounded-3xl border border-white/10 hero-frame-glow p-1">
                    <div className="relative z-10 px-6 pt-20 pb-10">
                        <h1 className="text-7xl lg:text-8xl font-bold tracking-tighter text-foreground font-sans">
                            Bienvenido a Zionary.
                        </h1>
                        <p className="mt-6 max-w-3xl mx-auto text-xl text-[#A3A3A3] font-sans">
                            Tu santuario de orden para la infraestructura compleja. Convierte el caos de hojas de cálculo en un centro de mando visual e inteligente.
                        </p>
                        <div className="mt-10 flex justify-center items-center gap-4">
                            <Button size="lg" className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-[#8A78FF] to-[#7B61FF] rounded-lg shadow-lg hover:opacity-90 transition-opacity">
                                Entrar a Zionary
                            </Button>
                            <Button size="lg" variant="outline" className="px-6 py-3 font-semibold bg-white/5 border-white/10 text-[#A3A3A3] hover:bg-white/10 hover:text-foreground rounded-lg">
                                Agendar una Demo
                            </Button>
                        </div>
                        
                        <div className="relative mt-20">
                             <Image
                                src="https://cgljmcahcshjqglctjwk.supabase.co/storage/v1/object/public/floor-plans-optimized//unnamed.webp"
                                alt="Zionary Dashboard"
                                width={1200}
                                height={800}
                                className="w-full h-auto rounded-t-xl border-x border-t border-white/10 shadow-2xl shadow-black/50"
                                data-ai-hint="dashboard ui"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
