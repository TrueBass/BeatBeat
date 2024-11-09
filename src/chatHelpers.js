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
  const database = getDatabase();
  const userRef = ref(database, `users/${userID}`);
  const snapshot = await get(userRef);
  return snapshot.exists() ? snapshot.val() : null;
};
//listener for friends change = if somebody hits 💜 on you
export const listenToUserFriends = (userID, setUsers, setMyData) => {
  const database = getDatabase();
  const userRef = ref(database, `users/${userID}`);
  
  // Set up a listener to update the state whenever the friends list changes
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
  const database = getDatabase();
  const chatroomRef = push(ref(database, 'chatrooms'), {
    firstUser: myUserID,
    secondUser: otherUserID,
    messages: [],
  });
  return chatroomRef.key; // Return the newly generated chatroom ID
};

// Add a user to a friend's list (appending user to their `friends` field)
export const addToFriendsList = async (userID, newFriend, database) => {
  const userRef = ref(database, `users/${userID}`);
  const userSnapshot = await get(userRef);
  const user = userSnapshot.val();

  const updatedFriends = [...(user.friends || []), newFriend];
  await update(userRef, { friends: updatedFriends });
};

// Main function to add a friend
export const onAddFriend = async (myData, id) => {
  try {
    const database = getDatabase();
    const user = await findUser(id);
  
    if (!user || user.userID === myData.userID) {
      return; // Don't add yourself or non-existing users
    }

    // Check if the user is already in the friends list
    if (isFriend(myData.friends, user.userID)) {
      return; // Don't allow adding the same friend again
    }

    // Create a new chatroom between users
    const newChatroomId = await createChatroom(myData.userID, user.userID);

    // Prepare friend objects
    const newFriend = {
      userID: user.userID,
      avatar: user.avatar,
      chatroomId: newChatroomId,
    };
    const myFriend = {
      userID: myData.userID,
      avatar: myData.avatar,
      chatroomId: newChatroomId,
    };

    // Add each user to the other’s friend list
    await addToFriendsList(user.userID, myFriend, database);
    await addToFriendsList(myData.userID, newFriend, database);

  } catch (error) {
    console.error('Error adding friend:', error);
  }
};
