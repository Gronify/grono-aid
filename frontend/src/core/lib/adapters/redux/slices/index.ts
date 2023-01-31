import userReducer, {
  userSignInAction,
  userSingOutAction,
  userIsLoadingAction,
  userUpdateAction,
} from "./user";

import humanReducer, { humanIsLoadingAction, humanUpdateAction } from "./human";

import regionReducer, {
  regionIsLoadingAction,
  regionUpdateAction,
  regionsUpdateAction,
} from "./region";

import cityReducer, {
  cityIsLoadingAction,
  cityUpdateAction,
  citiesUpdateAction,
} from "./city";

import streetReducer, {
  streetIsLoadingAction,
  streetUpdateAction,
  streetsUpdateAction,
} from "./street";

import buildingReducer, {
  buildingIsLoadingAction,
  buildingUpdateAction,
  buildingsUpdateAction,
} from "./building";

import flatReducer, {
  flatIsLoadingAction,
  flatUpdateAction,
  flatsUpdateAction,
} from "./flat";

import centerReducer, {
  centerIsLoadingAction,
  centerUpdateAction,
  centersUpdateAction,
} from "./center";

export {
  userReducer,
  userSignInAction,
  userSingOutAction,
  userIsLoadingAction,
  userUpdateAction,
  humanReducer,
  humanIsLoadingAction,
  humanUpdateAction,
  regionReducer,
  regionIsLoadingAction,
  regionUpdateAction,
  regionsUpdateAction,
  cityReducer,
  cityIsLoadingAction,
  cityUpdateAction,
  citiesUpdateAction,
  streetReducer,
  streetIsLoadingAction,
  streetUpdateAction,
  streetsUpdateAction,
  buildingReducer,
  buildingIsLoadingAction,
  buildingUpdateAction,
  buildingsUpdateAction,
  flatReducer,
  flatIsLoadingAction,
  flatUpdateAction,
  flatsUpdateAction,
  centerReducer,
  centerIsLoadingAction,
  centerUpdateAction,
  centersUpdateAction,
};
