import firebase from 'firebase';
import { AsyncStorage } from 'react-native';

import Profile from '../../models/profile';

export const SET_PROFILES = 'SET_PROFILES';
export const CREATE_PROFILE = 'CREATE_PROFILE';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const UPDATE_WALKTHROUGH = 'UPDATE_WALKTHROUGH';
export const UPDATE_READNEWS = 'UPDATE_READNEWS';
export const SET_CURRENT_PROFILE = 'SET_CURRENT_PROFILE';

export function setCurrentProfile(profile) {
  return {
    type: SET_CURRENT_PROFILE,
    payload: profile,
  };
}

export function fetchProfiles() {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem('userData').then((data) =>
      data ? JSON.parse(data) : {}
    );
    const uid = userData.userId;

    try {
      console.log('Fetching profiles...');
      console.log(`Attempting to set id: ${uid} as the current user...`);

      const profilesSnapshot = await firebase.database().ref('profiles').once('value');

      if (profilesSnapshot.exists) {
        const normalizedProfileData = profilesSnapshot.val();
        const allProfiles = [];
        let userProfile = {};

        for (const key in normalizedProfileData) {
          const profile = normalizedProfileData[key];
          const newProfile = new Profile(
            key,
            profile.profileId,
            profile.profileName,
            profile.email,
            profile.expoTokens
          );

          allProfiles.push(newProfile);

          if (profile.profileId === uid) {
            console.log(
              `...successfullly set the current user as ${JSON.stringify(newProfile, null, 4)}`
            );
            userProfile = newProfile;
          }
        }

        dispatch({
          type: SET_PROFILES,
          allProfiles,
          userProfile,
        });
        console.log(`Profiles:`);
        console.log(`...${allProfiles.length} total profiles found and loaded.`);
        if (userProfile) {
          console.log(`...profile for ${userProfile.profileName} found and loaded`);
        } else {
          console.log(
            `*****************************************************PROBLEM***************************************** userProfile is not loaded. uid is: ${uid}.`
          );
        }
      }
    } catch (error) {
      console.log('Error in actions/projects/fetchProfiles: ', error);
      throw error;
    }
  };
}

export function createProfile(profileName, email = '') {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem('userData').then((data) =>
      data ? JSON.parse(data) : {}
    );
    const uid = userData.userId;

    try {
      const profileData = {
        profileId: uid, //Set profileId to be the userId of the logged in user: we get this from auth
        profileName,
        email,
      };

      console.log('Attempting to create a profile...');
      // Perform the API call - create the profile, passing the profileData object above
      const profileRef = await firebase.database().ref('profiles').push(profileData);

      console.log('...profile created:', profileRef);

      dispatch({
        type: CREATE_PROFILE,
        profileData: {
          firebaseId: profileRef.key,
          profileId: uid,
          profileName,
          email,
        },
      });
    } catch (error) {
      console.log('Error in actions/profiles/createProfile', error);
      throw error;
    }
  };
}

export function updateProfile(firebaseId, profileName, email = '') {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem('userData').then((data) =>
      data ? JSON.parse(data) : {}
    );
    const uid = userData.userId;

    try {
      console.log(`Attempting to update profile with id: ${firebaseId}...`);

      const dataToUpdate = {
        profileName,
        email,
      };

      const returnedProfileData = await firebase
        .database()
        .ref(`profiles/${firebaseId}`)
        .update(dataToUpdate);

      console.log(`...updated profile with id ${firebaseId}:`, returnedProfileData);

      dispatch({
        type: UPDATE_PROFILE,
        currUser: uid,
        fid: firebaseId,
        profileData: dataToUpdate,
      });
    } catch (error) {
      console.log('Error in actions/profiles/updateProfile: ', error);
      throw error;
    }
  };
}
