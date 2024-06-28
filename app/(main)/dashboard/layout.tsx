import React from 'react'

interface DashboardLayoutProps {
    children: React.ReactNode
    params: any
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, params }) => {
    return (
        <main className='h-screen overflow-hidden flex'>
            {children}
        </main>
    )
}

export default DashboardLayout