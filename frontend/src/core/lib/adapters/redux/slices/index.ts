import userReducer, {
  userSignInAction,
  userSingOutAction,
  userIsLoadingAction,
  userUpdateAction,
  usersUpdateAction,
} from "./user";

import humanSearchReducer, {
  humanSearchIsLoadingAction,
  humanSearchUpdateAction,
  humansSearchUpdateAction,
} from "./humanSearch";

import regionReducer, {
  addressRegionIsLoadingAction,
  actualAddressRegionIsLoadingAction,
  addressRegionUpdateAction,
  actualAddressRegionUpdateAction,
  addressRegionsUpdateAction,
  actualAddressRegionsUpdateAction,
} from "./region";

import cityReducer, {
  addressCityIsLoadingAction,
  actualAddressCityIsLoadingAction,
  addressCityUpdateAction,
  addressCitiesUpdateAction,
  actualAddressCityUpdateAction,
  actualAddressCitiesUpdateAction,
} from "./city";

import streetReducer, {
  addressStreetIsLoadingAction,
  actualAddressStreetIsLoadingAction,
  addressStreetUpdateAction,
  addressStreetsUpdateAction,
  actualAddressStreetUpdateAction,
  actualAddressStreetsUpdateAction,
} from "./street";

import buildingReducer, {
  addressBuildingIsLoadingAction,
  actualAddressBuildingIsLoadingAction,
  addressBuildingUpdateAction,
  addressBuildingsUpdateAction,
  actualAddressBuildingUpdateAction,
  actualAddressBuildingsUpdateAction,
} from "./building";

import flatReducer, {
  addressFlatIsLoadingAction,
  actualAddressFlatIsLoadingAction,
  addressFlatUpdateAction,
  addressFlatsUpdateAction,
  actualAddressFlatUpdateAction,
  actualAddressFlatsUpdateAction,
} from "./flat";

import centerReducer, {
  centerIsLoadingAction,
  centerUpdateAction,
  centersUpdateAction,
} from "./center";

import giftReducer, {
  giftIsLoadingAction,
  giftUpdateAction,
  giftsUpdateAction,
} from "./gift";

import distributionReducer, {
  distributionIsLoadingAction,
  distributionUpdateAction,
  distributionsUpdateAction,
} from "./distribution";

import humanReducer, { humanIsLoadingAction, humanUpdateAction } from "./human";

import userShortStatReducer, {
  userShortStatSliceIsLoadingAction,
  userShortStatUpdateAction,
} from "./userShortStat";

import statisticCentersReducer, {
  statisticCenterIsLoadingAction,
  statisticCenterUpdateAction,
} from "./statisticCenters";

import statisticCentersEveryDayReducer, {
  statisticCenterEveryDayIsLoadingAction,
  statisticCenterEveryDayUpdateAction,
} from "./statisticCentersEveryDay";

export {
  userReducer,
  userSignInAction,
  userSingOutAction,
  userIsLoadingAction,
  userUpdateAction,
  usersUpdateAction,
  humanSearchReducer,
  humanSearchIsLoadingAction,
  humanSearchUpdateAction,
  humansSearchUpdateAction,
  humanReducer,
  humanIsLoadingAction,
  humanUpdateAction,
  regionReducer,
  addressRegionIsLoadingAction,
  actualAddressRegionIsLoadingAction,
  addressRegionUpdateAction,
  actualAddressRegionUpdateAction,
  addressRegionsUpdateAction,
  actualAddressRegionsUpdateAction,
  cityReducer,
  addressCityIsLoadingAction,
  actualAddressCityIsLoadingAction,
  addressCityUpdateAction,
  addressCitiesUpdateAction,
  actualAddressCityUpdateAction,
  actualAddressCitiesUpdateAction,
  streetReducer,
  addressStreetIsLoadingAction,
  actualAddressStreetIsLoadingAction,
  addressStreetUpdateAction,
  addressStreetsUpdateAction,
  actualAddressStreetUpdateAction,
  actualAddressStreetsUpdateAction,
  buildingReducer,
  addressBuildingIsLoadingAction,
  actualAddressBuildingIsLoadingAction,
  addressBuildingUpdateAction,
  addressBuildingsUpdateAction,
  actualAddressBuildingUpdateAction,
  actualAddressBuildingsUpdateAction,
  flatReducer,
  addressFlatIsLoadingAction,
  actualAddressFlatIsLoadingAction,
  addressFlatUpdateAction,
  addressFlatsUpdateAction,
  actualAddressFlatUpdateAction,
  actualAddressFlatsUpdateAction,
  centerReducer,
  centerIsLoadingAction,
  centerUpdateAction,
  centersUpdateAction,
  distributionReducer,
  distributionIsLoadingAction,
  distributionUpdateAction,
  distributionsUpdateAction,
  giftReducer,
  giftIsLoadingAction,
  giftUpdateAction,
  giftsUpdateAction,
  userShortStatReducer,
  userShortStatSliceIsLoadingAction,
  userShortStatUpdateAction,
  statisticCentersReducer,
  statisticCenterIsLoadingAction,
  statisticCenterUpdateAction,
  statisticCentersEveryDayReducer,
  statisticCenterEveryDayIsLoadingAction,
  statisticCenterEveryDayUpdateAction,
};
