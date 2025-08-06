"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEventos } from "@/hooks/useEventos";
import { formatCurrency } from "@/lib/utils";

import { Utensils, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const Servicos = () => {
  const { events } = useEventos();

  return (
    <div className="min-h-screen">
      <main className="pt-16">
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6">
                <Utensils className="w-4 h-4 text-accent" />
                <span className="text-accent font-medium">Nossos Serviços</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Para cada sonho
                <span className="text-accent block">Um evento único</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Dos pequenos encontros às grandes celebrações, cuidamos de tudo
                com carinho e excelência, proporcionando experiências únicas e
                memoráveis para você e seus convidados.
              </p>
            </div>

            {/* Services Grid */}
            {events.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <CheckCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Nenhum serviço disponível
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    No momento, não há serviços disponíveis. Por favor, volte
                    mais tarde.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((service, index) => (
                  <Card
                    key={index}
                    className={`relative hover:shadow-large transition-all duration-300 hover:-translate-y-2`}
                  >
                    <CardHeader className="text-center pb-6">
                      <CardTitle className="text-xl mb-2">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {service.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <div className="border-t pt-6">
                        <div className="flex items-end justify-between mb-4">
                          <div>
                            <span className="text-2xl font-bold text-foreground">
                              {formatCurrency(service.budget)}
                            </span>
                            <span className="text-sm text-muted-foreground ml-1">
                              por pessoa
                            </span>
                          </div>
                        </div>
                        <Link href={`agendar/${service.id}`} passHref>
                          <Button variant={"elegant"} className="w-full group">
                            Agendar Serviço
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Servicos;
