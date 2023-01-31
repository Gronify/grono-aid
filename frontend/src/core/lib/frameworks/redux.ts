import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  buildingReducer,
  centerReducer,
  cityReducer,
  flatReducer,
  humanReducer,
  regionReducer,
  streetReducer,
  userReducer,
} from "../adapters";

const rootReducer = combineReducers({
  user: userReducer,
  human: humanReducer,
  region: regionReducer,
  city: cityReducer,
  street: streetReducer,
  building: buildingReducer,
  flat: flatReducer,
  center: centerReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
