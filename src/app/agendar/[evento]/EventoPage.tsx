"use client";

import { useEventos } from "@/hooks/useEventos";
import { useAuth } from "@/hooks/useAuth";
import { Event } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
  Calendar as CalendarIcon,
  MapPin,
  Users as UsersIcon,
  Phone,
  Clock,
} from "lucide-react";
import LoginDialog from "@/components/LoginDialog";
import { formatCurrency } from "@/lib/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useAddAgendamento from "@/hooks/useAddAgendamento";

export default function EventoPage({ eventoId }: { eventoId: number }) {
  const { events } = useEventos();
  const { isAuthenticated, user } = useAuth();
  const addAgendamento = useAddAgendamento(user);

  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [phone, setPhone] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [hour, setHour] = useState("");

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

    if (!selectedDate || !phone || !guestCount || !address || !hour) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    const novoAgendamento = {
      idEvent: eventoId,
      date: selectedDate,
      hour: hour,
      address,
      numPeople: parseInt(guestCount),
    };

    await addAgendamento(novoAgendamento);
  };

  if (events.length === 0) {
    return <p>Carregando eventos…</p>;
  }

  const service = events.find((e: Event) => e.id === Number(eventoId));

  if (!service) {
    return (
      <p style={{ marginTop: 200 }}>Evento “{eventoId}” não encontrado.</p>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="pt-16">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Card className="shadow-large">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">
                    {service && service.title}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    {service && service.description}
                  </CardDescription>
                  <div className="text-center mt-4">
                    <span className="text-3xl font-bold text-accent">
                      {service && formatCurrency(service.budget)}
                    </span>
                    <span className="text-muted-foreground ml-2">
                      por pessoa
                    </span>
                  </div>
                </CardHeader>
              </Card>
            </div>

            <div>
              <Card className="shadow-large">
                <CardHeader>
                  <CardTitle>Solicitar Agendamento</CardTitle>
                  <CardDescription>
                    Preencha os dados do seu evento para solicitar um orçamento
                    personalizado
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
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
                            date < new Date() ||
                            isDateUnavailable(service, date)
                          }
                          locale={ptBR}
                          className="w-full"
                        />
                      </div>
                      {selectedDate && (
                        <p className="text-sm text-muted-foreground">
                          Data selecionada:{" "}
                          {format(selectedDate, "dd 'de' MMMM 'de' yyyy", {
                            locale: ptBR,
                          })}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hour" className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Horário do Evento *
                      </Label>
                      <Input
                        id="hour"
                        type="time"
                        placeholder="Ex: 14:00"
                        value={hour}
                        onChange={(e) => setHour(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="flex items-center gap-2"
                      >
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

                    <div className="space-y-2">
                      <Label
                        htmlFor="guestCount"
                        className="flex items-center gap-2"
                      >
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

                    <div className="space-y-2">
                      <Label
                        htmlFor="address"
                        className="flex items-center gap-2"
                      >
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

                    <Button
                      type="submit"
                      className="w-full"
                      variant="hero"
                      size="lg"
                    >
                      Solicitar Agendamento
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <LoginDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        onSuccess={() => {}}
      />
    </div>
  );
}
