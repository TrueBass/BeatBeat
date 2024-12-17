import { ref, get, update, set } from 'firebase/database';
import * as FileSystem from 'expo-file-system';
import { realtimeDB, auth } from '../config/firebase'

export const getUserData = async (userId) => {
  try {
    const userRef = ref(realtimeDB, 'users/' + userId);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      // Extract the user data from the snapshot
      const userData = snapshot.val();
      const friendsWithChatroomIds = userData.friends.map((friendId) => {
        const chatroomId = userData.friends[friendId]?.chatroomId || null;
        return {
          friendId,
          chatroomId, 
        };
      });
      return {
        username: userData.username,
        friends: userData.friends,
        ageCategory: userData.ageCategory,
        motivation: userData.motivation,
        orientation: userData.orientation,
        sex: userData.sex,
        description: userData.description,
        friendsWithChatroomIds,
      };
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};
export const getUserChatrooms = async (userId) => {
  try {
    const friendsRef = ref(realtimeDB, `users/${userId}/friends`);
    const snapshot = await get(friendsRef);
    if (snapshot.exists()) {
      const friends = snapshot.val();
      const friendsWithChatroomIds = Object.keys(friends).map((friendId) => {
        // Check if the chatroomId exists for each friend
        const chatroomId = friends[friendId]?.chatroomId || null;
        
        return {
          friendId,
          chatroomId,
        };
      });

      return friendsWithChatroomIds;
    } else {
      console.log("No friends data available for user.");
      return [];
    }
  } catch (error) {
    console.error("Error getting user chatroomIds:", error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const userProfileRef = ref(realtimeDB, 'users/' + userId);
    const snapshot = await get(userProfileRef);

    if (snapshot.exists()) {
      // Return the user's profile data as an object
      return {
        username: snapshot.val().name,
        ageCategory: snapshot.val().ageCategory,
        autobio: snapshot.val().autobio,
        orientation: snapshot.val().orientation,
        sex: snapshot.val().sex,
        relationship: snapshot.val().relationship,
      };
    } else {
      console.log("No profile data available");
      return null;
    }
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

export const fetchUserAvatar = async (uid)=>{
  const userRef = ref(realtimeDB, `users/${uid}/images/`);
  const avatar = await get(realtimeDB, userRef);
  if(avatar.exists()){
    return avatar.val()[0];
  } else {
    return undefined;
  }
}

export const updateProfileData = async (userId, profileData) => {
  try {
    const userRef = ref(realtimeDB, 'users/' + userId);
    console.log("userId:", userId);  // Ensure userId is not undefined
    await update(userRef, {...profileData
      // name: profileData.name,
      // ageCategory: profileData.ageCategory,
      // autobio: profileData.autobio,
      // orientation: profileData.orientation,
      // sex: profileData.sex,
      // relationship: profileData.relationship,
    });
    console.log('User profile updated successfully!');
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};
export const deleteUserAccount = async (userId) => {
  try {
    const userRef = ref(realtimeDB, `users/${userId}`);

    await remove(userRef);
    console.log(`User with ID ${userId} has been deleted successfully.`);
  } catch (error) {
    console.error('Error deleting user account:', error);
    throw error;
  }
};

export async function addUserToRtdb(user, images){
  const userRef = ref(realtimeDB,'users/'+auth.currentUser.uid);

  try{
  await set(userRef, {...user}).then(() => {
    console.log("New data added successfully");
  }).catch((error) => {
    console.error("Error adding new data: ", error);
  });

  await Promise.all(images.map((img, i)=>{
    set(ref(realtimeDB, "users/"+auth.currentUser.uid+`/images/${i}`), img).then(() => {
      console.log(`image ${i} added successfully`);
    }).catch((error) => {
      console.error(`Error adding image ${i}: `, error);
    });
  }));

  return 200;
  }
  catch(e){
    console.log("in userToRtdb", e.message);
  }
  // for(let i = 0; i < images.length; ++i){
  //   await set(ref(realtimeDB, "users/"+auth.currentUser.uid+`/images/${i}`), images[i]).then(() => {
  //     console.log(`image ${i} added successfully`);
  //   }).catch((error) => {
  //     console.error(`Error adding image ${i}: `, error);
  //   });
  // }
}

 /**
 * Upload image to Firebase Realtime Database under the user's photos.
 * Ensures the user has no more than 4 photos.
 * @param {string} base64Image - The Base64 encoded image string.
 * @param {string} userId - The unique ID of the user.
 */
export const uploadImageToRealtimeDatabase = async (base64Image, userId) => {
  try {
    const userRef = ref(realtimeDB, `users/${userId}`);
    const snapshot = await get(userRef);

    // If the user doesn't have any photos or the photos field doesn't exist, initialize it as an empty array
    let currentPhotos = snapshot.exists() && snapshot.val().photos ? snapshot.val().photos : [];

    // If the user already has 4 photos, remove the oldest one to maintain the limit
    if (currentPhotos.length >= 4) {
      currentPhotos.shift(); // Remove the first (oldest) photo
    }

    // Add the new photo to the photos array
    currentPhotos.push(base64Image);

    // Update the user's photos array in the Realtime Database
    await update(userRef, { images: currentPhotos });

    console.log('Image uploaded successfully');
  } catch (error) {
    console.error('Error uploading image:', error);
    console.log('Failed to upload image');
  }
};

export async function encodeToBase64(fileUri){
  const base64String = await FileSystem.readAsStringAsync(fileUri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return base64String;
}
