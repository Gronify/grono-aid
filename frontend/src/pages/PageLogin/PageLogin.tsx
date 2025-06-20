import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LockClosedIcon } from '@heroicons/react/20/solid'
import AuthService from '../../core/lib/services/AuthService';
import { useNavigate } from 'react-router-dom';
import { useAxios } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/lib/frameworks/redux';
import { userIsLoadingAction } from '../../core/lib/adapters';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';

type Props = {
  signIn: (login: string, password: string) => void;
  isLoading: boolean;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Логін це обов'язкове поле вводу"),
  password: Yup.string()
    .required("Пароль це обов'язкове поле вводу"),
});


const PageLogin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",

  });
  const navigate = useNavigate();
  const authService = new AuthService(useAxios(), useSnackbar())
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const userIsLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });


  };

  const handleSubmit = async (e: any) => {
    LoginSchema
      .validate(values)
      .then(async (valid) => {

        await authService.login(values, dispatch, isLoading)

      }).catch(function (err: any) {
        console.log(err);
      });
  }

  useEffect(() => {
    if (userIsLoggedIn) {
      navigate("/")
    }
  }, [userIsLoggedIn])




  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-32 w-auto"
              src="./logo.svg"
              alt="GronoAid"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Увійдіть у свій обліковий запис
            </h2>

          </div>

          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
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
            <div>
              <label htmlFor="password" className="sr-only">
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
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div className='grid gap-2'>
            <button

              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={handleSubmit}

            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              Вхід
            </button>
            <button

              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => navigate("/registration")}

            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>

              Реєстрація
            </button>
          </div>
        </div>
      </div>
    </>
  )
};

export default PageLogin;
