import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  buildingReducer,
  centerReducer,
  cityReducer,
  flatReducer,
  humanReducer,
  humanSearchReducer,
  regionReducer,
  streetReducer,
  userReducer,
  giftReducer,
  distributionReducer,
  userShortStatReducer,
  statisticCentersReducer,
  statisticCentersEveryDayReducer,
} from "../adapters";

const rootReducer = combineReducers({
  user: userReducer,
  human: humanReducer,
  humanSearch: humanSearchReducer,
  region: regionReducer,
  city: cityReducer,
  street: streetReducer,
  building: buildingReducer,
  flat: flatReducer,
  center: centerReducer,
  gift: giftReducer,
  distribution: distributionReducer,
  userShortStat: userShortStatReducer,
  statisticCenter: statisticCentersReducer,
  statisticCenterEveryDay: statisticCentersEveryDayReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
