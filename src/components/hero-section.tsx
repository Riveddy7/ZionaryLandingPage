import { Button } from "@/components/ui/button";
import { LeadCaptureDialog } from "./lead-capture-dialog";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
      <div className="absolute inset-0 bg-grid-slate-700/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom mask-image-gradient-to-bottom"></div>
      <div className="container mx-auto px-4 text-center relative">
        <h1 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
          Crea Visuales Impresionantes con el Poder de la IA
        </h1>
        <p className="font-body text-lg md:text-xl text-muted-foreground mt-6 max-w-3xl mx-auto">
          Nexus Simplified es la herramienta definitiva para diseñadores y equipos que buscan optimizar su flujo de trabajo, unificando la creatividad y la eficiencia en una sola plataforma.
        </p>
        <div className="mt-8 flex justify-center">
          <LeadCaptureDialog>
            <Button size="lg" className="font-body font-bold text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
              Probar Diseñador Gratuito
            </Button>
          </LeadCaptureDialog>
        </div>
      </div>
    </section>
  );
}
