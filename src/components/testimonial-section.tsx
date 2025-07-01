
"use client";

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { User, ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface Testimonial {
  quote: string;
  author: string;
  handle: string;
  sourceUrl: string;
  zionarySolution: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Acabo de pasar 6 horas rastreando un cable desconectado porque nuestra documentación en Excel estaba desactualizada. Tiene que haber una forma mejor de hacer esto.",
    author: "NetAdminThrowaway",
    handle: "@rsysadmin",
    sourceUrl: "#",
    zionarySolution: "Gestión de Conectividad",
  },
  {
    quote: "¿Mi proceso de auditoría? Imprimir 3 hojas de cálculo, caminar por el centro de datos durante 2 días y rezar para que todo coincida. Es un desastre esperando a ocurrir.",
    author: "datacenter_Dan",
    handle: "@Spiceworks",
    sourceUrl: "#",
    zionarySolution: "Inventario Centralizado",
  },
  {
    quote: "Tengo espacio y energía de sobra, pero no tengo idea de dónde colocar un nuevo servidor 1U sin causar un problema de enfriamiento. Es pura adivinanza en este punto.",
    author: "ServerGripes",
    handle: "@rsysadmin",
    sourceUrl: "#",
    zionarySolution: "Asistente de IA",
  },
  {
    quote: "El CFO me pidió un informe de capacidad para el próximo trimestre. Supongo que no dormiré este fin de semana. Ojalá pudiera presionar un botón y ya.",
    author: "IT_Manager_Life",
    handle: "@LinkedIn",
    sourceUrl: "#",
    zionarySolution: "Reportes Automatizados",
  },
  {
      quote: "Recibimos un nuevo lote de servidores y el equipo junior los instaló en el rack equivocado. Ahora tenemos que deshacer todo el trabajo. La falta de un plano visual nos costó un día entero.",
      author: "InfraManager",
      handle: "@TechCommunity",
      sourceUrl: "#",
      zionarySolution: "Planos de Planta Visuales",
  }
];

const TweetCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="flex flex-col h-full bg-[#1A1A1A]/50 backdrop-blur-md border border-white/10 rounded-2xl p-6">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/50 to-primary/20 flex items-center justify-center ring-2 ring-primary/30">
        <User className="w-6 h-6 text-foreground/80" />
      </div>
      <div>
        <p className="font-bold text-white">{testimonial.author}</p>
        <p className="text-sm text-[#A3A3A3]">{testimonial.handle}</p>
      </div>
    </div>
    <p className="flex-grow my-6 text-lg text-[#F5F5F5] leading-relaxed">
      "{testimonial.quote}"
    </p>
    <div className="border-t border-white/10 mt-auto pt-4 flex justify-between items-center">
      <div className='flex items-center gap-2'>
        <span className="text-sm text-[#A3A3A3]">Zionary lo resuelve con:</span>
        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          {testimonial.zionarySolution}
        </span>
      </div>
      <a
        href={testimonial.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-sm text-[#A3A3A3] hover:text-primary transition-colors"
      >
        <ExternalLink className="w-4 h-4" />
        Ver Fuente
      </a>
    </div>
  </div>
);

export function TestimonialSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-20 lg:py-32 bg-[#111111] overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="font-bold text-5xl lg:text-6xl text-white font-sans">El Día a Día en las Trincheras de TI.</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto font-sans">
            Estas no son nuestras palabras. Son las frustraciones reales de administradores como tú. Las escuchamos y por eso construimos Zionary.
          </p>
        </motion.div>
        
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 pl-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <TweetCard testimonial={testimonial} />
                </motion.div>
              ))}
            </div>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-[-2rem] pointer-events-none">
             <Button
                onClick={scrollPrev}
                disabled={prevBtnDisabled}
                variant="outline"
                size="icon"
                className="absolute -left-6 w-12 h-12 rounded-full pointer-events-auto bg-black/50 border-white/20 text-white hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                aria-label="Anterior testimonio"
              >
                <ArrowLeft />
              </Button>
              <Button
                onClick={scrollNext}
                disabled={nextBtnDisabled}
                variant="outline"
                size="icon"
                className="absolute -right-6 w-12 h-12 rounded-full pointer-events-auto bg-black/50 border-white/20 text-white hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                aria-label="Siguiente testimonio"
              >
                <ArrowRight />
              </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
