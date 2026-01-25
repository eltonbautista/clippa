"use client";

import { useParams } from 'next/navigation';
// import { useUploadsSimple } from '@/hooks/useUploadsSimple';
import { useState } from 'react';
import { useUploads } from '@/context/UploadsProvider';

export interface IClip {
  id: string;
  uploadId: string;
  name: string;
  duration: number;
  thumbnailUrl?: string;
  status: "ready" | "uploading" | "uploaded" | "error";
}

function createInitialClips(uploadId: string): IClip[] {
  return [
    {
      id: "clip-1",
      uploadId,
      name: "Clip 1",
      duration: 30,
      status: "uploaded",
    },
    {
      id: "clip-2",
      uploadId,
      name: "Clip 2",
      duration: 45,
      status: "error",
    },
  ];
}

export default function UploadDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { uploads } = useUploads();

  const [clips, setClips] = useState<IClip[]>(() => createInitialClips(id));
  const [clipDuration, setClipDuration] = useState<number>(15);

  const upload = uploads.find(u => u.id === id);

  if (!upload) {
    return <div>Upload not found</div>;
  }
  
  const handleAddClip = () => {
    const newClip: IClip = {
      id: `clip-${clips.length + 1}`,
      uploadId: id,
      name: `Clip ${clips.length + 1}`,
      duration: clipDuration,
      status: "ready"
    }
    setClips([...clips, newClip]);
  }

  const handleUploadClip = (clipId: string) => {
    setClips(prev =>
      prev.map(c =>
        c.id === clipId ? { ...c, status: "uploading" } : c
      )
    );

    setTimeout(() => {
      setClips(prev =>
        prev.map(c =>
          c.id === clipId ? { ...c, status: "uploaded" } : c
        )
      );
    }, 2000);
  };

  const determineClipStatus = (status: 'ready' | 'uploading' | 'uploaded' | 'error') => {
    switch (status) {
      case 'ready':
        return 'Ready to upload';
      case 'uploading':
        return 'Uploading...';
      case 'uploaded':
        return 'Uploaded';
      case 'error':
        return 'Error during upload';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-xl font-semibold text-blue-500">{upload.title}</h1>
        <p className="text-gray-700">Status: {upload.status}</p>
        <p className="text-gray-700">Created: {new Date(upload.uploadedAt).toLocaleString()}</p>
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
          onClick={handleAddClip}
        >
          Add Clip
        </button>
        <input
          type="number"
          value={clipDuration}
          onChange={(e) => setClipDuration(Number(e.target.value))}
          className="mt-2 p-2 border rounded"
          placeholder="Duration in seconds"
        />
      </section>
      <section>
        <h2 className="text-lg font-semibold text-blue-400 mb-4">Clips</h2>
        {clips.length === 0 ? (
          <p className="text-gray-500">No clips available.</p>
        ) : (
          <ul className="space-y-4">
            {clips.map(clip => (
              <li key={clip.id} className="p-4 border rounded shadow-sm">
                <h3 className="font-medium text-gray-800">{clip.name}</h3>
                <p className="text-gray-600">Duration: {clip.duration} seconds</p>
                <p className="text-gray-600">Status: {clip.status}</p>
                <button
                  className={`px-3 py-1 rounded ${
                    clip.status === "ready" ? "bg-blue-500 text-white" :
                    clip.status === "uploading" ? "bg-gray-300 text-gray-600" :
                    "bg-green-500 text-white"
                  }`}
                  disabled={clip.status !== "ready"}
                  onClick={() => handleUploadClip(clip.id)}
                >
                  {determineClipStatus(clip.status)}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Clips section comes next */}
    </div>
  );
}