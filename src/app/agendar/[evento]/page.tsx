import EventoPage from './EventoPage';

export default async function Page({ params }: { params: { evento: number } }) {
    return <EventoPage eventoId={params.evento} />;
}