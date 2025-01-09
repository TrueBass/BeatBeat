import { realtimeDB } from '../config/firebase';
import {
  get,
  ref,
  set,
  onValue,
  push,
  update,
} from 'firebase/database';

export const findUser = async (userID) => {
  const userRef = ref(realtimeDB, `users/${userID}`);
  const snapshot = await get(userRef);
  return snapshot.exists() ? snapshot.val() : null;
};
//listener for friends change = if somebody hits 💜 on you
export const listenToUserFriends = (userID, setUsers, setMyData) => {
  const userRef = ref(realtimeDB, `users/${userID}`); // Set up a listener to update the state whenever the friends list changes
  onValue(userRef, snapshot => {
    const data = snapshot.val();
    if (data) {
      setUsers(data.friends);
      setMyData(prevData => ({
        ...prevData,
        friends: data.friends,
      }));
    }
  });
};
export const isFriend = (friends, userID) => {
  return friends && friends.some(friend => friend.userID === userID);
};

// Add a user to a friend's list (appending user to their `friends` field)
export const addToFriendsList = async (userID, friendID, chatroomId) => {
  try {
    const userRef = ref(realtimeDB, `users/${userID}/friends`);
    const friendRef = ref(realtimeDB, `users/${friendID}/friends`);

    await update(userRef, {
      [friendID]: chatroomId
    });
    await update(friendRef, {
      [userID]: chatroomId
    });

    //console.log(`Successfully added ${friendID} to ${userID}'s friends list and vice versa.`);
  } catch (error) {
    console.error("Error adding to friends list:", error);
  }
};

// Create a new chatroom between two users
export const createChatroom = async (myUserID, otherUserID) => {
  const sortedUserIds = [myUserID, otherUserID].sort();
  const chatroomId = sortedUserIds.join('_');
  const chatroomRef = ref(realtimeDB, `chatrooms/${chatroomId}`);
  
  await set(chatroomRef, {
    firstUser: myUserID,
    secondUser: otherUserID,
    messages: [],
  });
  addToFriendsList(myUserID, otherUserID, chatroomId);
  return chatroomId;  // Return the newly created chatroom ID
};


export const getUserChatrooms = async (userId) => {
  try {
    const friendsRef = ref(realtimeDB, `users/${userId}/friends`);
    const snapshot = await get(friendsRef);
    if (snapshot.exists()) {
      const friends = snapshot.val();
      const chatroomIds = Object.values(friends);
      console.log(chatroomIds);
      return chatroomIds;
    } else {
      console.log("No data available for user.");
      return [];
    }
  } catch (error) {
    console.error("Error getting user chatroomIds:", error);
    // throw error;
  }
};
export const fetchLastMessage = async (chatroomId) => {
  try {
    const messagesRef = ref(realtimeDB, `chatrooms/${chatroomId}/messages`);

    const snapshot = await get(messagesRef);

    if (snapshot.exists()) {
      const messages = snapshot.val();
      const messageKeys = Object.keys(messages);
      const lastMessageKey = messageKeys[messageKeys.length - 1];  // Get the key of the last message
      const lastMessage = messages[lastMessageKey];  // Get the last message

      //console.log("Last message:", lastMessage);
      return lastMessage;  // Return the last message object
    } else {
      console.log("No messages found for this chatroom.");
      return null;  // Return null if no messages found
    }
  } catch (error) {
    console.error("Error fetching last message:", error);
    return null; 
  }
};
export const getUserLastMessages = async (userId) => {
  try {
    // First, get the list of chatroomIds for the user
    const chatroomIds = await getUserChatrooms(userId);
    const lastMessagesMap = {};

    // Loop through each chatroomId, fetch the last message, and store it in the map
    for (let chatroomId of chatroomIds) {
      if (chatroomId) {
        const lastMessage = await fetchLastMessage(chatroomId);
        lastMessagesMap[chatroomId] = lastMessage;
      }
    }

    return lastMessagesMap;  // Return the map with chatroomId as keys and last messages as values
  } catch (error) {
    console.error("Error getting last messages for user:", error);
    return {};  // Return an empty object in case of an error
  }
};
