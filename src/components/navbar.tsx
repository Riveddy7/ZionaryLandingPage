import Link from "next/link";
import { Button } from "./ui/button";
import { LeadCaptureDialog } from "./lead-capture-dialog";
import { Sparkle } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Sparkle className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl font-bold">Nexus</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium font-body">
          <Link href="#producto" className="text-muted-foreground transition-colors hover:text-foreground">
            Producto
          </Link>
          <Link href="#precios" className="text-muted-foreground transition-colors hover:text-foreground">
            Precios
          </Link>
          <Link href="#sobre-nosotros" className="text-muted-foreground transition-colors hover:text-foreground">
            Sobre Nosotros
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <LeadCaptureDialog>
            <Button className="font-body font-bold">Diseñador Gratuito</Button>
          </LeadCaptureDialog>
        </div>
      </div>
    </header>
  );
}
