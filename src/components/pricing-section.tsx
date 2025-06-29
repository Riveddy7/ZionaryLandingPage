import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Profesional",
    price: "$2,500 USD",
    pricePeriod: "/ año + IVA",
    description: "",
    features: [
      "Hasta 5 Racks",
      "Hasta 100 Activos",
      "5 Usuarios",
      "Asistente IA Básico"
    ],
    cta: "Comprar Ahora",
    isHighlighted: false,
  },
  {
    name: "Business",
    price: "$6,000 USD",
    pricePeriod: "/ año + IVA",
    description: "",
    features: [
      "Hasta 20 Racks",
      "Hasta 500 Activos",
      "20 Usuarios",
      "Reportes Avanzados y Alertas"
    ],
    cta: "Contactar a Ventas",
    isHighlighted: true,
    highlightLabel: "MÁS POPULAR",
  },
  {
    name: "Enterprise",
    price: "A Medida",
    pricePeriod: "",
    description: "Para operaciones a gran escala, construyamos juntos una solución a tu medida.",
    features: [
      "Racks y Activos Ilimitados",
      "Acceso a API",
      "Soporte Premium (SLA)"
    ],
    cta: "Contactar a Ventas",
    isHighlighted: false,
  },
];

export function PricingSection() {
  return (
    <section id="precios" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Un Plan para Cada Misión.
          </h2>
          <p className="font-body text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Precios transparentes y diseñados para escalar contigo. Sin costos ocultos, sin sorpresas. Elige el plan que impulse tu operación hoy.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <Card key={plan.name} className={cn(
              "flex flex-col h-full relative", 
              plan.isHighlighted ? "border-primary shadow-lg shadow-primary/20 -translate-y-2" : "border-border"
            )}>
              {plan.highlightLabel && (
                <Badge className="absolute -top-4 left-1/2 -translate-x-1/2">{plan.highlightLabel}</Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="font-headline text-2xl text-primary">{plan.name}</CardTitle>
                {plan.description && <CardDescription className="font-body pt-2">{plan.description}</CardDescription>}
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
