import User from "<@>/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import exp from "constants";

const initialState: User = {
  data: {
    id: 0,
    name: "",
    email: "hello@gmail.com",
    phoneNumber: "jjjj",
    telegramHandle: "",
    country: "Ethiopia",
    shortBio: "",
    profilePicture: "",
    university: "",
    department: "",
    yearOfGraduation: "",
    leetcodeUsername: "",
    githubUsername: "",
    codeforcesUsername: "",
    hackerrankUsername: "",
    linkedinUrl: "",
    cv: null,
    programmingLanguage: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
