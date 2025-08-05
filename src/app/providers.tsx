'use client';

import { AuthProvider } from "@/hooks/useAuth";
import { EventProvider } from "@/hooks/useEventos";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            <EventProvider>
                {children}
            </EventProvider>
        </AuthProvider>
    );
}

export default Providers;