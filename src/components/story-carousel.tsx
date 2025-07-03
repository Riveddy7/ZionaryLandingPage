"use client"

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Layers3, Sparkle, Database, Plug, Map, MoveHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const stories = [
  {
    icon: <Layers3 className="w-12 h-12 text-primary" />,
    title: 'Visualizador de Racks Interactivo',
    description: "Arrastra y suelta activos en racks fotorrealistas. Tu centro de datos, como nunca antes lo habías visto.",
  },
  {
    icon: <Sparkle className="w-12 h-12 text-primary" />,
    title: 'Asistido por IA',
    description: "Nuestro asistente analiza tu infraestructura para darte recomendaciones inteligentes que optimizan tu operación.",
  },
  {
    icon: <Database className="w-12 h-12 text-primary" />,
    title: 'Inventario Centralizado',
    description: "Tu única fuente de verdad. Reemplaza el caos de hojas de Excel con un inventario vivo y siempre preciso.",
  },
  {
    icon: <Plug className="w-12 h-12 text-primary" />,
    title: 'Gestión de Conectividad',
    description: "Traza conexiones de puerto a puerto en segundos y resuelve problemas de red a una velocidad récord.",
  },
  {
    icon: <Map className="w-12 h-12 text-primary" />,
    title: 'Planos de Planta Visuales',
    description: "Coloca tus racks sobre el plano de tu sitio para una planificación de espacio y crecimiento sin igual.",
  },
];

const DotButton = ({ selected, onClick }: { selected: boolean; onClick: () => void }) => (
  <div className="p-2" onClick={onClick}>
    <button
      className={cn(
        "h-2 w-6 rounded-full transition-all duration-300 ease-in-out",
        selected ? 'bg-primary w-12' : 'bg-white/20'
      )}
      type="button"
    />
  </div>
);

export function StoryCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
      { loop: true }, 
      [Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnaps);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
      <div className="h-full" ref={emblaRef}>
        <div className="flex h-full">
          {stories.map((story, index) => (
            <div key={index} className="relative flex-[0_0_100%] flex items-center justify-center text-center bg-grid-pattern">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15)_0%,transparent_60%)]" />
              
              <AnimatePresence>
                {index === selectedIndex && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="relative z-10 flex flex-col items-center px-6"
                  >
                    <div className="mb-4">{story.icon}</div>
                    <h3 className="font-sans text-4xl font-bold text-white mt-4">{story.title}</h3>
                    <p className="font-sans text-lg text-muted-foreground mt-2 max-w-sm mx-auto">{story.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
        <motion.div
            animate={{ x: [-8, 8, -8] }}
            transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
            }}
            className="flex items-center justify-center gap-2 text-muted-foreground/50"
        >
            <MoveHorizontal className="w-5 h-5" />
            <span className="text-xs font-sans">DESLIZA</span>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-3/4">
        <div className="flex items-center justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
