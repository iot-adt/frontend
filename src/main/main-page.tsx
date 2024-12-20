import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Video, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            출입 보안 관리
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button asChild className="w-full py-6 text-lg" variant="outline">
            <Link to="/user-registration">
              <UserPlus className="mr-2 h-6 w-6" />
              유저 등록 하러가기
            </Link>
          </Button>
          <Button asChild className="w-full py-6 text-lg" variant="outline">
            <Link to="/user-management">
              <UserPlus className="mr-2 h-6 w-6" />
              유저 수정하러 가기
            </Link>
          </Button>
          <Button asChild className="w-full py-6 text-lg" variant="outline">
            <Link to="/cctv">
              <Video className="mr-2 h-6 w-6" />
              CCTV 보러 가기
            </Link>
          </Button>
          <Button asChild className="w-full py-6 text-lg" variant="outline">
            <Link to="/access-logs">
              <ClipboardList className="mr-2 h-6 w-6" />
              출입 기록 보러가기
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
