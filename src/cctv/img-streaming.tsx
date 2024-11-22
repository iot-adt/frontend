import { useEffect, useState } from "react";
import VideoFallback from "./video-fallback";

const ImageStreamer = ({
  socketUrl,
  className,
}: {
  socketUrl: string;
  className?: string;
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const ws = new WebSocket(socketUrl);

    ws.onmessage = (event) => {
      // WebSocket으로 받은 데이터를 img 태그에 표시
      setImageSrc(`data:image/jpeg;base64,${event.data}`);
    };

    ws.onclose = () => {
      console.error("WebSocket 연결이 닫혔습니다.");
    };

    ws.onerror = (error) => {
      console.error("WebSocket 오류:", error);
    };

    return () => {
      ws.close();
    };
  }, [socketUrl]);

  return (
    <div style={{ textAlign: "center" }} className={className}>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="Streamed Frame"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <VideoFallback />
      )}
    </div>
  );
};

export default ImageStreamer;
