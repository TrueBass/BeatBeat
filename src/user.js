import { ref, get, update, set } from 'firebase/database';
import * as FileSystem from 'expo-file-system';
//import { Asset } from 'expo-asset';
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
        username: snapshot.val().username,
        ageCategory: snapshot.val().ageCategory,
        motivation: snapshot.val().motivation,
        orientation: snapshot.val().orientation,
        sex: snapshot.val().sex,
        description: snapshot.val().description,
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

export const updateUserProfile = async (userId, profileData) => {
  try {
    const userRef = ref(realtimeDB, 'users/' + userId);

    // Update the user's profile information
    await update(userRef, {
      ageCategory: profileData.ageCategory,
      motivation: profileData.motivation,
      orientation: profileData.orientation,
      sex: profileData.sex,
      description: profileData.description,
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

export async function addUserToRtdb(user){
  /**
   * Temporary made this function in this file
   * we need to take it in the right file and use on the end of the singUp screen chain
   * because there is "users/"+auth.uuid in the ref() func.
   */
  const userRef = ref(realtimeDB,'users/'+auth.currentUser.uid);

  set(userRef, {...user}).then(() => {
    console.log("New data added successfully");
  }).catch((error) => {
    console.error("Error adding new data: ", error);
  });
}
 /**
 * Upload image to Firebase Realtime Database under the user's photos.
 * Ensures the user has no more than 4 photos.
 * @param {string} base64Image - The Base64 encoded image string.
 * @param {string} userId - The unique ID of the user.
 */
/*
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
    await update(userRef, { photos: currentPhotos });

    console.log('Image uploaded successfully');
  } catch (error) {
    console.error('Error uploading image:', error);
    console.log('Failed to upload image');
  }
};

export const decodeBase64ToFile = async (base64String, fileName) => {
  try {
    // Step 1: Define the file path where you want to save the image
    const fileUri = FileSystem.documentDirectory + fileName;

    // Step 2: Write the Base64 string to a file as binary (do not encode it as Base64)
    await FileSystem.writeAsStringAsync(fileUri, base64String, {
      encoding: FileSystem.EncodingType.Base64, // Correct: treats the string as Base64 data
    });

    console.log('File saved to:', fileUri);

    // Step 3: Return the file URI (you can use this URI to display the image or for other operations)
    return fileUri;
  } catch (error) {
    console.error('Error saving the Base64 image:', error);
    throw error;  // You can handle this error as needed in your app
  }
};

export const convertImageToBase64 = async (imagePath) => {
  try {
    const base64String = await FileSystem.readAsStringAsync(imagePath, {
      encoding: FileSystem.EncodingType.Base64,
    });
    
    return base64String;
  } catch (error) {
    console.error('Error converting image to Base64:', error);
    throw error;
  }
};

// export const localConvertBase64 = async (imagePath) => {
//   try {
//     const asset = Asset.fromModule(imagePath);
//     await asset.downloadAsync();
//     const localUri = asset.uri; // This will point to the image in the local cache
//     // Now, read the image from the local URI
//     const base64String = await FileSystem.readAsStringAsync(localUri, {
//       encoding: FileSystem.EncodingType.Base64,
//     });

//     return base64String;
//   } catch (error) {
//     console.error('Error converting image to Base64:', error);
//     throw error;
//   }
// };
// Function to copy image to Cache Directory
export const saveImageToCache = async (sourceUri) => {
  try {
    const cacheDirectory = FileSystem.cacheDirectory;
    const cacheImagePath = cacheDirectory + 'picked-image.jpg';

    const fileInfo = await FileSystem.getInfoAsync(cacheImagePath);

    if (!fileInfo.exists) {
      // If the image is not already in cache, copy it there
      await FileSystem.copyAsync({
        from: sourceUri, // The picked image URI
        to: cacheImagePath, // The path in the cache directory
      });
      console.log('Image copied to cache at:', cacheImagePath);
    } else {
      console.log('Image already exists in cache.');
    }

    return cacheImagePath; // Return the cache path of the image
  } catch (error) {
    console.error('Error saving image to cache:', error);
    setErrorMessage('Error saving image to cache');
    return null;
  }
};
*/