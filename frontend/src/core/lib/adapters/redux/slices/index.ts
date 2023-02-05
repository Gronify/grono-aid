import userReducer, {
  userSignInAction,
  userSingOutAction,
  userIsLoadingAction,
  userUpdateAction,
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

import humanReducer, { humanIsLoadingAction, humanUpdateAction } from "./human";

export {
  userReducer,
  userSignInAction,
  userSingOutAction,
  userIsLoadingAction,
  userUpdateAction,
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
};
