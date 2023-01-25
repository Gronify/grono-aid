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

const AddressManager = () => {

  return (
    <>
      <form>
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-2">
              <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                <label htmlFor="Region" className="block text-sm font-medium text-gray-700">
                  Назва регіону
                </label>
                <input
                  type="text"
                  name="Region"
                  id="Region"
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

export default AddressManager;


