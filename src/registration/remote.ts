export const temporaryUserQUery = {
  queryKey: ["temporary-user"],
  queryFn: () =>
    Promise.resolve({
      id: 1,
      rfid: "alalalal",
    }),
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
  return Promise.resolve({
    name,
    rfid,
    startDate,
    endDate,
  });
};
