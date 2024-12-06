export type User = {
  id: number;
  name: string;
  accessMethods: ("지문" | "카드" | "얼굴인식")[];
  registrationDate: string;
  startDate: string;
  endDate: string;
};

export const usersQuery = {
  queryKey: ["users"],
  queryFn: () =>
    Promise.resolve([
      {
        id: 1,
        name: "홍길동",
        accessMethods: ["지문", "카드"],
        registrationDate: "2024-01-15",
        startDate: "2024-01-15",
        endDate: "2024-12-31",
      },
      {
        id: 2,
        name: "김철수",
        accessMethods: ["카드", "얼굴인식"],
        registrationDate: "2024-01-16",
        startDate: "2024-01-16",
        endDate: "2024-06-30",
      },
      {
        id: 3,
        name: "이영희",
        accessMethods: ["얼굴인식", "지문", "카드"],
        registrationDate: "2024-01-17",
        startDate: "2024-01-17",
        endDate: "2024-12-31",
      },
    ] as User[]),
  // CLIENT.apiget<{ id: number; rfid: string }>("/temporary-user/recent"),
};

export function editUser() {}

export function deleteUser() {}
