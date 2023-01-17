import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LockClosedIcon } from '@heroicons/react/20/solid'


type Props = {
  signIn: (login: string, password: string) => void;
  isLoading: boolean;
}

const LoginSchema = Yup.object().shape({
  login: Yup.string()
    .required("Логін це обов'язкове поле вводу"),
  password: Yup.string()
    .required("Пароль це обов'язкове поле вводу"),
});

const PageLogin = () => {

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
              Sign in to your account
            </h2>

          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
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
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
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

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>







  )
};

export default PageLogin;



{/* <div id="page-login-wrapper">
<div id="page-login-logo-wrapper">
  <Logo shade={logoShade.DARK} description="Вхід до панелі адміністратора" />
</div>
<Card id="page-login-card" elevation={Elevation.ONE}>
  <h5 id="page-login-title" className="bp4-heading">Вхід</h5>

  <Formik
    initialValues={{ login: '', password: '' }}
    validationSchema={LoginSchema}
    onSubmit={(values, { setSubmitting }) => {
      signIn(values.login, values.password);
      setSubmitting(false);
    }}
  >
    {
      ({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <FormGroup
            label="Логін"
            labelFor="login"
            labelInfo="*"
            intent={errors.login && touched.login ? 'danger' : undefined}
            helperText={errors.login && touched.login ? errors.login : undefined}
          >
            <InputGroup
              id="login"
              name="login"
              type="text"
              intent={errors.login && touched.login ? 'danger' : undefined}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.login}
              placeholder="Ваш логін"
            />
          </FormGroup>
          <FormGroup
            label="Пароль"
            labelFor="password"
            labelInfo="*"
            intent={errors.password && touched.password ? 'danger' : undefined}
            helperText={errors.password && touched.password ? errors.password : undefined}
          >
            <InputGroup
              id="password"
              name="password"
              type="password"
              intent={errors.password && touched.password ? 'danger' : undefined}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder="Ваш пароль"
            />
          </FormGroup>
          <Button
            loading={isLoading}
            type="submit"
            disabled={isSubmitting}
            intent="primary"
            icon="log-in"
            fill
          >
            Вхід
          </Button>
        </form>
      )
    }
  </Formik>
</Card>
<p
  id="page-login-footer"
  className="bp4-text-small bp4-text-muted"
>
  Створено <a href="https://finsystem.net/">finsystem</a>
</p>
</div> */}