import React, { useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/lib/frameworks/redux';
import { centerUpdateAction, humanUpdateAction } from '../../core/lib/adapters';
import InputMask from "react-input-mask";
import CenterService from '../../core/lib/services/CenterService';
import { useAxios } from '../../hooks';

type Props = {

  isLoading: boolean;
}

const CenterSchema = Yup.object().shape({
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

const CenterManager = () => {

  const dispatch = useDispatch();
  const center = useSelector((state: RootState) => state.center.data);
  const centers = useSelector((state: RootState) => state.center.centers);
  const isLoading = useSelector((state: RootState) => state.center.isLoading);

  const centerService = new CenterService(useAxios())
  useEffect(() => {
    centerService.getCenters(dispatch, isLoading)

  }, [])

  const handleChange = (prop: any) => (event: any) => {
    dispatch(centerUpdateAction({ ...center, [prop]: event.target.value }))
  };

  const handleButton = (prop: any) => {
    centerService.create(dispatch, isLoading, center)
  };
  return (
    <>

      <div className="overflow-hidden shadow sm:rounded-md">
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className="grid grid-cols-6 gap-2">
            <div className="col-span-6 sm:col-span-6 lg:col-span-3">
              <label htmlFor="CenterName" className="block text-sm font-medium text-gray-700">
                Назва центру
              </label>
              <input
                type="text"
                name="CenterName"
                id="CenterName"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={center.name}
                onChange={handleChange("name")}
              />
            </div>
            <div className="col-span-6 sm:col-span-6 lg:col-span-3">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Телефон центру
              </label>
              <InputMask
                mask='+389999999999'
                value={center.phone}
                maskPlaceholder=""
                onChange={handleChange("phone")}
              >
                <input type="text"
                  name="phone"
                  id="phone"
                  autoComplete="phone"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </InputMask>
            </div>

            <div className="col-span-6">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Адреса центру
              </label>
              <input
                type="text"
                name="address"
                id="address"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={center.address}
                onChange={handleChange("address")}
              />
            </div>



            <div className="col-span-6 sm:col-span-6 lg:col-span-3">
              <label htmlFor="director" className="block text-sm font-medium text-gray-700">
                П.І.Б. директора
              </label>
              <input
                type="text"
                name="director"
                id="director"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={center.director}
                onChange={handleChange("director")}

              />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-3">
              <label htmlFor="phoneDirector" className="block text-sm font-medium text-gray-700">
                Телефон директора
              </label>
              <InputMask
                mask='+389999999999'
                value={center.phoneDirector}
                maskPlaceholder=""
                onChange={handleChange("phoneDirector")}
              >
                <input type="text"
                  name="phone"
                  id="phone"
                  autoComplete="phone"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </InputMask>
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

export default CenterManager;


