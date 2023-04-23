import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DistributionEntityInterface } from "../../../entities/Distribution";

interface DistributionState {
  data: DistributionEntityInterface;
  distributions: DistributionEntityInterface[];
  isLoading: boolean;
}

const initialState: DistributionState = {
  data: {
    _id: "",
    humanId: {
      _id: "",
      surname: "",
      name: "",
      patronymic: "",
      phone: "",
      ipn: "",
      dateOfBirthday: "",

      address: {
        _id: "",
        name: "",
        buildingId: {
          _id: "",
          name: "",
          streetId: {
            _id: "",
            name: "",
            cityId: { _id: "", name: "", regionId: { _id: "", name: "" } },
          },
        },
      },
      actualAddress: {
        _id: "",
        name: "",
        buildingId: {
          _id: "",
          name: "",
          streetId: {
            _id: "",
            name: "",
            cityId: { _id: "", name: "", regionId: { _id: "", name: "" } },
          },
        },
      },
      passportId: "",
      comment: "",
      blocked: false,
      createdAt: "",
      updatedAt: "",
    },
    giftId: {
      _id: "",
      name: "",
      description: "",
      period: 0,
      measurement: "",
      centerId: "",
    },
    amount: 0,
    comment: "",
    userId: {
      _id: "",
      surname: "",
      name: "",
      patronymic: "",
      phone: "",
      email: "",
      isBlocked: false,
      centerId: {
        _id: "",
        name: "",
        address: "",
        phone: "",
        director: "",
        phoneDirector: "",
      },
      roles: [
        {
          _id: "",
          value: "",
          description: "",
        },
      ],
    },
    createdAt: "",
  },
  distributions: [],
  isLoading: false,
};

export const distributionSlice = createSlice({
  name: "distribution",
  initialState,
  reducers: {
    distributionIsLoadingAction: (
      state,
      action: PayloadAction<{ isLoading: boolean }>
    ) => {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    },

    distributionUpdateAction: (
      state,
      action: PayloadAction<DistributionEntityInterface>
    ) => {
      const distribution = action.payload;

      return {
        ...state,
        data: {
          _id: distribution._id,
          humanId: distribution.humanId,
          giftId: distribution.giftId,
          amount: distribution.amount,
          comment: distribution.comment,
          userId: distribution.userId,
          createdAt: distribution.createdAt,
        },
      };
    },

    distributionsUpdateAction: (
      state,
      action: PayloadAction<DistributionEntityInterface[]>
    ) => {
      const distributions = action.payload;

      return {
        ...state,
        distributions: distributions,
      };
    },
  },
});

export const {
  distributionIsLoadingAction,
  distributionUpdateAction,
  distributionsUpdateAction,
} = distributionSlice.actions;

export default distributionSlice.reducer;
