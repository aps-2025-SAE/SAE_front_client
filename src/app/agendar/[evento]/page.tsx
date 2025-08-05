import EventoPage from './EventoPage';

export default async function Page({ params }: { params: Promise<{ evento: number }> }) {
    const { evento } = await params;
    return <EventoPage eventoId={evento} />;
}