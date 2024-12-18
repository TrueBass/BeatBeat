import { ref, get, set, update} from 'firebase/database';
import { realtimeDB } from '../config/firebase'
import { createChatroom, addToFriendsList } from './chatHelpers'; 
export const checkForMatch = async (currentUserId, targetUserId) => {
    try {
      const targetSwipeRef = ref(realtimeDB, `/swipes/${currentUserId}/${targetUserId}`);
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
      /*
      we store who swiped right on the targetUserId. 
      meaning each collection shows a target and who liked him and who not
      such that i can easily check who voted on a user
      */
      const swipeRef = ref(realtimeDB, `/swipes/${targetUserId}/${currentUserId}`);
      await update(swipeRef, {
        swipeType: 'right',
      });
      await checkForMatch(currentUserId, targetUserId);
    } catch (error) {
      console.error("Error handling swipe right: ", error);
    }
  };
  export const onSwipeLeft = async (currentUserId, targetUserId) => {
    try {
      const swipeRef = ref(realtimeDB, `/swipes/${targetUserId}/${currentUserId}`);
      await update(swipeRef, {
        swipeType: 'left',
      });
    } catch (error) {
      console.error("Error handling swipe right: ", error);
    }
  };

  export const getPotentialMatches = async (currentUserId) => {
    try {
      // Step 1: Get the current user's profile data
      const currentUserRef = ref(realtimeDB, `users/${currentUserId}`);
      const currentUserSnapshot = await get(currentUserRef);
  
      if (!currentUserSnapshot.exists()) {
        console.error("Current user not found");
        return [];
      }
      const curUserData = currentUserSnapshot.val();
      const hostData = {
        ageCategory: curUserData.ageCategory,
        orientation: curUserData.orientation,
        sex: curUserData.sex,
      };
       // Step 2: Get users who have swiped 'right' on the current user
    const swipesRef = ref(realtimeDB, `swipes/${currentUserId}`);
    const swipesSnapshot = await get(swipesRef);
    const swipedUsersIds = [];
    const swipeData = swipesSnapshot.val();

    for (const [swipedUserId, swipe] of Object.entries(swipeData)) {
      if (swipe.swipeType === 'right') {
        swipedUsersIds.push(swipedUserId);  // Collect the user ID of those who swiped right
      }
    }
       // Step 3: Get all users from the users collection
    const usersRef = ref(realtimeDB, 'users');
    const usersSnapshot = await get(usersRef);
    let potentialMatches = [];

    usersSnapshot.forEach((childSnapshot) => {
      const userData = childSnapshot.val();
      const userId = childSnapshot.key;
      const isUserSwipedRight = swipedUsersIds.includes(userId);
      if (userId === currentUserId) return;
      // Check for orientation compatibility?
      // Check ageCategory match
      if (userData.ageCategory.from !== hostData.ageCategory.from) return;
      console.log("The users are: ", userData);
      // Add the valid user to potential matches
      if (isUserSwipedRight) {
        potentialMatches.unshift(userData);  // Place at the beginning
      } else {
        potentialMatches.push(userData);    // Add to the end
      }
    });

    return potentialMatches;
  } catch (error) {
    console.error("Error fetching potential matches:", error);
    return [];
  }
  };