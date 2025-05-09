'use client';

import { Checkbox, FormControlLabel, MenuItem, Select, Table, TableCell, TableRow, TextField } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { members } from '.';
/**
 * 회원 관리 페이지
 * @returns 
 */
export default function AdminMembersPage() {
    
    /** 검색값 */
    const [searchText, setSearchText] = useState('');
    /** 미납자 추적 */
    const [filteredUnpaid, setFilteredUnpaid] = useState(false);
    /** 검색어로 필터링된 리스트*/
    const filteredMembers = members.filter((member) => {
        console.log('member', member);

        const findName = member.name.toLowerCase().includes(searchText.toLowerCase());
        // 미납자 필터 체크 시 해당 회원 paymnets중에 paidAt = null인게 있는경우
        const isUnpaid = member.payments?.some((p) => !p.paidAt);
        return findName && (!filteredUnpaid || isUnpaid);
    });

    /** 정렬 */
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    /** 정렬된 리스트 */
    const sortedMembers = [...filteredMembers].sort((a, b) => {
        if (sortOrder === 'newest') {
          return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime();
        } else {
          return new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime();
        }
      });
    
    /** 미납자 표기 */
    const displayMembers = sortedMembers.map((member) => {
        const isUnpaid = member.payments?.some((p) => !p.paidAt);
        return {
            ...member,
            isUnpaid,
            rowClass: isUnpaid ? 'bg-red-50' : '',
            textClass: isUnpaid ? 'text-red-600 font-semibold' : '',
        }
    })

    return (
        <div className="p-24">
            <h1 className="text-2xl font-bold mb-16">회원 관리</h1>
            {/* 검색창 */}
            <div className="mb-16">
                <div className="flex gap-12 items-center">
                    <TextField
                        label="회원 이름 검색"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <FormControlLabel 
                        control={
                            <Checkbox 
                                checked={filteredUnpaid}
                                onChange={(e) => setFilteredUnpaid(e.target.checked)}
                            />
                        }
                        label={'미납자'}
                    />
                </div>
                <Select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                    size="small"
                    variant="outlined"
                >
                    <MenuItem value='newest'>최신 가입순</MenuItem>
                    <MenuItem value='oldest'>오래된 가입순</MenuItem>
                </Select>
            </div>
            {/* 테이블 */}
            <Table className="min-w-full">
                <thead>
                    <tr>
                        <th className="text-left p-8">이름</th>
                        <th className="text-left p-8">이메일</th>
                        <th className="text-left p-8">가입일</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {members.map((member) => (
                        <tr key={member.id}>
                            <td className={'text-left p-8'}>{member.name}</td>
                            <td className="text-left p-8">{member.email}</td>
                            <td className="text-left p-8">{member.joinedAt}</td>
                        </tr>
                    ))} */}

                    {/* {filteredMembers.map((member) => (
                        <tr key={member.id}>
                            <td className={'text-left p-8'}>{member.name}</td>
                            <td className="text-left p-8">{member.email}</td>
                            <td className="text-left p-8">{member.joinedAt}</td>
                        </tr>
                    ))} */}

                    {/* {sortedMembers.map((member) => (
                        <tr key={member.id}>
                            <td>
                                <Link href={`/admin/members/${member.id}`} className="text-blue-600 hover:underline">
                                    {member.name}
                                </Link>
                            </td>
                            <td className="text-left p-8">{member.email}</td>
                            <td className="text-left p-8">{member.joinedAt}</td>
                        </tr>
                    ))} */}

                    {displayMembers.map((member) => (
                        <TableRow key={member.id} className={member.rowClass}>
                            <TableCell className={member.textClass}>
                                <Link href={`/admin/members/${member.id}`} className="text-blue-600 hover:underline">
                                    {member.name}
                                </Link>
                            </TableCell>
                            <TableCell className="text-left p-8">{member.email}</TableCell>
                            <TableCell className={`text-left p-8 ${member.textClass}`}>{member.joinedAt}</TableCell>
                        </TableRow>
                    ))}

                </tbody>
            </Table>
        </div>
    );
};


// const AdminMembersPage = () => {
//     console.log('dd');
//     return (
//         <div>
//             <h1>회원관리</h1>
//             <p>회원리스트임</p>
//         </div>
//     );
// };

// export default AdminMembersPage;


/**
 * 공식 문서에서는 일반 함수 컴포넌트를 추천함
 *  디버깅 할때 이름이 명확하게 찍힘 -> 크롬 react devtools같은 데서 이름이 정확하게 나옴
 *  arrow function은 가끔 추적안되거나 anonymous로 문제 생김
 *  next.js가 서버 쪽에서 컴포넌트를 최적화 하거나 코드 스플리팅할 때 일반함수가 내부적으로 더 최적화 쉽게함
 *  arrow function은 자신만의 this가 없고 상위 스코프의 this 를 그대로 가짐
 * 
 */