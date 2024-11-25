import { client } from "@/remote";

export const accessLogsQuery = {
  queryKey: ["access-logs"],
  queryFn: () =>
    client.get<
      {
        logId: number;
        userId: number;
        LocalDateTime: string;
        result: boolean;
        method: string;
      }[]
    >("/access/logs"),
};
