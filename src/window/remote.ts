import { CLIENT } from "@/remote";

export const lockWindow = () => {
  return CLIENT.window.post("/lock");
};

export const unlockWindow = () => {
  return CLIENT.window.post("/unlock");
};
