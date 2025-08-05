'use client';
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import LoginDialog from "@/components/LoginDialog";
// import { useAuth } from "@/hooks/useAuth";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
    Calendar,
    MapPin,
    Users,
    Phone,
    Clock,
    FileText
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import LoginDialog from "@/components/LoginDialog";
import useAgendamentos from "@/hooks/useAgendamentos";

interface Booking {
    id: string;
    service: string;
    date: string;
    phone: string;
    guestCount: number;
    address: string;
    notes?: string;
    status: "Pendente" | "Confirmado" | "Cancelado" | "Concluído";
    createdAt: string;
}

const MeusAgendamentos = () => {
    const { isAuthenticated, user } = useAuth();
    const { agendamentos } = useAgendamentos(user);
    const orderedAgendamentos = agendamentos.sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
    const [showLoginDialog, setShowLoginDialog] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            setShowLoginDialog(true);
        }
    }, [isAuthenticated]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pendente":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "confirmado":
                return "bg-green-100 text-green-800 border-green-200";
            case "cancelado":
                return "bg-red-100 text-red-800 border-red-200";
            case "concluído":
                return "bg-blue-100 text-blue-800 border-blue-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen">
                <LoginDialog
                    open={showLoginDialog}
                    onOpenChange={setShowLoginDialog}
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <main className="pt-16">
                <div className="container mx-auto px-4 lg:px-8 py-12">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                            Meus Agendamentos
                        </h1>
                        <p className="text-muted-foreground">
                            Acompanhe todos os seus eventos agendados e seus status.
                        </p>
                    </div>

                    {orderedAgendamentos.length === 0 ? (
                        <Card className="text-center py-12">
                            <CardContent>
                                <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Nenhum agendamento encontrado</h3>
                                <p className="text-muted-foreground mb-6">
                                    Você ainda não fez nenhum agendamento de evento.
                                </p>
                                <a
                                    href="/servicos"
                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                                >
                                    Ver Serviços Disponíveis
                                </a>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-6">
                            {agendamentos.map((agendamento) => (
                                <Card key={agendamento.date.getDate()} className="shadow-medium hover:shadow-large transition-shadow">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-xl">{agendamento.event.title}</CardTitle>
                                                <CardDescription className="flex items-center gap-2 mt-2">
                                                    <Clock className="w-4 h-4" />
                                                    Agendado em {format(agendamento.createdAt ?? new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                                                </CardDescription>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className={getStatusColor(agendamento.status)}
                                            >
                                                {agendamento.status}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <Calendar className="w-5 h-5 text-accent" />
                                                    <div>
                                                        <p className="font-medium">Data do Evento</p>
                                                        <p className="text-muted-foreground">
                                                            {format(new Date(agendamento.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <Users className="w-5 h-5 text-accent" />
                                                    <div>
                                                        <p className="font-medium">Quantidade de Pessoas</p>
                                                        <p className="text-muted-foreground">{agendamento.numPeople} pessoas</p>
                                                    </div>
                                                </div>

                                                {/* <div className="flex items-center gap-3">
                                                    <Phone className="w-5 h-5 text-accent" />
                                                    <div>
                                                        <p className="font-medium">Telefone de Contato</p>
                                                        <p className="text-muted-foreground">{agendamento}</p>
                                                    </div>
                                                </div> */}
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-start gap-3">
                                                    <MapPin className="w-5 h-5 text-accent mt-0.5" />
                                                    <div>
                                                        <p className="font-medium">Endereço do Evento</p>
                                                        <p className="text-muted-foreground">{agendamento.address}</p>
                                                    </div>
                                                </div>

                                                {/* {agendamento.notes && (
                                                    <div className="flex items-start gap-3">
                                                        <FileText className="w-5 h-5 text-accent mt-0.5" />
                                                        <div>
                                                            <p className="font-medium">Observações</p>
                                                            <p className="text-muted-foreground">{agendamento.notes}</p>
                                                        </div>
                                                    </div>
                                                )} */}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            {/* <Footer /> */}
        </div>
    );
};

export default MeusAgendamentos;