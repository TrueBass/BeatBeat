import React, {useState} from 'react';
import Chat from './chat';
//import Login from './Login';
import Users from './users';
import {
  getDatabase,
  get,
  ref,
  set,
  onValue,
  push,
  update,
} from 'firebase/database';
export default function ChatApp() {
    //first check if the user registered before
    //find a chat room 
}