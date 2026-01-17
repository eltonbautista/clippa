import Sidebar from '@/components/layout/Sidebar';
import React from 'react';

export default function AppLayout({ children }: { children: React.ReactNode}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>
    </div>
  )
}