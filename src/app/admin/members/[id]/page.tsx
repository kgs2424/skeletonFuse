'use client';

import { Box, Button, Modal, Table, TextField } from "@mui/material";
import { useParams } from "next/navigation";
import { useState } from "react";
/**
 * 브라우저 주소에서 /admin/members/1 이렇게 이동가능
 * url파라미터를 받아옴 -> useParams() 이거에 대해서 다시좀 볼것
 * @returns 
 */
export default function AdminMemberDetailPage() {
    const { id } = useParams();
    
    const member = {
        id,
        name: '채원',
        phone: '010-2424-2424',
        email:'testaaa@name.com',
        joinedAt: '2024-24-24',
    };

    const [payments, setPayments] = useState([
        {id: 1, month:'2024-01', amount:30000, paidAt: '2024-01-04'},
        {id: 2, month:'2024-02', amount:30000, paidAt: '2024-02-04'},
        {id: 3, month:'2024-03', amount:30000, paidAt: '2024-03-04'},
        {id: 4, month:'2024-04', amount:30000, paidAt: null},
    ]);
    const paymentsTableTbody = payments.map((payment) => ({
        ...payment,
        isPaid: !!payment.paidAt,
        statusLabel: payment.paidAt ? '완납' : '미납',
        statusClass: payment.paidAt ? 'text-green-600' : 'text-red-600',
        rowClass: payment.paidAt ? '' : 'bg-red-50',
    }));

    /** 모달 상태 */
    const [opened, setOpened] = useState(false);
    /** 월 */
    const [newMonth, setNewMonth] = useState('');
    /** 회비 */
    const [newAmount, setNewAmount] = useState('');
    /** 납부일 */
    const [newPaidAt, setNewPaidAt] = useState('');
    
    /**
     * 납부 내역을 추가하는 함수
     * 회비월, 납부금액, 납부일을 수동으로 추가
     */
    const handleAddPayment = () => {
        console.log('납부 추가:', {
            memberId: id,
            month: newMonth,
            amount: Number(newAmount),
            paidAt: newPaidAt,
          });

        const newPayment = {
            id: payments.length + 1,
            month: newMonth,
            amount: Number(newAmount),
            paidAt: newPaidAt ?? null,
        };  
        setPayments((prev)=> [...prev, newPayment]);

        setOpened(false);
        setNewAmount('');
        setNewMonth('');
        setNewPaidAt('');
    };

    return (
        <div className="p-24">
            {/* 회원 정보 */}
            <div className="mb-24">
                <h1 className="text-2xl font-bold mb-16">상세정보</h1>
                <div className="space-y-8">
                    <div>이름 : {member.name}</div>
                    <div>이메일 : {member.email}</div>
                    <div>전번 : {member.phone}</div>
                    <div>가입일 : {member.joinedAt}</div>
                </div>
            </div>
            {/* 납부내역 */}
            <div>
                <div className="flex items-center justify-between mb-16">
                    <h2 className="text-xl font-bold mb-16">회비 납부 내역</h2>
                    <Button 
                        variant="contained" 
                        color='primary' 
                        onClick={ ()=> setOpened(true)}
                    >
                        납부 추가
                    </Button>
                </div>
                <Table className="min-w-full">
                    <thead>
                        <tr>
                        <th className="text-left p-8">회비월</th>
                        <th className="text-left p-8">납부금액</th>
                        <th className="text-left p-8">납부일</th>
                        <th className="text-left p-8">상태</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* {payments.map((payment) => {
                        const isPaid = !!payment.paidAt;
                        return (
                        <tr key={payment.id} className={!isPaid ? 'bg-red-50' : ''}>
                            <td className="text-left p-8">{payment.month}</td>
                            <td className="text-left p-8">{payment.amount.toLocaleString()}원</td>
                            <td className="text-left p-8">{payment.paidAt || '-'}</td>
                            <td
                            className={`text-left p-8 font-semibold ${
                                isPaid ? 'text-green-600' : 'text-red-600'
                            }`}
                            >
                            {isPaid ? '완납' : '미납'}
                            </td>
                        </tr>
                        );
                    })} */}
                    {paymentsTableTbody.map((p) => (
                        <tr key={p.id} className={p.rowClass}>
                        <td className="text-left p-8">{p.month}</td>
                        <td className="text-left p-8">{p.amount.toLocaleString()}원</td>
                        <td className="text-left p-8">{p.paidAt || '-'}</td>
                        <td className={`text-left p-8 font-semibold ${p.statusClass}`}>
                            {p.statusLabel}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        {/* 납부 추가 모달 */}
        <Modal open={opened} onClose={ ()=> setOpened(false)}>
            <Box>
                <h2 className="text-lg font-bold mb-16">납부 내역 추가</h2>
                <TextField 
                    label='회비월 (yyyy-mm)'
                    fullWidth
                    value={newMonth}
                    onChange={(e) => setNewMonth(e.target.value)}
                    className="mb-16"
                />
                <TextField
                    label="금액"
                    fullWidth
                    type="number"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="mb-16"
                />
                 <TextField
                    label="납부일 (YYYY-MM-DD)"
                    fullWidth
                    value={newPaidAt}
                    onChange={(e) => setNewPaidAt(e.target.value)}
                    className="mb-16"
                />
                <Button variant="contained" fullWidth onClick={handleAddPayment}>등록</Button>
            </Box>
        </Modal>
        </div>

    );
};