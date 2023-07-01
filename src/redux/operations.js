import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateUserInfo,
} from "firebase/auth";
import { setAvatarStorage, setPostImageStorage } from "../firebase/storage";
import {
  signupUser,
  getUserData,
  updateDBUser,
  createPost,
  addComment,
  getPosts,
  deletePost,
  setLike,
} from "../firebase/firestore";
import Toast from "react-native-toast-message";
import { authErrors } from "../../errorFirebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function uploadAvatar(uri, id) {
  try {
    const response = await fetch(uri);
    const file = await response.blob();
    const url = await setAvatarStorage(file, id);
    return url;
  } catch (error) {
    console.log("ERROR-Avatar", error);
  }
  return null;
}

async function uploadPostImage(uri, id) {
  try {
    const response = await fetch(uri);
    const file = await response.blob();
    const url = await setPostImageStorage({ file, id });
    return url;
  } catch (error) {
    console.log("ERROR-Post", error);
  }
  return null;
}

export const createUser = createAsyncThunk(
  "user/createUser",
  async ({ login, email, password, uri }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const id = userCredential.user.uid;
      const url = await uploadAvatar(uri, id);
      await signupUser({ login, email, id, url });
      return {
        login,
        email,
        url,
        id,
      };
    } catch (error) {
      const errorCodeMatch = /(?<=\()(.*?)(?=\))/.exec(error.message);
      const errorCode = errorCodeMatch ? errorCodeMatch[0] : error.message;
      const errorMessage = authErrors[errorCode] || error.message;
      Toast.show({
        type: "error",
        text1: errorMessage,
      });
      return rejectWithValue(errorMessage);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userLogin = await signInWithEmailAndPassword(auth, email, password);
      const uid = userLogin.user.uid;
      const data = await getUserData(uid);
      return { ...data, uid };
    } catch (error) {
      const errorCodeMatch = /(?<=\()(.*?)(?=\))/.exec(error.message);
      const errorCode = errorCodeMatch ? errorCodeMatch[0] : error.message;
      const errorMessage = authErrors[errorCode] || error.message;
      Toast.show({
        type: "error",
        text1: errorMessage,
      });
      return rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (data, { rejectWithValue }) => {
    try {
      await signOut(auth);
      await AsyncStorage.clear();
      return "logout";
    } catch (error) {
      const errorCodeMatch = /(?<=\()(.*?)(?=\))/.exec(error.message);
      const errorCode = errorCodeMatch ? errorCodeMatch[0] : error.message;
      const errorMessage = authErrors[errorCode] || error.message;
      Toast.show({
        type: "error",
        text1: errorMessage,
      });
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ uid, selectedImage, login, email }, { rejectWithValue }) => {
    try {
      let url = "";
      if (selectedImage) {
        const url = await uploadPostImage(selectedImage, uid);
      }
      await updateDBUser({ url, uid });
      return {
        url,
        uid,
        login,
        email,
      };
    } catch (error) {
      const errorCodeMatch = /(?<=\()(.*?)(?=\))/.exec(error.message);
      const errorCode = errorCodeMatch ? errorCodeMatch[0] : error.message;
      const errorMessage = authErrors[errorCode] || error.message;
      Toast.show({
        type: "error",
        text1: errorMessage,
      });
      return rejectWithValue(errorMessage);
    }
  }
);

export const addPost = createAsyncThunk(
  "user/addPost",
  async ({ uri, name, location, geoLocation, email }, { rejectWithValue }) => {
    try {
      const id = Date.now().toString();
      const url = await uploadPostImage(uri, id);
      await createPost({ id, url, name, location, geoLocation, email });
      return { id, url, name, location, geoLocation, email };
    } catch (error) {
      const errorCodeMatch = /(?<=\()(.*?)(?=\))/.exec(error.message);
      const errorCode = errorCodeMatch ? errorCodeMatch[0] : error.message;
      const errorMessage = authErrors[errorCode] || error.message;
      Toast.show({
        type: "error",
        text1: errorMessage,
      });
      return rejectWithValue(errorMessage);
    }
  }
);

export const getPostsData = createAsyncThunk(
  "user/getPostsData",
  async (data, { rejectWithValue }) => {
    try {
      const posts = await getPosts();
      return posts;
    } catch (error) {
      const errorCodeMatch = /(?<=\()(.*?)(?=\))/.exec(error.message);
      const errorCode = errorCodeMatch ? errorCodeMatch[0] : error.message;
      const errorMessage = authErrors[errorCode] || error.message;
      Toast.show({
        type: "error",
        text1: errorMessage,
      });
      return rejectWithValue(errorMessage);
    }
  }
);

export const delPost = createAsyncThunk(
  "user/delPost",
  async (id, { rejectWithValue }) => {
    try {
      await deletePost(id);
      return id;
    } catch (error) {
      const errorCodeMatch = /(?<=\()(.*?)(?=\))/.exec(error.message);
      const errorCode = errorCodeMatch ? errorCodeMatch[0] : error.message;
      const errorMessage = authErrors[errorCode] || error.message;
      Toast.show({
        type: "error",
        text1: errorMessage,
      });
      return rejectWithValue(errorMessage);
    }
  }
);

export const createComment = createAsyncThunk(
  "user/addComment",
  async ({ comment, postId }, { rejectWithValue }) => {
    try {
      await addComment({ comment, postId });
      return { comment, postId };
    } catch (error) {
      const errorCodeMatch = /(?<=\()(.*?)(?=\))/.exec(error.message);
      const errorCode = errorCodeMatch ? errorCodeMatch[0] : error.message;
      const errorMessage = authErrors[errorCode] || error.message;
      Toast.show({
        type: "error",
        text1: errorMessage,
      });
      return rejectWithValue(errorMessage);
    }
  }
);

export const addLike = createAsyncThunk(
  "user/addLike",
  async ({ postId, email }, { rejectWithValue }) => {
    try {
      await setLike({ postId, email });
      return { postId, email };
    } catch (error) {
      const errorCodeMatch = /(?<=\()(.*?)(?=\))/.exec(error.message);
      const errorCode = errorCodeMatch ? errorCodeMatch[0] : error.message;
      const errorMessage = authErrors[errorCode] || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
