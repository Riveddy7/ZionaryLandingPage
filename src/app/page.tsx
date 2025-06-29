"use client";

import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Sparkles, Linkedin, MoveRight, Check, Database, Rocket, Users } from "lucide-react";
import Image from "next/image";

// Custom hook for scroll animations
const useScrollAnimation = () => {
  const [elements, setElements] = useState<HTMLElement[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (elements.length > 0) {
      observer.current = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      }, { threshold: 0.1 });

      elements.forEach(element => observer.current?.observe(element));
    }
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [elements]);

  return setElements;
};


// Main Page Component
export default function HomePage() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const leadCaptureRef = useRef<HTMLDivElement>(null);
  
  const setElements = useScrollAnimation();

  useEffect(() => {
    const observerElements = Array.from(document.querySelectorAll('.section-observer'));
    setElements(observerElements as HTMLElement[]);
  }, [setElements]);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToLead = () => {
    leadCaptureRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-background text-foreground font-body antialiased">
      <Navbar onGetAccessClick={scrollToLead} onLinkClick={{
        features: () => scrollTo(featuresRef),
        pricing: () => scrollTo(pricingRef),
        testimonials: () => scrollTo(testimonialsRef),
      }} />
      <main>
        <HeroSection onPrimaryClick={scrollToLead} onSecondaryClick={scrollToLead} />
        <TrustBar />
        <ProblemSection />
        <div ref={featuresRef}><FeaturesSection /></div>
        <div ref={pricingRef}><PricingSection /></div>
        <div ref={testimonialsRef}><TestimonialSection /></div>
        <div ref={leadCaptureRef}><LeadCaptureSection /></div>
      </main>
      <Footer />
    </div>
  );
}

// Section Components
interface NavLinkProps {
  features: () => void;
  pricing: () => void;
  testimonials: () => void;
}

const Navbar = ({ onGetAccessClick, onLinkClick }: { onGetAccessClick: () => void, onLinkClick: NavLinkProps }) => (
  <header className="sticky top-0 z-50 w-full nav-glass border-b border-white/10">
    <div className="container mx-auto flex h-16 items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-primary" />
        <span className="font-headline text-xl font-bold text-foreground">Nexus</span>
      </div>
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        <button onClick={onLinkClick.features} className="text-muted-foreground transition-colors hover:text-primary">Características</button>
        <button onClick={onLinkClick.pricing} className="text-muted-foreground transition-colors hover:text-primary">Precios</button>
        <button onClick={onLinkClick.testimonials} className="text-muted-foreground transition-colors hover:text-primary">Testimonios</button>
      </nav>
      <Button onClick={onGetAccessClick} className="font-bold btn-gradient transition-transform hover:scale-105">
        Obtener Acceso
      </Button>
    </div>
  </header>
);

const AnimatedTitle = ({ text }: { text: string }) => {
  const words = text.split(' ');
  return (
    <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
      {words.map((word, i) => (
        <span key={i} className="inline-block animate-in fade-in" style={{ animationDelay: `${i * 150}ms` }}>
          {word}&nbsp;
        </span>
      ))}
    </h1>
  );
};

const HeroSection = ({ onPrimaryClick, onSecondaryClick }: { onPrimaryClick: () => void, onSecondaryClick: () => void }) => (
  <section className="relative h-screen flex items-center justify-center text-center overflow-hidden hero-bg">
    <div className="container mx-auto px-4 z-10">
      <AnimatedTitle text="Infraestructura compleja, gestión simple." />
      <p className="font-body text-lg md:text-xl text-muted-foreground mt-6 max-w-3xl mx-auto animate-in fade-in-up" style={{ animationDelay: '0.8s' }}>
        Nexus convierte el caos de tus hojas de cálculo en un centro de mando visual e inteligente. Toma el control total de tu centro de datos, hoy.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in-up" style={{ animationDelay: '1s' }}>
        <Button onClick={onPrimaryClick} size="lg" className="font-bold text-lg btn-gradient transition-all duration-300 hover:scale-105" style={{ animation: 'pulse-glow 2s infinite' }}>
          Prueba el Diseñador Gratuito
        </Button>
        <button onClick={onSecondaryClick} className="font-semibold text-primary hover:underline transition-all duration-300">
          o Agendar una Demo
        </button>
      </div>
    </div>
  </section>
);

