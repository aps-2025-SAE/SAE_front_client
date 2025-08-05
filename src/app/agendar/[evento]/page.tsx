// 'use client';
// import { useState, useEffect, use, useMemo, Suspense } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// import Header from "@/components/Header";

// import { useParams } from "next/navigation";
// import { toast } from "sonner";

// function Evento() {
//     const { evento } = useParams<{ evento: string }>();
//     const { events, loading } = useEventos();
//     const { isAuthenticated, user } = useAuth();
//     // const service = events.find((s: Event) => s.id === evento);
//     const service = useMemo(() => events.find((s: Event) => s.id === evento), [events, evento]);

//     // const navigate = useNavigate();
//     const [showLoginDialog, setShowLoginDialog] = useState(false);
//     const [selectedDate, setSelectedDate] = useState<Date>();
//     const [phone, setPhone] = useState("");
//     const [guestCount, setGuestCount] = useState("");
//     const [address, setAddress] = useState("");
//     const [notes, setNotes] = useState("");

//     // console.log("Service:", service);
//     // useEffect(() => {
//     //     if (!service) {
//     //         navigate('/servicos');
//     //         return;
//     //     }

//     //     if (!isAuthenticated) {
//     //         setShowLoginDialog(true);
//     //     }
//     // }, [service, isAuthenticated, navigate]);

//  

//     console.log("selectedEvent:", evento);

//     if (loading) {
//         return <div className="flex items-center justify-center h-screen">Carregando...</div>;
//     }

//     if (!service) {
//         return <div className="flex items-center justify-center h-screen">Serviço não encontrado</div>;
//     }

//     // const ServiceIcon = service.icon;

//     
// };

// export default Evento;

import EventoPage from './EventoPage';

export default async function Page({ params }: { params: { evento: number } }) {
    // Passamos a string pura para o client
    return <EventoPage eventoId={params.evento} />;
}