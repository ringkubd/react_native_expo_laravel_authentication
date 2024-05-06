import { createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({email, password},{ rejectWithValue }) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    try {
      const config = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      }
      const data = await fetch(process.env.EXPO_PUBLIC_API_URL+"/token/create",{
        method: 'POST',
        body: formData,
      })
      const loginUser = await data.json()
      console.log(loginUser)
      await AsyncStorage.setItem('token', loginUser.token);
      await AsyncStorage.setItem('user', JSON.stringify(loginUser.user));
      return loginUser;
    }catch (error) {
      console.log(error)
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)