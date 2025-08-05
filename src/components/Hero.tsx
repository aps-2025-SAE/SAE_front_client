import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Star,
  Users,
  Calendar,
  Play,
  Sparkles,
} from "lucide-react";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero"
    >
      {/* Background Image with Modern Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1555244162-803834f70033?w=1920&h=1080&fit=crop"
          alt="Evento elegante da Rosilene Eventos"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80"></div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-32 left-16 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl">
          {/* Premium Badge */}
          <div className="inline-flex items-center space-x-3 glass-effect-dark rounded-full px-6 py-3 mb-8 smooth-appear">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <Star className="w-5 h-5 text-accent" />
            <span className="text-white font-medium text-lg">
              Especialistas em Experiências Gastronômicas Únicas
            </span>
            <Sparkles className="w-5 h-5 text-accent animate-pulse" />
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-white mb-8 leading-[0.9] stagger-appear text-balance">
            Criamos Momentos
            <span className="block gradient-text bg-(image:--gradient-accent) bg-clip-text text-transparent">
              Inesquecíveis
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl font-light text-white/90 mt-4">
              através da gastronomia
            </span>
          </h1>

          {/* Enhanced Subtitle */}
          <p
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl leading-relaxed smooth-appear font-light"
            style={{ animationDelay: "0.3s" }}
          >
            Transformamos seus eventos em experiências gastronômicas
            extraordinárias.
            <span className="text-accent font-medium">
              {" "}
              Mais de uma década
            </span>{" "}
            criando celebrações memoráveis com excelência, sofisticação e sabor
            único.
          </p>

          {/* Modern Stats */}
          <div
            className="flex flex-wrap items-center gap-8 mb-12 smooth-appear"
            style={{ animationDelay: "0.6s" }}
          >
            {[
              {
                icon: Users,
                label: "500+ Eventos Realizados",
                sublabel: "Satisfação garantida",
              },
              {
                icon: Star,
                label: "4.9/5 Avaliação",
                sublabel: "Clientes satisfeitos",
              },
              {
                icon: Calendar,
                label: "10+ Anos",
                sublabel: "De experiência premium",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 glass-effect-dark rounded-xl px-4 py-3 hover-lift"
              >
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-white font-semibold">{stat.label}</div>
                  <div className="text-white/70 text-sm">{stat.sublabel}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced CTA Section */}
          <div
            className="flex flex-col sm:flex-row gap-6 mb-12 smooth-appear"
            style={{ animationDelay: "0.9s" }}
          >
            <Button
              variant="hero"
              size="xl"
              className="group relative overflow-hidden bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow hover:shadow-large transition-all duration-500 px-8 py-4"
            >
              <span className="relative z-10 flex items-center gap-3">
                Consultoria Gratuita
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-warm-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>

            <Button
              variant="elegant"
              size="xl"
              className="glass-effect-dark! group text-white border-white/20 hover:bg-white/10 px-8 py-4"
            >
              <Play className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              Ver Nossos Trabalhos
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="smooth-appear" style={{ animationDelay: "1.2s" }}>
            <p className="text-white/70 text-sm mb-6 font-medium">
              Especializados em:
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                "Casamentos de Luxo",
                "Eventos Corporativos Premium",
                "Celebrações Familiares",
                "Formaturas Especiais",
              ].map((specialty, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium hover:bg-white/20 transition-colors cursor-default"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modern Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 smooth-appear"
        style={{ animationDelay: "1.5s" }}
      >
        <div className="flex flex-col items-center space-y-2">
          <div className="w-6 h-10 border-2 border-accent/60 rounded-full flex justify-center relative overflow-hidden">
            <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-bounce"></div>
          </div>
          <span className="text-white/60 text-xs font-medium">
            Descobrir mais
          </span>
        </div>
      </div>

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>
    </section>
  );
};

export default Hero;
