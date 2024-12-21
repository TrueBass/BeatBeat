import { ref, get, update, set } from 'firebase/database';
import * as FileSystem from 'expo-file-system';
import { realtimeDB, auth } from '../config/firebase'

export const getUserCard = async (userId) => {
  try {
    const userRef = ref(realtimeDB, 'users/' + userId);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      // Extract the user data from the snapshot
      const userData = snapshot.val();
      return {
        username: userData.username,
        ageCategory: userData.ageCategory,
        relationship: userData.relationship,
        orientation: userData.orientation,
        sex: userData.sex,
        autobio: userData.autobio,
        images: userData.images,
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
  const userRef = ref(realtimeDB, `images/${uid}/`);
  const avatar = await get(realtimeDB, userRef);
  if(avatar.exists()){
    return avatar.val()[0];
  } else {
    return undefined;
  }
}
export const fetchImages = async (uid)=>{
  const userRef = ref(realtimeDB, `images/${uid}/`);
  const avatar = await get(realtimeDB, userRef);
  if(avatar.exists()){
    return avatar.val();
  } else {
    return undefined;
  }
}
export const updateProfileData = async (userId, profileData) => {
  try {
    const userRef = ref(realtimeDB, 'users/' + userId);
    console.log("userId:", userId);  // Ensure userId is not undefined
    await update(userRef, {...profileData
    });
    console.log('User profile updated successfully!');
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};
export const deleteUser = async (userId) => {
  try {
    const imagesRef = ref(realtimeDB, `images/${userId}`);

    // Step 2: Fetch all images associated with the user to delete them
    const snapshot = await get(imagesRef);

    if (snapshot.exists()) {
      // Get all image keys (image IDs)
      const imageIds = Object.keys(snapshot.val());

      // Step 3: Delete all images associated with the user
      const imageDeletePromises = imageIds.map(imageId => {
        const imageRef = ref(realtimeDB, `images/${userId}/${imageId}`);
        return remove(imageRef);
      });

      // Wait for all image deletion operations to complete
      await Promise.all(imageDeletePromises);
    }
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
    set(ref(realtimeDB, "images/"+auth.currentUser.uid+`/${i}`), img).then(() => {
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
}

export async function encodeToBase64(fileUri){
  const base64String = await FileSystem.readAsStringAsync(fileUri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return base64String;
}
