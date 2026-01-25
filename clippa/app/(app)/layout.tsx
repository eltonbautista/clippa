import Sidebar from '@/components/layout/Sidebar';
import { UploadsProvider } from '@/context/UploadsProvider';
import React from 'react';

export default function AppLayout({ children }: { children: React.ReactNode}) {
  return (
    <UploadsProvider>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-50">
            {children}
        </main>
      </div>
    </UploadsProvider>
  )
}