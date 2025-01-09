import { ref, get, set, update} from 'firebase/database';
import { realtimeDB } from '../config/firebase'
import { createChatroom, addToFriendsList } from './chatHelpers'; 
import { fetchUserAvatar } from './user';
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
          return true;
        }
        return false;
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

// Helper function to check if orientation and sex are compatible
const isOrientationCompatible = (currentUser, potentialMatch) => {
  // Check current user's orientation against potential match's sex
  if (currentUser.orientation === "Heterosexual") {
    if ((currentUser.sex === "Male" && potentialMatch.sex !== "Female") || 
        (currentUser.sex === "Female" && potentialMatch.sex !== "Male")) {
      return false;
    }
  } else if (currentUser.orientation === "Homosexual") {
    if (currentUser.sex !== potentialMatch.sex) {
      return false;
    }
  }

  // Check potential match's orientation against current user's sex
  if (potentialMatch.orientation === "Heterosexual") {
    if ((potentialMatch.sex === "Male" && currentUser.sex !== "Female") || 
        (potentialMatch.sex === "Female" && currentUser.sex !== "Male")) {
      return false;
    }
  } else if (potentialMatch.orientation === "Homosexual") {
    if (potentialMatch.sex !== currentUser.sex) {
      return false;
    }
  }

  return true;
};

// Main function to get potential matches
export const getPotentialMatches = async (currentUserId) => {
  try {
    // Fetch current user data
    const currentUserRef = ref(realtimeDB, `users/${currentUserId}`);
    const currentUserSnapshot = await get(currentUserRef);
  
    if (!currentUserSnapshot.exists()) {
      console.error("Current user not found");
      return [];
    }
  
    const currentUserData = currentUserSnapshot.val();
    const { ageCategory = {}, orientation = "", sex = "" } = currentUserData;
  
    // Fetch swipes data
    const swipesRef = ref(realtimeDB, `swipes/${currentUserId}`);
    const swipesSnapshot = await get(swipesRef);
    const swipesData = swipesSnapshot.exists() ? swipesSnapshot.val() : {};
  
    // Arrays to track swipes
    const swipedRightUsers = Object.entries(swipesData)
      .filter(([_, swipe]) => swipe.swipeType === "right")
      .map(([userId]) => userId);
  
    const swipedLeftUsers = Object.entries(swipesData)
      .filter(([_, swipe]) => swipe.swipeType === "left")
      .map(([userId]) => userId);
  
    console.log("Swiped right: \n\t", swipedRightUsers);
    console.log("Swiped left: \n\t", swipedLeftUsers);
  
    // Fetch all users data
    const usersRef = ref(realtimeDB, "users");
    const usersSnapshot = await get(usersRef);
  
    if (!usersSnapshot.exists()) {
      console.error("No users found");
      return [];
    }
  
    const potentialMatches = [];
  
    usersSnapshot.forEach((childSnapshot) => {
      const potentialMatch = childSnapshot.val();
      const userId = childSnapshot.key;
  
      // Skip the current user
      if (userId === currentUserId) return;
  
      // Ensure user is in the same age category
      if (potentialMatch.ageCategory?.from !== ageCategory.from) return;
  
      // If user swiped left on the current user, ignore them as a potential match
      if (swipedLeftUsers.includes(userId)) return;
  
      // Check orientation and sex compatibility
      if (!isOrientationCompatible(currentUserData, potentialMatch)) return;
  
      // Prepare match data
      const matchData = {
        id: Date.now(),
        userId,  // Include the userId as it's the key of the user node
        name: potentialMatch.name || "Unknown",  // Include the username or a default if missing
        autobio: potentialMatch.autobio || "", // Include autoBio (or empty string if not present)
      };
  
      // If user swiped right on the current user, consider them as a potential match
      if (swipedRightUsers.includes(userId)) {
        potentialMatches.unshift(matchData); // Add to the front if swiped right
      } else {
        potentialMatches.push(matchData); // Add to the end if not swiped right
      }
    });
    const updatedMatches = await Promise.all(
      potentialMatches.map(async (user) => ({
        ...user,
        image: await fetchUserAvatar(user.userId) || "",
      }))
    );

    return updatedMatches;
  } catch (error) {
    console.error("Error fetching potential matches:", error);
    return [];
  }
};


  export const getSimplifiedMatches = async (currentUserId) => {
    try {
      const potentialMatches = await getPotentialMatches(currentUserId);
  
      const simplifiedMatches = potentialMatches.map((user, index) => {
        console.log(user.name);
        return {
          id: index + 1, 
          name: user.username, 
          image: user.image,
          // id_user: user.userId,
        };
      });
  
      return simplifiedMatches;
    } catch (error) {
      console.error("Error simplifying matches:", error);
      return [];
    }
  };