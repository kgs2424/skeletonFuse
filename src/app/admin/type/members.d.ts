export interface Payment {
    id: number;
    month: string;
    amount: number;
    paidAt: string | null;
}

export interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  joinedAt: string;
  payments: Payment[];
}
