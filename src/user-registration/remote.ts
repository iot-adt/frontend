import { client } from "@/remote";

export const temporaryUserQUery = {
  queryKey: ["temporary-user"],
  queryFn: () =>
    CLIENT.apiget<{ id: number; rfid: string }>("/temporary-user/recent"),
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
  return CLIENT.apipost("/users/register", {
    rfid,
    name,
    accessStart: startDate,
    accessEnd: endDate,
  });
};
