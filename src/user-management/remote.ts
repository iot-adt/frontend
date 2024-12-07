import { CLIENT } from "@/remote";

export type User = {
  id: number;
  name: string;
  photoPath: string;
  rfid: string;
  accessStart: string;
  accessEnd: string;
};

export const usersQuery = {
  queryKey: ["user-list"],
  queryFn: () => CLIENT.api.get<User[]>("/users"),
};

export function editUser(id: User["id"], user: User) {
  return CLIENT.api.put(`/users/${id}`, user);
}

export function deleteUser(id: User["id"]) {
  return CLIENT.api.delete(`/users/${id}`);
}
