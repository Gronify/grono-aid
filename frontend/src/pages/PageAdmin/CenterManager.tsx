import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/lib/frameworks/redux';
import { humanUpdateAction } from '../../core/lib/adapters';


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

  return (
    <>
      <form>
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

                />
              </div>
              <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Телефон центру
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  autoComplete="phone"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"

                />
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

                />
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                <label htmlFor="phoneDirector" className="block text-sm font-medium text-gray-700">
                  Телефон директора
                </label>
                <input
                  type="text"
                  name="phoneDirector"
                  id="phoneDirector"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"

                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Створити
            </button>
          </div>

        </div>
      </form>


    </>

  )
};

export default CenterManager;


