"use client";

import { createContext, useContext, useState } from 'react';
import mockData, { IVideoUpload } from '@/lib/mockData';

type UploadsContextType = {
  uploads: IVideoUpload[];
  startProcessing: (id: string) => void;
}

console.log('mockData in UploadsProvider:', mockData);

const UploadsContext = createContext<UploadsContextType | undefined>(undefined);

export function UploadsProvider({ children }: { children: React.ReactNode }) {
  const [uploads, setUploads] = useState<IVideoUpload[]>(mockData);

  const startProcessing = (id: string) => {
    setUploads(prevUploads =>
      prevUploads.map(upload => 
        upload.id === id ? { ...upload, status: 'processing' } : upload
      )
    );

    setTimeout(() => {
      setUploads(prev =>
        prev.map(upload =>
          upload.id === id ? { ...upload, status: 'completed' } : upload
        )
      )
    }, 2000);
  };

  return (
    <UploadsContext.Provider value={{ uploads, startProcessing }}>
      {children}
    </UploadsContext.Provider>
  );
}

export function useUploads() {
  const ctx = useContext(UploadsContext);
  if (!ctx) throw new Error("useUploads must be used within UploadsProvider");
  return ctx;
}