"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Calendar, Phone, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import LoginDialog from "./LoginDialog";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleAuthAction = () => {
    if (!isAuthenticated) {
      setShowLoginDialog(true);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-(image:--gradient-accent) rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Rosilene Eventos
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-foreground hover:text-accent transition-colors"
            >
              Início
            </Link>
            <Link
              href="/servicos"
              className="text-foreground hover:text-accent transition-colors"
            >
              Serviços
            </Link>
            <Link
              href="/#calendario"
              className="text-foreground hover:text-accent transition-colors"
            >
              Disponibilidade
            </Link>
            <Link
              href="/galeria"
              className="text-foreground hover:text-accent transition-colors"
            >
              Galeria
            </Link>
            <Link
              href="/#contato"
              className="text-foreground hover:text-accent transition-colors"
            >
              Contato
            </Link>
          </nav>

          {/* Contact & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>(11) 99999-9999</span>
            </div>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex items-center gap-2"
                  >
                    <div className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-semibold">
                      {user && getInitials(user.name)}
                    </div>
                    {user?.name.split(" ")[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link href="/meus_agendamentos" passHref>
                    <DropdownMenuItem onClick={() => {}}>
                      <Calendar className="w-4 h-4 mr-2" />
                      Meus Agendamentos
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="hero" size="lg" onClick={handleAuthAction}>
                Fazer Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-foreground hover:text-accent transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border shadow-medium">
            <nav className="flex flex-col space-y-4 p-4">
              <Link
                href="/"
                onClick={toggleMenu}
                className="text-foreground hover:text-accent transition-colors py-2"
              >
                Início
              </Link>
              <Link
                href="/servicos"
                onClick={toggleMenu}
                className="text-foreground hover:text-accent transition-colors py-2"
              >
                Serviços
              </Link>
              <Link
                href="/#calendario"
                onClick={toggleMenu}
                className="text-foreground hover:text-accent transition-colors py-2"
              >
                Disponibilidade
              </Link>
              <Link
                href="/galeria"
                onClick={toggleMenu}
                className="text-foreground hover:text-accent transition-colors py-2"
              >
                Galeria
              </Link>
              <Link
                href="/#contato"
                onClick={toggleMenu}
                className="text-foreground hover:text-accent transition-colors py-2"
              >
                Contato
              </Link>
              <div className="flex flex-col space-y-3 pt-4 border-t border-border">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>(11) 99999-9999</span>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>

      <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />
    </header>
  );
};

export default Header;
