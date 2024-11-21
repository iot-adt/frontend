import { useEffect, useRef } from "react";
import mpegts from "mpegts.js";

const VideoPlayer = ({ socketUrl }: { socketUrl: string }) => {
  // useRef의 초기 값 타입을 HTMLVideoElement 또는 null로 지정
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (mpegts.getFeatureList().mseLivePlayback) {
      // 타입스크립트에서는 mpegts.createPlayer의 반환 타입을 명시적으로 확인
      const player = mpegts.createPlayer({
        type: "websocket",
        isLive: true,
        url: socketUrl,
      });

      // videoRef.current가 null이 아닐 때만 attachMediaElement 호출
      if (videoRef.current) {
        player.attachMediaElement(videoRef.current);
        player.load();
        player.play();
      }

      // 컴포넌트 언마운트 시 플레이어 자원 해제
      return () => {
        player.destroy();
      };
    }
  }, [socketUrl]);

  return (
    <div>
      <video
        ref={videoRef}
        style={{ width: "100%", height: "auto" }}
        controls
      />
    </div>
  );
};

export default VideoPlayer;
