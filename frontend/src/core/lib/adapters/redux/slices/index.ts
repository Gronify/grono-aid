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
};
