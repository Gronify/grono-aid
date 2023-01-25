import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { humanReducer, regionReducer, userReducer } from "../adapters";
import human from "../adapters/redux/slices/human";
const rootReducer = combineReducers({
  user: userReducer,
  human: humanReducer,
  region: regionReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
