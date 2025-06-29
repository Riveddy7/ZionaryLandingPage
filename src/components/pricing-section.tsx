import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Básico",
    price: "Gratis",
    pricePeriod: "",
    description: "Para individuos y pequeños equipos que empiezan a explorar.",
    features: [
      "1 Proyecto",
      "Asistente IA Básico",
      "5GB Almacenamiento",
      "Soporte Comunitario"
    ],
    cta: "Empezar Gratis",
    isHighlighted: false,
  },
  {
    name: "Pro",
    price: "$49",
    pricePeriod: "/mes",
    description: "La solución ideal para profesionales y equipos en crecimiento.",
    features: [
      "Proyectos Ilimitados",
      "Asistente IA Avanzado",
      "100GB Almacenamiento",
      "Colaboración en Equipo",
      "Soporte Prioritario"
    ],
    cta: "Elegir Plan Pro",
    isHighlighted: true,
  },
  {
    name: "Empresarial",
    price: "Custom",
    pricePeriod: "",
    description: "Para grandes organizaciones que necesitan soluciones a medida.",
    features: [
      "Todo en Pro",
      "SSO & Seguridad Avanzada",
      "Gestor de Cuenta Dedicado",
      "SLA Personalizado",
      "Onboarding y Formación"
    ],
    cta: "Contactar Ventas",
    isHighlighted: false,
  },
];

export function PricingSection() {
  return (
    <section id="precios" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Planes para Cada Necesidad
          </h2>
          <p className="font-body text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Elige el plan que se adapte a tu flujo de trabajo y escala a medida que creces.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan) => (
            <Card key={plan.name} className={cn(
              "flex flex-col h-full", 
              plan.isHighlighted ? "border-primary shadow-lg shadow-primary/20 -translate-y-2" : "border-border"
            )}>
              <CardHeader className="text-center">
                <CardTitle className="font-headline text-2xl text-primary">{plan.name}</CardTitle>
                <CardDescription className="font-body">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="text-center mb-6">
                  <span className="font-headline text-4xl font-bold">{plan.price}</span>
                  {plan.pricePeriod && <span className="text-muted-foreground font-body">{plan.pricePeriod}</span>}
                </div>
                <ul className="space-y-4 font-body">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className={cn("w-full font-bold font-body", !plan.isHighlighted && "bg-secondary hover:bg-secondary/80")}>
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
