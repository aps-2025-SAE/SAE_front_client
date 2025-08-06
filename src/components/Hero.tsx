import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

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
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-white mb-8 leading-[0.9] stagger-appear text-balance">
            Criamos Momentos
            <span className="block gradient-text bg-(image:--gradient-accent) bg-clip-text text-transparent leading-[1.2]">
              Inesquecíveis
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl font-light text-white/90 mt-6">
              com afeto em cada detalhe
            </span>
          </h1>

          {/* Enhanced Subtitle */}
          <p
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl leading-relaxed smooth-appear font-light"
            style={{ animationDelay: "0.3s" }}
          >
            Eventos são feitos de emoções e histórias vividas com quem se ama.
            Nossa missão é tornar essas ocasiões únicas, oferecendo segurança,
            proximidade e um toque de afeto em cada etapa da jornada.
            <span className="text-accent font-medium"> Você idealiza</span> e
            nós realizamos com dedicação e carinho.
          </p>

          {/* Enhanced CTA Section */}
          <div
            className="flex flex-col sm:flex-row gap-6 mb-12 smooth-appear"
            style={{ animationDelay: "0.9s" }}
          >
            <Link href="/servicos" passHref>
              <Button
                variant="hero"
                size="xl"
                className="group relative overflow-hidden bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow hover:shadow-large transition-all duration-500 px-8 py-4"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Conheça nossos serviços
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-warm-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
          </div>
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
