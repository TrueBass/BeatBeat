import {
  FRONT_SOCKET_URI,
  FRONT_SOCKET_FILL_WIFI,
  FRONT_SOCKET_FILL_PHONE
} from "@env";
import io from "socket.io-client";

// const eduroam = "http://192.168.56.1:3001";

export const socket = io(FRONT_SOCKET_FILL_PHONE);