
"use client";

import { motion } from 'framer-motion';

interface Testimonial {
  quote: string;
  zionarySolution: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Acabo de pasar 6 horas rastreando un cable desconectado porque nuestra documentación en Excel estaba desactualizada. Necesito una forma mejor de hacer esto.",
    zionarySolution: "Gestión de Conectividad",
  },
  {
    quote: "Mi proceso de auditoría es imprimir 3 hojas de cálculo y caminar por el data center 2 días. Es un desastre esperando a ocurrir.",
    zionarySolution: "Inventario Centralizado",
  },
  {
    quote: "Tengo espacio y energía, pero no tengo idea de dónde colocar un nuevo servidor sin causar un problema de enfriamiento. Es pura adivinanza.",
    zionarySolution: "Asistente de IA",
  },
  {
    quote: "El CFO me pidió un informe de capacidad para el próximo trimestre. Supongo que no dormiré este fin de semana. Ojalá pudiera presionar un botón.",
    zionarySolution: "Reportes Automatizados",
  },
  {
    quote: "El equipo junior instaló servidores en el rack equivocado. La falta de un plano visual nos costó un día entero de trabajo.",
    zionarySolution: "Planos de Planta Visuales",
  },
  {
    quote: "Tengo que consolidar tres racks en dos, pero visualizar las dependencias en una hoja de cálculo es una pesadilla.",
    zionarySolution: "Visualizador de Racks",
  }
];

const TestimonialCard = ({ quote, zionarySolution }: Testimonial) => (
  <div className="mx-4 flex h-full w-[90vw] max-w-sm flex-shrink-0 flex-col justify-between rounded-2xl p-6 glass-card">
    <blockquote className="text-lg leading-relaxed text-foreground">
      “{quote}”
    </blockquote>
    <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4">
      <span className="text-sm text-muted-foreground">Solución Zionary:</span>
      <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
        {zionarySolution}
      </span>
    </div>
  </div>
);

export function TestimonialSection() {
  return (
    <section className="py-20 lg:py-24 relative">
      <div className="absolute inset-x-0 top-0 h-96 w-full bg-[linear-gradient(to_bottom,hsl(var(--primary)/0.05)_0%,transparent_100%)] -z-10"></div>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold">Escuchado en las trincheras de TI</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground font-sans">
            Estas son las frustraciones que convierten un día normal en una pesadilla. Por eso construimos Zionary.
          </p>
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        <div className="flex min-w-full animate-marquee-slow hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
