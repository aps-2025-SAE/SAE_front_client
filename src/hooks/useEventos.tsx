'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from "react";
import type { Event } from "@/types";
import { toast } from "sonner";

const addHourToDate = (date: any) => {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + 5); // Adiciona 3 horas
    return newDate;
}

interface EventContextType {
    events: Event[];
    loading: boolean;
}

const EventContext = createContext<EventContextType>({
    events: [],
    loading: false,
});

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getEvents();
    }, [])

    const getEvents = async () => {
        try {
            const response = await fetch("https://saeback-production.up.railway.app/api/eventos");
            const data = await response.json();

            setEvents(data.map((evento: any) => ({
                id: evento.id,
                title: evento.tipo,
                budget: evento.valor,
                description: evento.descricao,
                dateInit: addHourToDate(evento.data_inicio),
                dateEnd: addHourToDate(evento.data_fim),
                diaryOffers: evento.numOfertasDiarias
            } as Event)));

        } catch (error) {
            console.error("Error fetching events:", error);
            toast.error("Erro ao buscar eventos. Por favor, tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <EventContext.Provider value={{ events, loading }}>
            {children}
        </EventContext.Provider>
    );
}

export const useEventos = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error("useEventos must be used within an EventProvider");
    }
    return context;
};



