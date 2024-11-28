import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pencil,
  Trash2,
  Search,
  Fingerprint,
  CreditCard,
  Camera,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSuspenseQuery } from "@tanstack/react-query";
import { usersQuery } from "./remote";

type AccessMethod = "지문" | "카드" | "얼굴인식";

export default function UserManagementPage() {
  const { data } = useSuspenseQuery(usersQuery);
  const users = data;
  const [searchTerm, setSearchTerm] = useState("");

  const getAccessMethodIcon = (method: AccessMethod) => {
    switch (method) {
      case "지문":
        return <Fingerprint className="h-4 w-4" />;
      case "카드":
        return <CreditCard className="h-4 w-4" />;
      case "얼굴인식":
        return <Camera className="h-4 w-4" />;
    }
  };

  const handleEdit = (userId: number) => {
    // 수정 로직 구현
    console.log("Edit user:", userId);
  };

  const handleDelete = (userId: number) => {
    // 삭제 로직 구현
    console.log("Delete user:", userId);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 h-full">
      <h1 className="text-2xl font-bold mb-6">사용자 관리</h1>

      {/* 검색 필드 */}
      <div className="relative mb-6">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="이름으로 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>

      {/* 사용자 테이블 */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>등록 수단</TableHead>
            <TableHead>등록 일자</TableHead>
            <TableHead>출입 가능 기간</TableHead>
            <TableHead className="text-left">관리</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {user.accessMethods.map((method) => (
                    <Badge
                      key={method}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {getAccessMethodIcon(method)}
                      {method}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{user.registrationDate}</TableCell>
              <TableCell>{`${user.startDate} ~ ${user.endDate}`}</TableCell>
              <TableCell className="text-left">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(user.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredUsers.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
}
