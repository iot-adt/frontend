import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { accessLogsQuery } from "./remote";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function AccessLogsPage() {
  const { data: accessLogs } = useSuspenseQuery(accessLogsQuery);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">출입 기록</h1>
      <Table>
        <TableCaption>최근 출입 기록</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">출입 시도 시각</TableHead>
            <TableHead>출입 성공 여부</TableHead>
            <TableHead>이름</TableHead>
            <TableHead>출입수단</TableHead>
            <TableHead className="w-[200px]">출입가능날짜</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accessLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.timestamp}</TableCell>
              <TableCell>
                <Badge variant={log.success ? "outline" : "destructive"}>
                  {log.success ? "성공" : "실패"}
                </Badge>
              </TableCell>
              <TableCell>{log.name}</TableCell>
              <TableCell>{log.accessMethod}</TableCell>
              <TableCell>{log.validPeriod}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
