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
      const currentUserRef = ref(realtimeDB, `users/${currentUserId}`);
      const currentUserSnapshot = await get(currentUserRef);
  
      if (!currentUserSnapshot.exists()) {
        console.error("Current user not found");
        return [];
      }
  
      const curUserData = currentUserSnapshot.val();
      if (!curUserData || typeof curUserData !== "object") {
        console.error("Current user data is invalid");
        return [];
      }
  
      const hostData = {
        ageCategory: curUserData.ageCategory || {},
        orientation: curUserData.orientation || "",
        sex: curUserData.sex || "",
      };
  
      const swipesRef = ref(realtimeDB, `swipes/${currentUserId}`);
      const swipesSnapshot = await get(swipesRef);
      const swipedUsersIds = [];
      const swipeData = swipesSnapshot.val();
  
      if (swipeData) {
        for (const [swipedUserId, swipe] of Object.entries(swipeData)) {
          if (swipe.swipeType === "right") {
            swipedUsersIds.push(swipedUserId);
          }
        }
      }

      const usersRef = ref(realtimeDB, "users");
      const usersSnapshot = await get(usersRef);
  
      if (!usersSnapshot.exists()) {
        console.error("No users found");
        return [];
      }
  
      const potentialMatches = [];
      usersSnapshot.forEach((childSnapshot) => {
        const userData = childSnapshot.val();
        const userId = childSnapshot.key;
  
        if (!userData || typeof userData !== "object") return;
  
        const isUserSwipedRight = swipedUsersIds.includes(userId);
        if (userId === currentUserId) return; 
        if (userData.ageCategory.from !== hostData.ageCategory.from) return;
  
        if (isUserSwipedRight) {
          potentialMatches.unshift(userData);
        } else {
          potentialMatches.push(userData);
        }
      });
  
      return potentialMatches;
    } catch (error) {
      console.error("Error fetching potential matches:", error);
      return [];
    }
  };
  

  export const getSimplifiedMatches = async (currentUserId) => {
    try {
      const potentialMatches = await getPotentialMatches(currentUserId);
  
      const simplifiedMatches = potentialMatches.map((user, index) => {
        return {
          id: index + 1, 
          name: user.name, 
          image: Array.isArray(user.photos) ? user.photos[0] : user.photos,
          //id_user: user.userId,
        };
      });
  
      console.log("Simplified matches:", simplifiedMatches);
      return simplifiedMatches;
    } catch (error) {
      console.error("Error simplifying matches:", error);
      return [];
    }
  };