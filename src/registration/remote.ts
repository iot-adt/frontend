import { client } from "@/remote";

export const temporaryUserQUery = {
  queryKey: ["temporary-user"],
  queryFn: () => client.get<{ id: number; rfid: string }>("/temporary-user"),
};

export const createUser = ({
  name,
  rfid,
  startDate,
  endDate,
}: {
  name: string;
  rfid: string;
  startDate: Date;
  endDate: Date;
}) => {
  return client.post("/users/register", {
    rfid,
    name,
    accessStart: startDate,
    accessEnd: endDate,
  });
};
