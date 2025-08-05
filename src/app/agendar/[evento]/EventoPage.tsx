'use client'

import { useEventos } from '@/hooks/useEventos'
import { useAuth } from "@/hooks/useAuth";
import { Agendamento, Event } from '@/types'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// import Footer from "@/components/Footer";
// import LoginDialog from "@/components/LoginDialog";
// import { useAuth } from "@/hooks/useAuth";
import {
    Crown,
    Users,
    Cake,
    Coffee,
    Wine,
    Utensils,
    Calendar as CalendarIcon,
    MapPin,
    Users as UsersIcon,
    Phone,
    CheckCircle
} from "lucide-react";
import LoginDialog from "@/components/LoginDialog";
import { formatCurrency } from "@/lib/utils";
import { useEffect, useState } from 'react';
import useAgendamentos from '@/hooks/useAgendamentos';
import { redirect, RedirectType } from 'next/navigation';

export default function EventoPage({ eventoId }: { eventoId: number }) {
    // se preferir usar useParams diretamente, basta:
    // const { evento: eventoId } = useParams();

    const { events } = useEventos()    // seu hook de contexto :contentReference[oaicite:5]{index=5}
    const { isAuthenticated, user } = useAuth();
    const { agendamentos, loading, fetchAgendamentos, addAgendamento } = useAgendamentos(user);



    const [showLoginDialog, setShowLoginDialog] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [phone, setPhone] = useState("");
    const [guestCount, setGuestCount] = useState("");
    const [address, setAddress] = useState("");
    const [notes, setNotes] = useState("");

    useEffect(() => {
        if (!isAuthenticated) {
            setShowLoginDialog(true);
        } else {
            setShowLoginDialog(false);
        }
    }, [isAuthenticated]);



    const isDateUnavailable = (evento: Event, date: Date) => {

        return evento.dateInit > date || evento.dateEnd < date;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedDate || !phone || !guestCount || !address) {
            // toast.error("Por favor, preencha todos os campos obrigatórios");
            return;
        }


        const novoAgendamento = {
            idEvent: eventoId,
            date: selectedDate,
            hour: format(selectedDate, "HH:mm"),
            address,
            numPeople: parseInt(guestCount)
        }
        let redirected = false;
        try {
            await addAgendamento(novoAgendamento);
            redirected = true;
        } catch (error) {
            // toast.error("Erro ao solicitar agendamento. Tente novamente.");
        }
        if (redirected)
            redirect("/meus_agendamentos", RedirectType.replace);


        // toast.success("Agendamento solicitado com sucesso!");
        // navigate('/meus-agendamentos');
    };

    if (events.length === 0) {
        return <p>Carregando eventos…</p>
    }

    // Atenção: eventoId é string, id em Event também deve ser string
    console.log("events:", events);
    console.log("eventoId:", eventoId);
    const service = events.find((e: Event) => e.id === Number(eventoId))

    if (!service) {
        return <p style={{ marginTop: 200 }}>Evento “{eventoId}” não encontrado.</p>
    }

    // Renderize os campos do evento
    return (
        <div className="min-h-screen">

            <main className="pt-16">
                {/* <Suspense fallback={<div>Loading...</div>}> */}
                <div className="container mx-auto px-4 lg:px-8 py-12">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Service Info */}
                        <div>
                            <Card className="shadow-large">
                                <CardHeader className="text-center">
                                    {/* <div className="mx-auto w-16 h-16 bg-(image:--gradient-accent) rounded-xl flex items-center justify-center mb-4">
                                        <ServiceIcon className="w-8 h-8 text-accent-foreground" />
                                    </div> */}
                                    <CardTitle className="text-2xl">{service && service.title}</CardTitle>
                                    <CardDescription className="text-lg">{service && service.description}</CardDescription>
                                    <div className="text-center mt-4">
                                        <span className="text-3xl font-bold text-accent">{service && formatCurrency(service.budget)}</span>
                                        <span className="text-muted-foreground ml-2">por pessoa</span>
                                    </div>
                                </CardHeader>
                                {/* <CardContent>
                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-lg">Incluído no serviço:</h4>
                                        <ul className="space-y-3">
                                            {service.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start space-x-3">
                                                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                                                    <span className="text-muted-foreground">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </CardContent> */}
                            </Card>
                        </div>

                        {/* Booking Form */}
                        <div>
                            <Card className="shadow-large">
                                <CardHeader>
                                    <CardTitle>Solicitar Agendamento</CardTitle>
                                    <CardDescription>
                                        Preencha os dados do seu evento para solicitar um orçamento personalizado
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Calendar */}
                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-2">
                                                <CalendarIcon className="w-4 h-4" />
                                                Data do Evento *
                                            </Label>
                                            <div className="border rounded-lg p-3">
                                                <Calendar
                                                    mode="single"
                                                    selected={selectedDate}
                                                    onSelect={setSelectedDate}
                                                    disabled={(date) =>
                                                        date < new Date() || isDateUnavailable(service, date)
                                                    }
                                                    locale={ptBR}
                                                    className="w-full"
                                                />
                                            </div>
                                            {selectedDate && (
                                                <p className="text-sm text-muted-foreground">
                                                    Data selecionada: {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                                                </p>
                                            )}
                                        </div>

                                        {/* Phone */}
                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="flex items-center gap-2">
                                                <Phone className="w-4 h-4" />
                                                Telefone de Contato *
                                            </Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                placeholder="(11) 99999-9999"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                required
                                            />
                                        </div>

                                        {/* Guest Count */}
                                        <div className="space-y-2">
                                            <Label htmlFor="guestCount" className="flex items-center gap-2">
                                                <UsersIcon className="w-4 h-4" />
                                                Quantidade de Pessoas *
                                            </Label>
                                            <Input
                                                id="guestCount"
                                                type="number"
                                                placeholder="Ex: 50"
                                                value={guestCount}
                                                onChange={(e) => setGuestCount(e.target.value)}
                                                min="1"
                                                required
                                            />
                                        </div>

                                        {/* Address */}
                                        <div className="space-y-2">
                                            <Label htmlFor="address" className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                Endereço do Evento *
                                            </Label>
                                            <Textarea
                                                id="address"
                                                placeholder="Rua, número, bairro, cidade - CEP"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                required
                                            />
                                        </div>

                                        {/* Notes */}
                                        <div className="space-y-2">
                                            <Label htmlFor="notes">Observações Adicionais</Label>
                                            <Textarea
                                                id="notes"
                                                placeholder="Descreva detalhes específicos do seu evento, preferências alimentares, decoração, etc."
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                                rows={3}
                                            />
                                        </div>

                                        <Button type="submit" className="w-full" variant="hero" size="lg">
                                            Solicitar Agendamento
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
                {/* </Suspense> */}
            </main>
            <LoginDialog
                open={showLoginDialog}
                onOpenChange={setShowLoginDialog}
                onSuccess={() => setShowLoginDialog(false)}
            />
        </div>
    );
}