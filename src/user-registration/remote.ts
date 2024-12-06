import { CLIENT } from "@/remote";

export const temporaryUserQUery = {
  queryKey: ["temporary-user"],
  queryFn: () =>
    CLIENT.api.get<{ id: number; rfid: string }>("/temporary-user/recent"),
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
  return CLIENT.api.post("/users/register", {
    rfid,
    name,
    accessStart: startDate,
    accessEnd: endDate,
  });
};
