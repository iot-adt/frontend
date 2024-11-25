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
import { Suspense } from "react";

export default function AccessLogsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Content />
    </Suspense>
  );
}

function Content() {
  const { data } = useSuspenseQuery(accessLogsQuery);
  const accessLogs = data.data;

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
          </TableRow>
        </TableHeader>
        <TableBody>
          {accessLogs?.map((log) => (
            <TableRow key={log?.logId}>
              <TableCell>{log?.timestamp}</TableCell>
              <TableCell>
                <Badge variant={log?.result ? "outline" : "destructive"}>
                  {log?.result ? "성공" : "실패"}
                </Badge>
              </TableCell>
              <TableCell>{log?.name}</TableCell>
              <TableCell>{log?.method}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
