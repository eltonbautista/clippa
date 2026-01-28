"use client";

import { useParams } from 'next/navigation';
// import { useUploadsSimple } from '@/hooks/useUploadsSimple';
import { useState } from 'react';
import { useUploads } from '@/context/UploadsProvider';
import { IClip } from '@/lib/types';

import ClipItem from '@/components/ui/ClipItem';

function createInitialClips(uploadId: string): IClip[] {
  return [
    {
      id: "clip-1",
      uploadId,
      name: "Clip 1",
      duration: 30,
      status: "ready",
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

const errorReasons = [
  "Network error",
  "Upload timed out",
  "Invalid clip duration",
];

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
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
      const isSuccess = getRandomInt(100) < 80;
      
      setClips(prev =>
        prev.map(c =>
          c.id === clipId ? { ...c, status: isSuccess ? "uploaded" : "error", errorReason: isSuccess ? undefined : errorReasons[getRandomInt(errorReasons.length)] } : c
        )
      );
    }, 2000);
  };

  const getClipStatusLabel = (status: 'ready' | 'uploading' | 'uploaded' | 'error') => {
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
          className={`mt-4 px-4 py-2 bg-green-500 text-white rounded ${upload.status !== 'completed' ? 'bg-red-500 cursor-not-allowed' : ''}`}
          disabled={upload.status !== 'completed'}
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
      { upload.status === 'completed' ? <section>
        <h2 className="text-lg font-semibold text-blue-400 mb-4">Clips</h2>
        {clips.length === 0 ? (
          <p className="text-gray-500">No clips available.</p>
        ) : (
          <ul className="space-y-4">
            {clips.map(clip => (
              <li key={clip.id} className="p-4 border rounded shadow-sm">
                <ClipItem clip={clip} handleUploadClip={handleUploadClip} getClipStatusLabel={getClipStatusLabel} />
              </li>
            ))}
          </ul>
        )}
      </section> : <section>
          {upload.status === "processing" && (
  <div className="rounded-md border border-yellow-300 bg-yellow-50 p-4 text-yellow-800">
    <p className="font-medium">Processing video…</p>
    <p className="text-sm">
      Your video is being processed. Clips will be available once this finishes.
    </p>
  </div>
)}

        {upload.status === "uploaded" && (
          <div className="rounded-md border border-blue-300 bg-blue-50 p-4 text-blue-800">
            <p className="font-medium">Ready to process</p>
            <p className="text-sm">
              Click “Process” on the uploads page to generate clips.
            </p>
          </div>
        )}

        </section>}
    </div>
  );
}