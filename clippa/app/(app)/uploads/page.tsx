"use client";

import { useUploads } from '@/hooks/useUploads';

export default function UploadsPage() {
  const { uploads, startProcessing } = useUploads();

  const uploadsItems = uploads.map(upload => {
    return (
      <li key={upload.id} className="p-4 bg-white rounded shadow mb-2">
        <h2 className="font-semibold text-blue-600">{upload.title}</h2>
        <p className="text-gray-700">Status: {upload.status}</p>
        {upload.status === 'uploaded' && (
          <button
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => startProcessing(upload.id)}
          >
            { upload.id + 'Start Processing' }
          </button>
        )}
      </li>
    )
  })

  return (
    <div className="bg-gray-100">
      <h1 className="text-xl font-semibold text-blue-500">Uploads</h1>
      <ul>
        {uploadsItems}
      </ul>
    </div>
  );
}