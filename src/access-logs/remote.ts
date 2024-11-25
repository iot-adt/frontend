import { client } from "@/remote";

export const accessLogsQuery = {
  queryKey: ["access-logs"],
  queryFn: () =>
    client.get<
      {
        logId: number;
        userId?: number;
        timestamp: string;
        result?: boolean;
        method?: string;
        name?: string;
      }[]
    >("/access/logs"),
};
