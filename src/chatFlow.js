// useUser.js
import { useState, useEffect } from 'react';
import { findUser, listenToUserFriends, isFriend, createChatroom, addToFriendsList } from './chatHelpers';

export const useUser = (userID) => {
  const [userData, setUserData] = useState(null);
  const [friends, setFriends] = useState([]);
  console.log('\t Login called with userID:', userID);
  // Login and fetch user data
  useEffect(() => {
    if (userID) {
      const fetchUser = async () => {
        const user = await findUser(userID);
        if (user) {
          setUserData(user);
        }
      };

      fetchUser();
    }
  }, [userID]);

  // Set up listener to get friends list in real-time
  useEffect(() => {
    if (userID) {
      listenToUserFriends(userID, setFriends, setUserData);
    }
  }, [userID]);

  return { userData, friends };
};
export const onAddFriend = async (userID, secondId) => {
    const [userData, setUserData] = useState(null);
    const [friends, setFriends] = useState([]);
    console.log('\t Login called with userID:', userID);
    if (secondId === userID) {
        return; // Don't add yourself or non-existing users
      }
    //fetch user data
    useEffect(() => {
      if (userID) {
        const fetchUser = async () => {
          const tempUser = await findUser(userID);
          if (tempUser) {
            setUserData(tempUser);
          }
        };  
        fetchUser();
      }
    }, [userID]);
    try {
      const secondUser = await findUser(secondId);
      // Check if the user is already in the friends list
      if (isFriend(userData.friends, secondId)) {
        return; // Don't allow adding the same friend again
      }
  
      // Create a new chatroom between users
      const newChatroomId = await createChatroom(userID, secondId);
  
      // Prepare friend objects
      const secondFriend = {
        username: secondUser.username,
        avatar: secondUser.avatar,
        chatroomId: newChatroomId,
      };
      const firstFriend = {
        username: userData.username,
        avatar: userData.avatar,
        chatroomId: newChatroomId,
      };
  
      // Add each user to the other’s friend list
      await addToFriendsList(secondId, userID, firstFriend);
      await addToFriendsList(userID, secondId, secondFriend);
  
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };
  