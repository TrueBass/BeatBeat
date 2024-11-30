import { ref, get, onValue, push, off } from 'firebase/database';
import { realtimeDB } from '../config/firebase'

// Fetch existing messages from a chatroom
export const fetchMessages = async (chatroomId) => {
  try {
    const snapshot = await get(ref(realtimeDB, `chatrooms/${chatroomId}/messages`));

    if (snapshot.exists()) {
      const messages = snapshot.val();
      
      // Convert messages object to an array and sort by createdAt
      const sortedMessages = Object.values(messages).sort((a, b) => 
        new Date(a.createdAt) - new Date(b.createdAt)
      );
      return sortedMessages;
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
  const chatroomRef = ref(realtimeDB, `chatrooms/${chatroomId}`);
  onValue(chatroomRef, snapshot => {
    const data = snapshot.val();
    callback(data); // Pass the messages to the callback
  });

  return () => {
    off(chatroomRef); // Cleanup the listener when component unmounts
  };
};

// Send a message to the chatroom
export const sendMessage = async (chatroomId, msg) => {
  try {
    const messageRef = ref(realtimeDB, `chatrooms/${chatroomId}/messages`);
    await push(messageRef, {
      text: msg.text,
      sender: msg.sender,
      createdAt: new Date().toISOString(), // Store the date as a string
    });
  } catch (error) {
    console.error("Error sending message: ", error);
  }
};
