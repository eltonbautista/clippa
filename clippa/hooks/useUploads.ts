"use client";

import mockData, { IVideoUpload } from '@/lib/mockData';
import { useState, useEffect } from 'react';

let sharedUploads: IVideoUpload[] = mockData;
const listeners = new Set<(uploads: IVideoUpload[]) => void>();

function notifyListeners() {
  listeners.forEach(listener => listener([...sharedUploads]));
}

export function useUploads() {
  const [uploads, setUploads] = useState<IVideoUpload[]>(sharedUploads);

  useEffect(() => {
    listeners.add(setUploads);
    return () => { listeners.delete(setUploads); };
  }, []);

  const startProcessing = (id: string) => {
    const target = sharedUploads.find(upload => upload.id === id);
    if (!target || target.status !== 'uploaded') return;

    sharedUploads = sharedUploads.map(upload =>
      upload.id === id ? { ...upload, status: 'processing' } : upload
    );
    notifyListeners();

    setTimeout(() => {
      sharedUploads = sharedUploads.map(upload =>
        upload.id === id ? { ...upload, status: 'completed' } : upload
      );
      notifyListeners();
    }, 2500);
  }

  return { uploads, startProcessing };
}