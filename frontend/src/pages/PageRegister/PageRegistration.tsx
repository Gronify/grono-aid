import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { Autocomplete } from '../../components/Autocomplete';
import { CenterEntityInterface } from '../../core/lib/entities/Center';
import { useAxios } from '../../hooks';
import { DtoCenterResponse } from '../../core/lib/dto/center';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/lib/frameworks/redux';
import CenterService from '../../core/lib/services/CenterService';
import { centerUpdateAction } from '../../core/lib/adapters';
import AuthService from '../../core/lib/services/AuthService';
import { useNavigate } from 'react-router-dom';
import InputMask from "react-input-mask";
import { useSnackbar } from 'notistack';

type Props = {
  signIn: (login: string, password: string) => void;
  isLoading: boolean;
}

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .required("Логін це обов'язкове поле вводу"),
  password: Yup.string()
    .required("Пароль це обов'язкове поле вводу"),
});

const PageRegistration = () => {
  const center = useSelector((state: RootState) => state.center.data);
  const centers = useSelector((state: RootState) => state.center.centers);
  const isLoadingCenter = useSelector((state: RootState) => state.center.isLoading);
  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const userIsLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  const [values, setValues] = useState({
    email: "",
    password: "",
    surname: "",
    name: "",
    patronymic: "",
    phone: "",

  });

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });


  };


  const dispatch = useDispatch();
  const axios = useAxios()
  const addressService = new CenterService(useAxios(), useSnackbar())
  const authService = new AuthService(useAxios(), useSnackbar())
  const navigate = useNavigate();

  useEffect(() => {
    addressService.getCenters(dispatch, isLoadingCenter)
  }, [])

  useEffect(() => {
    if (userIsLoggedIn) {
      navigate("/")
    }
  }, [userIsLoggedIn])

  const handleSubmit = async (e: any) => {
    RegisterSchema
      .validate(values)
      .then(async (valid) => {

        await authService.registration({ ...values, centerId: center._id }, dispatch, isLoading)

      }).catch(function (err: any) {
        console.log(err);
      });
  }


  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Register
            </h2>

          </div>

          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    // autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address"
                    value={values.email}
                    onChange={handleChange("email")}
                  />
                </div>

                <div className="col-span-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange("password")}
                  />
                </div>

                <div className="col-span-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                  // value={values.password}
                  // onChange={handleChange("password")}
                  />
                </div>


                <div className="col-span-6">
                  <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
                    Прізвище
                  </label>
                  <input
                    id="surname"
                    name="surname"
                    type="surname"
                    // autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="surname"
                    value={values.surname}
                    onChange={handleChange("surname")}
                  />
                </div>

                <div className="col-span-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Ім'я
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="name"
                    // autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="name"
                    value={values.name}
                    onChange={handleChange("name")}
                  />
                </div>

                <div className="col-span-6">
                  <label htmlFor="patronymic" className="block text-sm font-medium text-gray-700">
                    По батькові
                  </label>
                  <input
                    id="patronymic"
                    name="patronymic"
                    type="patronymic"
                    // autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="patronymic"
                    value={values.patronymic}
                    onChange={handleChange("patronymic")}
                  />
                </div>

                <div className="col-span-6">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Телефон
                  </label>
                  <InputMask
                    mask='+389999999999'
                    value={values.phone}
                    maskPlaceholder=""
                    onChange={handleChange("phone")}
                  >
                    <input
                      id="phone"
                      name="phone"
                      type="phone"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="phone"
                    />
                  </InputMask>

                </div>

                <div className="col-span-6">
                  <label htmlFor="center" className="block text-sm font-medium text-gray-700">
                    Центр
                  </label>
                  <Autocomplete options={centers} value={center} setValue={centerUpdateAction} isLoading={isLoadingCenter} />
                </div>

              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
              <button
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleSubmit}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Register
              </button>
            </div>
          </div>

        </div>
      </div >
    </>







  )
};

export default PageRegistration;


