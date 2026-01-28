import { IClip } from "@/lib/types"

export default function ClipItem({ clip, handleUploadClip, getClipStatusLabel }: { clip: IClip, handleUploadClip: (clipId: string) => void, getClipStatusLabel: (status: 'ready' | 'uploading' | 'uploaded' | 'error') => string }) {
  return (
    <div>
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
        {getClipStatusLabel(clip.status)}
      </button>
      {clip.status === 'error' && (
        <div>
          <p className="text-red-600 mt-2">There was an error uploading this clip. Please try again.</p>
          <p className="text-red-600 mt-1">Reason: {clip.errorReason}</p>
          <button
            className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
            onClick={() => handleUploadClip(clip.id)}
          >
            Retry
          </button>
        </div>
      )}
    </div>
  )
}