"use client";

import { createContext, useContext, useState } from 'react';
import mockData, { IVideoUpload } from '@/lib/mockData';
import { IClip } from '@/lib/types';

type UploadsContextType = {
  uploads: IVideoUpload[];
  startProcessing: (id: string) => void;
  deleteUpload: (id: string) => void;
  addClip: (uploadId: string, clip: IClip) => void;
  updateClip: (uploadId: string, clipId: string, updates: Partial<IClip>) => void;
}

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

  const deleteUpload = (id: string) => {
    setUploads(prevUploads => prevUploads.filter(upload => upload.id !== id));
  }

  const addClip = (uploadId: string, clip: IClip) => {
    setUploads(prev =>
      prev.map(upload =>
        upload.id === uploadId
          ? { ...upload, clips: [...(upload.clips || []), clip] }
          : upload
      )
    );
  };

  const updateClip = (uploadId: string, clipId: string, updates: Partial<IClip>) => {
    setUploads(prev =>
      prev.map(upload =>
        upload.id === uploadId
          ? {
              ...upload,
              clips: (upload.clips || []).map(clip =>
                clip.id === clipId ? { ...clip, ...updates } : clip
              ),
            }
          : upload
      )
    );
  };

  return (
    <UploadsContext.Provider value={{ uploads, startProcessing, deleteUpload, addClip, updateClip }}>
      {children}
    </UploadsContext.Provider>
  );
}

export function useUploads() {
  const ctx = useContext(UploadsContext);
  if (!ctx) throw new Error("useUploads must be used within UploadsProvider");
  return ctx;
}