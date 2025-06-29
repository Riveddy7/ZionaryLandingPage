import { Button } from "@/components/ui/button";
import { LeadCaptureDialog } from "./lead-capture-dialog";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 text-center overflow-hidden">
      <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] -z-0 aurora-bg"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h1 
          className="font-headline text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300 animate-fade-in"
          style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
        >
          Infraestructura compleja, gestión simple.
        </h1>
        <p 
          className="font-body text-lg md:text-xl text-muted-foreground mt-6 max-w-3xl mx-auto animate-fade-in-up"
          style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}
        >
          Nexus es la primera plataforma DCIM diseñada para Latinoamérica que convierte el caos de hojas de cálculo y diagramas manuales en un centro de mando visual, inteligente y unificado. Deja de administrar, empieza a controlar.
        </p>
        <div 
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}
        >
          <Button asChild size="lg" className="font-body font-bold text-lg glow-shadow transition-all duration-300 hover:scale-105">
            <Link href="#precios">Ver Planes y Precios</Link>
          </Button>
          <LeadCaptureDialog>
            <Button size="lg" variant="outline" className="font-body font-bold text-lg transition-all duration-300 hover:scale-105 hover:bg-primary/10">
              Probar Diseñador Gratuito
            </Button>
          </LeadCaptureDialog>
        </div>
      </div>
    </section>
  );
}
