import { CLIENT } from "@/remote";

export type AccessLogs = {
  logId: number;
  userId?: number;
  timestamp: string;
  result?: boolean;
  method?: string;
  name?: string;
};

export const accessLogsQuery = {
  queryKey: ["access-logs"],
  queryFn: () => CLIENT.api.get<AccessLogs[]>("/access/logs"),
};
