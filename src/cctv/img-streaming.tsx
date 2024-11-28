import { useEffect, useState } from "react";
import VideoFallback from "./video-fallback";

const ImageStreamer = ({
  socketUrl,
  className,
  isSecurityMode = false,
}: {
  socketUrl: string;
  className?: string;
  isSecurityMode?: boolean;
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [ws] = useState(() => new WebSocket(socketUrl));
  const isSocketReady = ws != null && ws.readyState === 1;

  useEffect(() => {
    if (!isSocketReady) {
      return;
    }
    ws.send(isSecurityMode === true ? "secure" : "normal");
  }, [isSecurityMode, isSocketReady, ws]);

  useEffect(() => {
    if (!isSocketReady) {
      return;
    }

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
  }, [isSocketReady, socketUrl, ws]);

  return (
    <div style={{ textAlign: "center" }} className={className}>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="Streamed Frame"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: isSecurityMode ? "grayscale(100%)" : "none",
          }}
        />
      ) : (
        <VideoFallback />
      )}
    </div>
  );
};

export default ImageStreamer;
