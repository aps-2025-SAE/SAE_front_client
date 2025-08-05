import { Agendamento, User } from "@/types";
import axios from "axios";
import { format } from "date-fns";
import { redirect, RedirectType } from "next/navigation";
import { toast } from "sonner";

const useAddAgendamento = (user: User | null) => {

    const addAgendamento = async (agendamento: Omit<Agendamento, "status" | "event">) => {
        if (!user) {
            toast.error("Usuário não autenticado. Por favor, faça login.");
            return;
        }
        let redirected = false;
        try {

            const response = await axios.post("https://saeback-production.up.railway.app/api/cliente/pedido", {
                evento_id: agendamento.idEvent,
                data_solicitada: format(agendamento.date, "yyyy-MM-dd"),
                horario: agendamento.hour,
                endereco: agendamento.address,
                quantidade_pessoas: agendamento.numPeople,
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })

            toast.success("Agendamento criado com sucesso!");
            redirected = true;
        } catch (error) {
            console.error("Error adding agendamento:", error);
            toast.error("Erro ao criar agendamento. Por favor, tente novamente.");
            redirected = false;
        }
        if (redirected)
            redirect("/meus_agendamentos", RedirectType.replace);

    }


    return addAgendamento;
};

export default useAddAgendamento;