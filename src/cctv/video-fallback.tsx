import { VideoOff } from "lucide-react";

export default function VideoFallback() {
  return (
    <div className="text-gray-400 flex flex-col justify-center items-center w-full h-full">
      <VideoOff className="h-12 w-12 mb-2" />
      <span>영상 없음</span>
    </div>
  );
}
