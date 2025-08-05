import { User } from '@/types';
import axios, { AxiosError } from 'axios';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';



interface AuthContextType {
    user: User | null;
    login: (name: string, phone: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = async (name: string, phone: string) => {

        try {
            const responseLogin = await axios.post("https://saeback-production.up.railway.app/api/cliente/login", {
                telefone: phone, password: "123456",
            });
            const data = await responseLogin.data;
            const userData: User = {
                id: data.cliente.id,
                name: name,
                phone: phone,
                token: data.token
            }

            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
            console.error("Login error:", error);
            if ((error as AxiosError).status === 401) {
                const responseRegister = await axios.post("https://saeback-production.up.railway.app/api/cliente/register", {
                    nome_completo: name,
                    telefone: phone,
                    password: "123456"
                });
                const data = responseRegister.data;

                const userData: User = {
                    id: data.cliente.id,
                    name: name,
                    phone: phone,
                    token: data.token
                }

                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                toast.success("Login bem sucedido!");
            } else {
                toast.error("Erro ao fazer login. Por favor, tente novamente.");
            }
        }
    };


    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        toast.success("Logout bem sucedido!");
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};