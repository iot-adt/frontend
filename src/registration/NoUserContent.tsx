import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function NoUserErrorPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
            <AlertCircle className="mr-2 h-6 w-6 text-red-500" />
            등록 시도한 유저가 없어요
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-lg">RFID 등록을 먼저 해주세요</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => window.location.reload()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            새로고침
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