const TrustBar = () => {
    const logos = ["TechCorp", "Industrias de México", "Logística Global", "Bajanet", "Syscom"];
    return (
        <div className="py-8 bg-background">
            <div className="container mx-auto px-4 text-center">
                <p className="mb-6 font-body text-sm font-semibold tracking-widest text-muted-foreground uppercase">CON LA CONFIANZA DE EQUIPOS EN:</p>
                <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 md:gap-x-12">
                    {logos.map(logo => (
                        <span key={logo} className="font-headline text-lg text-muted-foreground/60">{logo}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ProblemSection = () => (
  <section className="py-20 lg:py-32 section-observer">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold">
            ¿Tu Data Center funciona con <span className="gradient-text">Excel y esperanza?</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground mt-6">
            Cada celda obsoleta y cada diagrama perdido es un riesgo de inactividad. La gestión manual no solo es lenta, es un punto ciego que te cuesta tiempo, dinero y tranquilidad.
          </p>
        </div>
        <div className="flex justify-center items-center">
            <Image
                src="https://placehold.co/600x400"
                alt="Diagrama caótico de red"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl shadow-primary/10"
                data-ai-hint="network chaos"
            />
        </div>
      </div>
    </div>
  </section>
);

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  const features = [
    {
      title: "Visualiza. No Más Adivinanzas.",
      description: "Arrastra y suelta activos en racks virtuales, gestiona la capacidad en tiempo real y comprende tu infraestructura de un solo vistazo, como si estuvieras físicamente frente al rack.",
      icon: <Users className="h-8 w-8 text-primary" />,
      image: "https://placehold.co/800x600",
      aiHint: "dashboard ui"
    },
    {
      title: "Centraliza. Tu Única Fuente de Verdad.",
      description: "Dile adiós a las hojas de cálculo obsoletas y a los diagramas de Visio perdidos. Unifica todo tu inventario, conectividad y estado de los activos en un solo lugar.",
      icon: <Database className="h-8 w-8 text-primary" />,
      image: "https://placehold.co/800x600",
      aiHint: "data management"
    },
    {
      title: "Optimiza. La Magia de la IA.",
      description: "Nuestro Asistente IA te ayuda a tomar decisiones más inteligentes, recomendando la ubicación óptima para nuevos servidores basándose en la energía y capacidad disponible.",
      icon: <Rocket className="h-8 w-8 text-primary" />,
      image: "https://placehold.co/800x600",
      aiHint: "ai optimization"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = featureRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setActiveFeature(index);
            }
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    const refs = featureRefs.current;
    refs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="sticky top-24 h-[600px] hidden md:block section-observer">
            <div className="relative w-full h-full rounded-xl overflow-hidden glass-card">
              {features.map((feature, index) => (
                <Image
                  key={feature.title}
                  src={feature.image}
                  alt={feature.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={cn(
                    "object-cover transition-opacity duration-500",
                    activeFeature === index ? "opacity-100" : "opacity-0"
                  )}
                  data-ai-hint={feature.aiHint}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-16">
            {features.map((feature, index) => (
              <div key={feature.title} ref={el => featureRefs.current[index] = el} className="h-[60vh] flex items-center section-observer">
                <div>
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="font-headline text-3xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground text-lg">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = {
    monthly: [
      { name: "Profesional", price: "$299", cta: "Empezar Ahora" },
      { name: "Business", price: "$599", cta: "Contactar a Ventas", isHighlighted: true },
      { name: "Enterprise", price: "Contactar", cta: "Contactar a Ventas" },
    ],
    annual: [
      { name: "Profesional", price: "$2,500", cta: "Empezar Ahora" },
      { name: "Business", price: "$6,000", cta: "Contactar a Ventas", isHighlighted: true },
      { name: "Enterprise", price: "Contactar", cta: "Contactar a Ventas" },
    ],
  };

  const currentPlans = isAnnual ? plans.annual : plans.monthly;

  return (
    <section className="py-20 lg:py-32 bg-background section-observer">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold">Un Plan para Cada Misión.</h2>
          <p className="font-body text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Precios transparentes diseñados para escalar contigo.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={cn("font-medium", !isAnnual && "text-primary")}>Facturación Mensual</span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} aria-label="Cambiar a facturación anual" />
            <span className={cn("font-medium", isAnnual && "text-primary")}>Facturación Anual (ahorra 20%)</span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
          {currentPlans.map((plan) => (
            <Card key={plan.name} className={cn(
              "flex flex-col h-full transition-all duration-300",
              plan.isHighlighted 
                ? "bg-card-foreground text-background scale-105 glow-border-gradient" 
                : "glass-card hover:border-primary"
            )}>
              <CardHeader className="pt-8">
                <CardTitle className={cn("font-headline text-2xl", plan.isHighlighted && "text-primary")}>{plan.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-6">
                  <span className="font-headline text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{isAnnual ? ' /año' : ' /mes'}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className={cn("w-full font-bold", plan.isHighlighted && "btn-gradient")}>
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};


const TestimonialSection = () => (
    <section className="py-20 lg:py-32 section-observer">
        <div className="container mx-auto px-4 max-w-4xl">
            <Card className="glass-card overflow-hidden">
                <div className="grid md:grid-cols-3 items-center">
                    <div className="md:col-span-1">
                        <Image
                            src="https://placehold.co/400x400"
                            alt="Foto de Carlos Valenzuela"
                            width={400}
                            height={400}
                            className="w-full h-full object-cover"
                            data-ai-hint="professional headshot"
                        />
                    </div>
                    <div className="md:col-span-2 p-8 md:p-12">
                        <blockquote className="font-headline text-xl lg:text-2xl font-semibold leading-snug">
                            "Nexus transformó nuestro caos en claridad. Lo que antes nos tomaba días de auditoría manual, ahora lo vemos en segundos. Es, sin duda, la herramienta que nuestro data center merecía."
                        </blockquote>
                        <footer className="mt-6">
                            <p className="font-bold text-lg">Carlos Valenzuela</p>
                            <p className="text-muted-foreground">Gerente de TI, TechCorp Industries</p>
                        </footer>
                    </div>
                </div>
            </Card>
        </div>
    </section>
);


const LeadCaptureSection = () => (
    <section className="py-20 lg:py-32 hero-bg section-observer">
        <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold">
                ¿Listo para tomar el control?
            </h2>
            <p className="font-body text-lg text-muted-foreground mt-6">
                Prueba nuestro Diseñador de IDFs gratuito y experimenta la simplicidad y el poder de Nexus. Sin compromisos, sin tarjeta de crédito.
            </p>
            <form className="mt-10 max-w-lg mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                    <Input type="email" placeholder="Email de Trabajo" className="flex-grow h-12 text-lg" />
                    <Button type="submit" size="lg" className="font-bold text-lg btn-gradient transition-transform hover:scale-105" style={{ animation: 'pulse-glow 3s infinite' }}>
                        Empezar a Diseñar Gratis
                    </Button>
                </div>
            </form>
        </div>
    </section>
);

const Footer = () => (
    <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center items-center gap-4 mb-6">
                <Sparkles className="h-6 w-6 text-primary" />
                <span className="font-headline text-xl font-bold text-foreground">Nexus</span>
            </div>
            <div className="flex justify-center gap-6 mb-6">
                <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="h-6 w-6" />
                </a>
            </div>
            <div className="flex justify-center gap-x-6 gap-y-2 flex-wrap mb-6 font-body text-sm">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Términos de Servicio</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Política de Privacidad</a>
            </div>
            <p className="text-muted-foreground font-body text-sm">
                &copy; 2025 Nexus Technologies S.A.P.I. de C.V.
            </p>
        </div>
    </footer>
);
