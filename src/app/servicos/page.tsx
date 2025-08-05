'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEventos } from "@/hooks/useEventos";
import { formatCurrency } from "@/lib/utils";
// import Footer from "@/components/Footer";
import {
    Utensils,
    Users,
    Crown,
    Coffee,
    Cake,
    Wine,
    CheckCircle,
    ArrowRight
} from "lucide-react";
import Link from "next/link";

const Servicos = () => {
    const { events } = useEventos();

    const handleBookService = (serviceId: string) => {
        // navigate(`/agendar/${serviceId}`);
    };

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
                                Sabores que Marcam
                                <span className="text-accent block">Momentos Especiais</span>
                            </h1>

                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Oferecemos uma gama completa de serviços gastronômicos, desde coffee breaks
                                corporativos até casamentos premium, sempre com a excelência que nos define.
                            </p>
                        </div>

                        {/* Services Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {events.map((service, index) => (
                                <Card
                                    key={index}
                                    className={`relative hover:shadow-large transition-all duration-300 hover:-translate-y-2`}
                                >
                                    {/* {service.popular && (
                                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                            <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                                                Mais Popular
                                            </span>
                                        </div>
                                    )} */}

                                    <CardHeader className="text-center pb-6">
                                        {/* <div className="mx-auto w-16 h-16 bg-(image:--gradient-accent) rounded-xl flex items-center justify-center mb-4">
                                            <service.icon className="w-8 h-8 text-accent-foreground" />
                                        </div> */}
                                        <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                                        <CardDescription className="text-base">{service.description}</CardDescription>
                                    </CardHeader>

                                    <CardContent className="space-y-6">
                                        {/* Features */}
                                        {/* <ul className="space-y-3">
                                            {service.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start space-x-3">
                                                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                                                    <span className="text-sm text-muted-foreground">{feature}</span>
                                                </li>
                                            ))}
                                        </ul> */}

                                        {/* Price */}
                                        <div className="border-t pt-6">
                                            <div className="flex items-end justify-between mb-4">
                                                <div>
                                                    <span className="text-2xl font-bold text-foreground">{formatCurrency(service.budget)}</span>
                                                    <span className="text-sm text-muted-foreground ml-1">por pessoa</span>
                                                </div>
                                            </div>
                                            <Link href={`agendar/${service.id}`} passHref>
                                                <Button
                                                    variant={"elegant"}
                                                    className="w-full group"

                                                >
                                                    Agendar Serviço
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            {/* <Footer /> */}
        </div>
    );
};

export default Servicos;