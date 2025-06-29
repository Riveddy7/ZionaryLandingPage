import Link from "next/link";
import { Linkedin, Sparkle } from "lucide-react";

export function Footer() {
  return (
    <footer id="sobre-nosotros" className="py-12 border-t border-border/50 bg-card/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Sparkle className="h-6 w-6 text-primary" />
              <span className="font-headline text-xl font-bold">Nexus</span>
            </Link>
            <p className="text-muted-foreground text-sm font-body">Infraestructura compleja, gestión simple.</p>
          </div>

          <div>
            <h3 className="font-headline font-bold mb-4">Producto</h3>
            <ul className="space-y-2 font-body text-sm">
              <li><Link href="#producto" className="text-muted-foreground hover:text-primary">Características</Link></li>
              <li><Link href="#precios" className="text-muted-foreground hover:text-primary">Precios</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Diseñador Gratuito</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-headline font-bold mb-4">Compañía</h3>
            <ul className="space-y-2 font-body text-sm">
              <li><Link href="#sobre-nosotros" className="text-muted-foreground hover:text-primary">Sobre Nosotros</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Blog</Link></li>
              <li><a href="mailto:contacto@nexus.com" className="text-muted-foreground hover:text-primary">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-bold mb-4">Conecta con nosotros</h3>
            <div className="flex space-x-4">
              <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/50 text-center text-muted-foreground font-body text-sm">
          <p>&copy; 2025 Nexus Technologies S.A.P.I. de C.V. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
