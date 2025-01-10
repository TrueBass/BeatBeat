import { ref, get, onValue, push, off } from 'firebase/database';
import { realtimeDB } from '../config/firebase'

// Fetch existing messages from a chatroom
export const fetchMessages = async (chatroomId) => {
  try {
    const snapshot = await get(ref(realtimeDB, `chatrooms/${chatroomId}/messages`));

    if (snapshot.exists()) {
     // const messages = snapshot.val();
      return snapshot.val();
    } else {
      console.log("No messages found for this chatroom.");
      return []; 
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};

// Listen for chatroom changes (new messages)
export const listenToChatroomChanges = (chatroomId, callback) => {
  const chatroomRef = ref(realtimeDB, `chatrooms/${chatroomId}/messages`);
  onValue(chatroomRef, snapshot => {
    const data = snapshot.val();
    callback(data); // Pass the messages to the callback
  });

  return () => {
    off(chatroomRef); // Cleanup the listener when component unmounts
  };
};
export const sortMessages = (messages) => {
  const sortedMessages = Object.entries(messages)
  .map(([key, message]) => ({
    id: key, // Save the message ID
    ...message
  }))
  .sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateA - dateB; // Sorting by the createdAt field
  });
  return sortedMessages;
};

// Send a message to the chatroom
export const sendMessage = async (chatroomId, msg) => {
  try {
    const messageRef = ref(realtimeDB, `chatrooms/${chatroomId}/messages/`);
    await push(messageRef, {
      _id: msg._id,
      text: msg.text,
      user: msg.user,
      createdAt: msg.createdAt.toISOString() // Store the date as a string
    });
  } catch (error) {
    console.error("Error sending message: ", error);
  }
};
