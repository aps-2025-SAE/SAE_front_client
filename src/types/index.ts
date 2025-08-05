export interface Event {
  id: number;
  title: string;
  description: string;
  dateInit: string | Date;
  dateEnd: string | Date;
  budget: number;
  diaryOffers: number;
}

export interface EventRequest {
  id: string;
  eventId?: string;
  description: string;
  budget: number;
}

export interface User {
  id: number;
  name: string;
  phone: string;
  token: string;
}

export type Agendamento = {
  idEvent: number;
  event: Event;
  date: Date;
  hour: string;
  address: string;
  numPeople: number;
  status: string;
  createdAt?: Date;
};
