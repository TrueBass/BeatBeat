import { ref, get, set, update } from 'firebase/database';
import { realtimeDB } from '../config/firebase'
import { createChatroom, addToFriendsList } from './chatHelpers'; 
export const checkForMatch = async (currentUserId, targetUserId) => {
    try {
      const targetSwipeRef = ref(realtimeDB, `/swipes/${targetUserId}/${currentUserId}`);
      const snapshot = await get(targetSwipeRef);
  
      if (snapshot.exists()) {
        const targetSwipe = snapshot.val();
        if (targetSwipe.swipeType === 'right') {
          // Both users have swiped right on each other, create a match
          const chatKey = await createChatroom(currentUserId, targetUserId);
          await addToFriendsList(currentUserId, targetUserId, chatKey);
        }
      }
    } catch (error) {
      console.error("Error checking for match: ", error);
    }
  };
export const onSwipeRight = async (currentUserId, targetUserId) => {
    try {
      const swipeRef = ref(realtimeDB, `/swipes/${currentUserId}/${targetUserId}`);
      await update(swipeRef, {
        swipeType: 'right',
      });
      await checkForMatch(currentUserId, targetUserId);
    } catch (error) {
      console.error("Error handling swipe right: ", error);
    }
  };
