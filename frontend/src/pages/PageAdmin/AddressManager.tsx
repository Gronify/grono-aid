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
          <div className="bg-white text-center px-4 py-5 sm:p-6">
            В розробці!
          </div>
        </div>
      </form>


    </>

  )
};

export default AddressManager;


