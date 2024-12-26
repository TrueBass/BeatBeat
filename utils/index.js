import {
  FRONT_SOCKET_URI
} from "@env";
import { Platform } from "react-native";
import io from "socket.io-client";

// const fillsPhone = "http://192.168.56.1:3001";
// const eduroam = "http://192.168.56.1:3001";


export const socket = io(FRONT_SOCKET_URI);