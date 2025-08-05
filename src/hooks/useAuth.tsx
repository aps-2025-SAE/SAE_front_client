import { User } from '@/types';
import axios, { AxiosError } from 'axios';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';



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


            // const responseLogin = await fetch("https://saeback-production.up.railway.app/api/cliente/login", {
            //     method: 'POST',
            //     headers: {
            //         "Content-Type": "application/json",
            //         "access-control-allow-origin": "*",
            //         "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            //     },
            //     body: JSON.stringify({ telefone: phone, password: "123456" }),
            //     mode: 'no-cors',
            // });

            const responseLogin = await axios.post("https://saeback-production.up.railway.app/api/cliente/login", {
                telefone: phone, password: "123456",
            });

            console.log("responseLogin", responseLogin);
            // const data = await responseLogin.json();
            const data = await responseLogin.data;

            // const responseLogin = await fetch(requestLogin);
            console.log("Response status:", responseLogin.status);
            console.log("response", data);




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
            }
        }
    };


    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
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