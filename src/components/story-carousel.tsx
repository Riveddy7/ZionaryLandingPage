"use client"

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import { Layers3, Sparkle, Database, Plug, Map } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

// --- DATOS DE LAS HISTORIAS ---
const stories = [
  {
    icon: <Layers3 className="w-12 h-12 text-[#7B61FF]" />,
    title: 'Visualizador de Racks Interactivo',
    description: "Arrastra y suelta activos en racks fotorrealistas. Tu centro de datos, como nunca antes lo habías visto.",
    // Usaremos una imagen real o un placeholder de alta calidad
    imageUrl: 'https://images.unsplash.com/photo-1580894908361-967195033215?q=80&w=2070&auto=format&fit=crop',
  },
  {
    icon: <Sparkle className="w-12 h-12 text-[#7B61FF]" />,
    title: 'Asistido por IA',
    description: "Nuestro asistente analiza tu infraestructura para darte recomendaciones inteligentes que optimizan tu operación.",
    imageUrl: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop',
  },
  {
    icon: <Database className="w-12 h-12 text-[#7B61FF]" />,
    title: 'Inventario Centralizado',
    description: "Tu única fuente de verdad. Reemplaza el caos de hojas de Excel con un inventario vivo y siempre preciso.",
    imageUrl: 'https://images.unsplash.com/photo-1593432336334-a9701f2379d9?q=80&w=2070&auto=format&fit=crop',
  },
  {
    icon: <Plug className="w-12 h-12 text-[#7B61FF]" />,
    title: 'Gestión de Conectividad',
    description: "Traza conexiones de puerto a puerto en segundos y resuelve problemas de red a una velocidad récord.",
    imageUrl: 'https://images.unsplash.com/photo-1581094784359-74de7b154e5a?q=80&w=2070&auto=format&fit=crop',
  },
  {
    icon: <Map className="w-12 h-12 text-[#7B61FF]" />,
    title: 'Planos de Planta Visuales',
    description: "Coloca tus racks sobre el plano de tu sitio para una planificación de espacio y crecimiento sin igual.",
    imageUrl: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1978&auto=format&fit=crop',
  },
];

// --- COMPONENTE DOTBUTTON MEJORADO ---
const DotButton = ({ selected, onClick }: { selected: boolean; onClick: () => void }) => (
  // Se aumenta el área táctil con un padding invisible para mejorar la usabilidad
  <div className="p-2" onClick={onClick}>
    <button
      className={cn(
        "h-2 w-6 rounded-full transition-all duration-300 ease-in-out",
        selected ? 'bg-[#7B61FF] w-12' : 'bg-white/20' // El punto activo es más largo
      )}
      type="button"
    />
  </div>
);

// --- COMPONENTE PRINCIPAL ---
export function StoryCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnaps()); // Corregido para llamar a la función
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    // Se usa `dvh` para una altura dinámica precisa en móviles
    <div className="relative h-[100dvh] w-full overflow-hidden">
      <div className="h-full" ref={emblaRef}>
        <div className="flex h-full">
          {/* SOLUCIÓN AL ERROR: Se añade la guarda `stories &&` */}
          {stories && stories.map((story, index) => (
            <div key={index} className="relative flex-[0_0_100%] flex items-center justify-center text-center">
              {/* Se usa next/image con placeholder para un mejor rendimiento */}
              <Image
                src={story.imageUrl}
                alt={story.title}
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
              />
              {/* Se añade un gradiente para mejorar la legibilidad del texto */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 backdrop-blur-sm" />
              
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
                    <h3 className="text-4xl font-bold text-white mt-4">{story.title}</h3>
                    <p className="text-lg text-[#A3A3A3] mt-2 max-w-sm mx-auto">{story.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-3/4">
        <div className="flex items-center justify-center gap-2">
          {/* SOLUCIÓN AL ERROR: Se añade la guarda `scrollSnaps &&` */}
          {scrollSnaps && scrollSnaps.map((_, index) => (
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
