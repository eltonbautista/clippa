"use client";

import { useState } from "react";
import mockData, { IVideoUpload } from "@/lib/mockData";

export function useUploadsSimple() {
  const [uploads, setUploads] = useState<IVideoUpload[]>(mockData);

  const startProcessing = (id: string) => {
    setUploads(prev => {
      const target = prev.find(u => u.id === id);

      if (!target || target.status !== "uploaded") {
        return prev;
      }

      return prev.map(upload =>
        upload.id === id
          ? { ...upload, status: "processing" }
          : upload
      );
    });

    setTimeout(() => {
      setUploads(prev =>
        prev.map(upload =>
          upload.id === id
            ? { ...upload, status: "completed" }
            : upload
        )
      );
    }, 2500);
  };

  return {
    uploads,
    startProcessing,
  };
}
