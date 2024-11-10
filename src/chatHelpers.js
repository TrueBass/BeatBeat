import { realtimeDB } from '../config/firebase'
import {
  getDatabase,
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

// Create a new chatroom between two users
export const createChatroom = async (myUserID, otherUserID) => {
  const chatroomRef = push(ref(realtimeDB, 'chatrooms'), {
    firstUser: myUserID,
    secondUser: otherUserID,
    messages: [],
  });
  return chatroomRef.key; // Return the newly generated chatroom ID
};

// Add a user to a friend's list (appending user to their `friends` field)
export const addToFriendsList = async (userID, friendID, friendData) => {
  const userRef = ref(realtimeDB, `users/${userID}`);
  await update(userRef, { friends: {[friendID]: friendData} });
};

// Main function to add a friend
