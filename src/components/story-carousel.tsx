
"use client"

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import { Layers3, Sparkle, Database, Plug, Map } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const stories = [
  {
    icon: <Layers3 className="w-12 h-12 text-primary" />,
    title: 'Visualizador de Racks Interactivo',
    description: "Arrastra y suelta activos en racks fotorrealistas. Tu centro de datos, como nunca antes lo habías visto.",
    dataAiHint: 'abstract 3d render',
  },
  {
    icon: <Sparkle className="w-12 h-12 text-primary" />,
    title: 'Asistido por IA',
    description: "Nuestro asistente analiza tu infraestructura para darte recomendaciones inteligentes que optimizan tu operación.",
    dataAiHint: 'abstract gradient',
  },
  {
    icon: <Database className="w-12 h-12 text-primary" />,
    title: 'Inventario Centralizado',
    description: "Tu única fuente de verdad. Reemplaza el caos de hojas de Excel con un inventario vivo y siempre preciso.",
    dataAiHint: 'plexus network',
  },
  {
    icon: <Plug className="w-12 h-12 text-primary" />,
    title: 'Gestión de Conectividad',
    description: "Traza conexiones de puerto a puerto en segundos y resuelve problemas de red a una velocidad récord.",
    dataAiHint: 'glowing wires',
  },
  {
    icon: <Map className="w-12 h-12 text-primary" />,
    title: 'Planos de Planta Visuales',
    description: "Coloca tus racks sobre el plano de tu sitio para una planificación de espacio y crecimiento sin igual.",
    dataAiHint: 'blueprint wireframe',
  },
];

const DotButton = ({ selected, onClick }: { selected: boolean; onClick: () => void }) => (
  <button
    className={cn(
      "h-2 w-full rounded-full transition-colors duration-300",
      selected ? 'bg-primary' : 'bg-white/20'
    )}
    type="button"
    onClick={onClick}
  />
);

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
    setScrollSnaps(emblaApi.scrollSnaps());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative h-[calc(100vh-100px)] w-full overflow-hidden">
      <div className="h-full" ref={emblaRef}>
        <div className="flex h-full">
          {stories.map((story, index) => (
            <div key={index} className="relative flex-[0_0_100%] flex items-center justify-center text-center">
              <Image
                src={`https://placehold.co/1080x1920/111111/111111.png`}
                alt="Abstract background"
                fill
                className="object-cover"
                data-ai-hint={story.dataAiHint}
              />
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
              <div className="relative z-10 flex flex-col items-center px-6">
                <div className="mb-4">{story.icon}</div>
                <h3 className="text-4xl font-bold text-white mt-4">{story.title}</h3>
                <p className="text-lg text-muted-foreground mt-2 max-w-sm mx-auto">{story.description}</p>
              </div>
            </div>
          ))}
        </div>
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
