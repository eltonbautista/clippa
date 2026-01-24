"use client";

import { useUploads } from '@/hooks/useUploads';
import Table from '@/components/ui/Table';
import TableItem from '@/components/ui/TableItem';

export default function UploadsPage() {
  const { uploads, startProcessing } = useUploads();

  const uploadsItems = uploads.map(upload => {
    const createdDate = upload.uploadedAt.toISOString().split('T')[0];
    
    return (
      <TableItem key={upload.id} fileName={upload.title} status={upload.status} created={createdDate}>
        {upload.status === 'uploaded' && (
          <button
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => startProcessing(upload.id)}
          >
            { 'Start Processing' }
          </button>
        )}
      </TableItem>
    )
  })

  return (
    <div className="bg-gray-100">
      <h1 className="text-xl font-semibold text-blue-500">Uploads</h1>
      <Table>
        {uploadsItems}
      </Table>
    </div>
  );
}