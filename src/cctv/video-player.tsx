import { useEffect, useRef, useState } from "react";
import mpegts from "mpegts.js";
import VideoFallback from "./video-fallback";

const VideoPlayer = ({
  socketUrl,
  className,
}: {
  socketUrl: string;
  className?: string;
}) => {
  // useRef의 초기 값 타입을 HTMLVideoElement 또는 null로 지정
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasError, setHasError] = useState(false); // 에러 상태 관리

  useEffect(() => {
    if (mpegts.getFeatureList().mseLivePlayback) {
      const player = mpegts.createPlayer({
        type: "websocket",
        isLive: true,
        url: socketUrl,
      });

      // 비디오 요소에 attach
      if (videoRef.current) {
        player.attachMediaElement(videoRef.current);

        player.load();
        player.play()?.catch(() => {
          // 재생 중 에러 발생 시 상태 업데이트
          setHasError(true);
        });

        // 플레이어 에러 핸들링
        player.on(mpegts.Events.ERROR, () => {
          setHasError(true);
        });
      } else {
        setHasError(true); // 비디오 요소가 없는 경우에도 에러 처리
      }

      // 컴포넌트 언마운트 시 플레이어 자원 해제
      return () => {
        player.destroy();
      };
    } else {
      setHasError(true); // mseLivePlayback을 지원하지 않으면 에러
    }
  }, [socketUrl]);

  return (
    <div className={className} style={{ textAlign: "center" }}>
      {/* {hasError ? (
        <VideoFallback />
      ) : ( */}
      <video
        ref={videoRef}
        style={{ width: "100%", height: "auto" }}
        controls
        autoPlay
        muted
      />
      {/* )} */}
    </div>
  );
};

export default VideoPlayer;
