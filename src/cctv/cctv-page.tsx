import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2, Play, Pause } from "lucide-react";
import VideoFallback from "./video-fallback";
import ImageStreamer from "./img-streaming";
import { Label } from "@/components/ui/label";

type CCTVFeed = {
  id: string;
  name: string;
  url: string | null;
};

const cctvFeeds: CCTVFeed[] = [
  { id: "1", name: "1층 내부", url: "ws://10.147.20.102:5000/video" },
  { id: "2", name: "2층 내부", url: null },
  { id: "3", name: "출입문", url: null },
  { id: "4", name: "외부", url: null },
];

export default function CCTVPage() {
  const [fullscreenFeed, setFullscreenFeed] = useState<string | null>(null);
  const [playingFeeds, setPlayingFeeds] = useState<Set<string>>(
    new Set(cctvFeeds.map((feed) => feed.id))
  );
  const [isSecurityMode, setIsSecurityMode] = useState(false);

  const toggleFullscreen = (feedId: string) => {
    setFullscreenFeed(fullscreenFeed === feedId ? null : feedId);
  };

  const togglePlayPause = (feedId: string) => {
    setPlayingFeeds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(feedId)) {
        newSet.delete(feedId);
      } else {
        newSet.add(feedId);
      }
      return newSet;
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">CCTV 모니터링</h1>
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="security-mode">보안 모드</Label>
              <div className="flex flex-col space-y-1">
                <Button
                  variant={isSecurityMode ? "outline" : "destructive"}
                  size="icon"
                  onClick={() => setIsSecurityMode(!isSecurityMode)}
                  className="w-[100px]"
                >
                  {isSecurityMode ? "비활성화" : "활성화"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`grid gap-4 ${
          fullscreenFeed ? "grid-cols-1" : "grid-cols-2"
        }`}
      >
        {cctvFeeds.map((feed) => (
          <Card
            key={feed.id}
            className={
              fullscreenFeed && fullscreenFeed !== feed.id ? "hidden" : ""
            }
          >
            <CardContent className="p-4">
              <div className="relative aspect-video bg-gray-200 flex items-center justify-center">
                {feed.url ? (
                  <ImageStreamer
                    socketUrl={feed.url}
                    className="w-full h-full"
                    isSecurityMode={isSecurityMode}
                  />
                ) : (
                  <VideoFallback />
                )}
                <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                  {feed.name}
                </div>
                <div className="absolute bottom-2 right-2 space-x-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => toggleFullscreen(feed.id)}
                  >
                    {fullscreenFeed === feed.id ? (
                      <Minimize2 className="h-4 w-4" />
                    ) : (
                      <Maximize2 className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => togglePlayPause(feed.id)}
                    disabled={!feed.url}
                  >
                    {playingFeeds.has(feed.id) ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
