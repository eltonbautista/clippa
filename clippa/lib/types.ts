export interface IClip {
  id: string;
  uploadId: string;
  name: string;
  duration: number;
  thumbnailUrl?: string;
  status: "ready" | "uploading" | "uploaded" | "error";
  errorReason?: string;
}