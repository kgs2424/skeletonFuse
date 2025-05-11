'use client';

import { Box, Button, Checkbox, FormControlLabel, MenuItem, Modal, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { members } from '.';
import type { Member } from "../type";
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

    // 선택한 회원(상세페이지)
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    // 열기
    const handleOpenDetail = (member) => {
        setSelectedMember(member);
    };
    // 닫기
    const handleCloseDetail = () => {
        setSelectedMember(null);
    };
    const selectedMemberDetail = selectedMember?.payments.map((p)=>{
        const isPaid = !!p.paidAt;
        return (
            <TableRow key={`${p.month}abc`}>
                <TableCell>{p.month}</TableCell>
                <TableCell>{p.amount?.toLocaleString()}원</TableCell>
                <TableCell>{p.paidAt || '-'}</TableCell>
                <TableCell className={isPaid ? 'text-green-600' : 'text-red-600'}>
                    {isPaid ? '완납' : '미납'}
                </TableCell>
            </TableRow>
        );
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
                                    {member.name} 이건 링크
                                </Link>
                                <span
                                    className="text-blue-600 hover:underline"
                                    onClick={ ()=> handleOpenDetail(member)}
                                >
                                    {member.name} 이건 모달
                                </span>
                            </TableCell>
                            <TableCell className="text-left p-8">{member.email}</TableCell>
                            <TableCell className={`text-left p-8 ${member.textClass}`}>{member.joinedAt}</TableCell>
                        </TableRow>
                    ))}

                </tbody>
            </Table>

            {/* 회원 상세페이지 모달 */}
            <Modal open={!!selectedMember} onClose={handleCloseDetail}>
                <Box 
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                    }}>
                    {selectedMember && (
                        <>
                            <h2 className="text-xl font-bold mb-16">상세정보</h2>
                            <div className="flex justify-end">
                                <Button variant="outlined" onClick={handleCloseDetail}>닫기</Button>
                            </div>
                            <div className="space-y-4 mb-16">
                                <div>이름: {selectedMember.name}</div>
                                <div>이메일: {selectedMember.email}</div>
                                <div>전화번호: {selectedMember.phone}</div>
                                <div>가입일: {selectedMember.joinedAt}</div>
                            </div>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>회비월</TableCell>
                                        <TableCell>납부금액</TableCell>
                                        <TableCell>납부일</TableCell>
                                        <TableCell>상태</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {selectedMemberDetail}
                                    {/* {selectedMember.payments.map((p) => {
                                        const isPaid = !!p.paidAt;
                                        return (
                                            <TableRow key={`${p.month}abc`}>
                                                <TableCell>{p.month}</TableCell>
                                                <TableCell>{p.amount?.toLocaleString()}원</TableCell>
                                                <TableCell>{p.paidAt || '-'}</TableCell>
                                                <TableCell className={isPaid ? 'text-green-600' : 'text-red-600'}>
                                                    {isPaid ? '완납' : '미납'}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })} */}
                                </TableBody>
                            </Table>
                        </>
                    )}
                </Box>
            </Modal>
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

/**
 * Tree Shaking ?
 * 안 쓰는 코드를 최종 번들 파일에서 자동으로 제거하는 최적화 기법
 * 번들러가 이걸 지원해야 사용가능
 * 사이드 이펙트가 없어야 잘 작동함
 * 타입만 쓸 때 type을 붙이면 트리 셰이킹을 도와줌
 * 타입만 쓴다고 명시해서 런타임에 영향을 안줌
 */

//헬퍼함수 = 걍 복잡한거 정리해주는 보조함수, 리턴문 위에서 따로 가공해서 쓰면 여러곳에서 쓸 수 있으니 좋음

/**
 * sx
 * 내부적으로는 CSS-in-JS 엔진이 처리함
 * 실제로는 DOM에 CSS클래스가 붙고, 성능이나 기능 제약 없음
 * 스타일 객체를 변수로 뺴서 재사용도 가능함
 * 공통 컴포넌트 같은거 만들 때 css동적으로 설정필요할 때 쓰면 좋은듯
 * mantine에서 cx도 있는데...
 */