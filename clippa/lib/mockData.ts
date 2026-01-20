export interface IVideoUpload {
  id: string;
  title: string;
  description: string;
  url: string;
  uploadedAt: Date;
  status: 'uploaded' | 'processing' | 'completed';
}

const mockVideoUploads: IVideoUpload[] = [
  {
    id: '1',
    title: 'Sample Video 1',
    description: 'This is a sample video upload.',
    url: 'https://example.com/video1.mp4',
    uploadedAt: new Date('2024-01-01T10:00:00Z'),
    status: 'uploaded',
  },
  {
    id: '2',
    title: 'Sample Video 2',
    description: 'This is another sample video upload.',
    url: 'https://example.com/video2.mp4',
    uploadedAt: new Date('2024-02-15T12:30:00Z'),
    status: 'processing',
  },
  {
    id: '3',
    title: 'Sample Video 3',
    description: 'Yet another sample video upload.',
    url: 'https://example.com/video3.mp4',
    uploadedAt: new Date('2024-03-20T09:15:00Z'),
    status: 'uploaded',
  },
  {
    id: '4',
    title: 'Sample Video 4',
    description: 'This is the fourth sample video upload.',
    url: 'https://example.com/video4.mp4',
    uploadedAt: new Date('2024-04-10T14:45:00Z'),
    status: 'uploaded',
  }
];

export default mockVideoUploads;