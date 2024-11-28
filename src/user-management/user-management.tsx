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
  CalendarIcon,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { User, usersQuery } from "./remote";

type AccessMethod = "지문" | "카드" | "얼굴인식";

export default function UserManagementPage() {
  const { data } = useSuspenseQuery(usersQuery);
  const users = data;

  const [searchTerm, setSearchTerm] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

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

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setStartDate(new Date(user.startDate));
    setEndDate(new Date(user.endDate));
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      // 여기에 실제 삭제 로직 구현
      console.log("Delete user:", selectedUser.id);
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const handleSaveEdit = () => {
    if (selectedUser && startDate && endDate) {
      // 여기에 실제 저장 로직 구현
      console.log("Save edit:", {
        userId: selectedUser.id,
        newStartDate: format(startDate, "yyyy-MM-dd"),
        newEndDate: format(endDate, "yyyy-MM-dd"),
      });
      setIsEditDialogOpen(false);
    }
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
                    onClick={() => handleEdit(user)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDeleteClick(user)}
                  >
                    <Trash2 className="h-4 w-4 bg-transparent" />
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedUser?.name} 출입 기간 수정</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">출입 시작일</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "날짜 선택"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">출입 종료일</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "날짜 선택"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) => (startDate ? date < startDate : false)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              취소
            </Button>
            <Button onClick={handleSaveEdit}>저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 삭제 확인 다이얼로그 */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              사용자 삭제
            </DialogTitle>
            <DialogDescription className="pt-4">
              <span className="font-medium">{selectedUser?.name}</span>님의 출입
              정보가 삭제됩니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              취소
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
