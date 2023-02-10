import React, { useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/lib/frameworks/redux';
import { giftUpdateAction, humanUpdateAction } from '../../core/lib/adapters';
import { useAxios } from '../../hooks';
import GiftService from '../../core/lib/services/GiftService';


type Props = {

  isLoading: boolean;
}

const GiftSchema = Yup.object().shape({
  login: Yup.string()
    .required("Логін це обов'язкове поле вводу"),
  password: Yup.string()
    .required("Пароль це обов'язкове поле вводу"),
});

// name: string;
// address: string;
// phone: string;
// director: string;
// phoneDirector: string;

const GiftManager = () => {
  const gift = useSelector((state: RootState) => state.gift.data)
  const gifts = useSelector((state: RootState) => state.gift.gifts)
  const giftIsLoading = useSelector((state: RootState) => state.gift.isLoading)
  const dispatch = useDispatch();
  const giftService = new GiftService(useAxios())

  useEffect(() => {
    giftService.getGifts(dispatch, giftIsLoading)
  }, [])

  const handleChange = (prop: any) => (event: any) => {
    dispatch(giftUpdateAction({ ...gift, [prop]: event.target.value }))
  };

  const handleButton = (prop: any) => {
    giftService.create(dispatch, giftIsLoading, { name: gift.name, description: gift.description, period: gift.period, measurement: gift.measurement })
  };


  return (
    <>
      <div className="shadow sm:rounded-md">
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className="grid grid-cols-6 gap-2">
            <div className="col-span-6">
              <label htmlFor="giftName" className="block text-sm font-medium text-gray-700">
                Назва подарку
              </label>
              <input
                type="text"
                name="giftName"
                id="giftName"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={handleChange("name")}
              />
            </div>

            <div className="col-span-6">
              <label htmlFor="measurement" className="block text-sm font-medium text-gray-700">
                Одиниця вимірення
              </label>
              <input
                type="text"
                name="measurement"
                id="measurement"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={handleChange("measurement")}
              />
            </div>

            <div className="col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Опис
              </label>
              <input
                type="text"
                name="description"
                id="description"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={handleChange("description")}
              />
            </div>

            <div className="col-span-6">
              <label htmlFor="period" className="block text-sm font-medium text-gray-700">
                Період
              </label>
              <input
                type="number"
                name="period"
                id="period"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={handleChange("period")}
              />
            </div>

          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
          <button

            className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleButton}
          >
            Створити
          </button>
        </div>

      </div>



    </>

  )
};

export default GiftManager;


