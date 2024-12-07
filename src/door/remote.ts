import { CLIENT } from "@/remote";

export const openDoor = () => {
  return CLIENT.door.post("/open-door");
};
