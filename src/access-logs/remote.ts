import { CLIENT } from "@/remote";

export const accessLogsQuery = {
  queryKey: ["access-logs"],
  queryFn: () =>
    CLIENT.api.get<
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
