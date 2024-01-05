import { configureStore } from "@reduxjs/toolkit";
import isSignInReduxer from "../components/modals/SignInRedux";

export const store = configureStore({
  reducer: {
    completed: isSignInReduxer,
  },
});

// 안쓰는 코드
