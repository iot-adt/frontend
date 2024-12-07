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
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isSocketReady, setIsSocketReady] = useState(false);

  useEffect(() => {
    const websocket = new WebSocket(socketUrl);

    websocket.onopen = () => {
      console.log("WebSocket onopen");
      setIsSocketReady(true);
      websocket.send(isSecurityMode === true ? "secure" : "normal");
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, [socketUrl, isSecurityMode]);

  useEffect(() => {
    if (!isSocketReady) {
      return;
    }
    if (ws == null) {
      return;
    }

    ws.onmessage = (event) => {
      setImageSrc(`data:image/jpeg;base64,${event.data}`);
    };

    ws.onclose = () => {
      console.error("WebSocket 연결이 닫혔습니다.");
    };

    ws.onerror = (error) => {
      console.error("WebSocket 오류:", error);
    };

    return () => {
      ws?.close();
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
