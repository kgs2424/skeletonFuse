export const members = [
  {
    id: 1,
    name: '홍길동',
    email: 'hong@example.com',
    phone: '010-1234-5678',
    joinedAt: '2024-01-10',
    payments: [
      { id: 1, month: '2024-01', amount: 30000, paidAt: '2024-01-05' },
      { id: 2, month: '2024-02', amount: 30000, paidAt: null },
    ],
  },
  {
    id: 2,
    name: '김철수',
    email: 'kim@example.com',
    phone: '010-5678-8888',
    joinedAt: '2023-12-01',
    payments: [
      { id: 1, month: '2024-01', amount: 30000, paidAt: '2024-01-02' },
    ],
  },
  {
    id: 3,
    name: '이영희',
    email: 'lee@example.com',
    phone: '010-1111-2222',
    joinedAt: '2023-11-20',
    payments: [],
  },
];