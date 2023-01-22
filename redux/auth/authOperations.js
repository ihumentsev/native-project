import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import appFirebase from "../../firebase/firebaseConfig";
import { authSlice } from "./authReducer";
const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const signUpUser =
  ({ email, password, login, avatarImage }) =>
  async (dispatch, getState) => {
    try {
      const auth = getAuth(appFirebase);
      await createUserWithEmailAndPassword(auth, email, password);
      onAuthStateChanged(auth, (user) => console.log("user--->>>", user));

      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: avatarImage,
      });

      const { displayName, uid, photoURL } = await auth.currentUser;
      console.log("user", displayName, uid, photoURL, email);

      const userUpdateProfile = {
        login: displayName,
        userId: uid,
        imageAvatar: photoURL,
        email: email,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

export const signInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const auth = getAuth(appFirebase);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch(updateUserProfile({ userId: user.uid }));
      console.log("user", user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

export const signOutUser = () => async (dispatch, getState) => {
  const auth = getAuth(appFirebase);
  signOut(auth);
  dispatch(authSignOut());
};

export const authStateCahngeUser = () => async (dispatch, getState) => {
  const auth = getAuth(appFirebase);
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        login: user.displayName,
        userId: user.uid,
        imageAvatar: user.photoURL,
        email: user.email,
      };
      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};
