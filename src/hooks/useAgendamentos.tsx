"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import { Agendamento, User } from "@/types";
import { toast } from "sonner";

const useAgendamentos = (user: User | null) => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      fetchAgendamentos();
    }
  }, [user]);

  const fetchAgendamentos = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const response = await axios.get(
        "https://saeback-production.up.railway.app/api/cliente/agendamentos",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const parsedAgendamentos = response.data.agendamentos.map(
        (agendamento: any) => {
          const agend: Agendamento = {
            idEvent: agendamento.evento_id,
            event: {
              id: agendamento.evento.id,
              title: agendamento.evento.tipo,
              description: agendamento.evento.descricao,
              dateInit: new Date(agendamento.evento.data_inicio),
              dateEnd: new Date(agendamento.evento.data_fim),
              budget: agendamento.evento.valor,
              diaryOffers: agendamento.evento.numOfertasDiarias,
            },
            date: new Date(agendamento.data_solicitada),
            hour: agendamento.horario,
            address: agendamento.endereco,
            numPeople: agendamento.quantidade_pessoas,
            status: agendamento.status,
            createdAt: new Date(agendamento.created_at),
          };

          return agend;
        }
      );

      setAgendamentos(parsedAgendamentos);
    } catch (error) {
      toast.error("Erro ao buscar agendamentos. Por favor, tente novamente.");
      console.error("Error fetching agendamentos:", error);
    } finally {
      setLoading(false);
    }
  };

  return { agendamentos, loading, fetchAgendamentos };
};

export default useAgendamentos;
