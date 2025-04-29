'use client';
const AdminLayout = ({children}: {children:React.ReactNode}) => {
    console.log('dd');
    return (
        <div>
            {/* 사이드바 */}
            <nav>admin menu부분임</nav>
            {/* 본문 */}
            <main>{children}</main>
        </div>
    );
};

export default AdminLayout;