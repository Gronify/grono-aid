import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, Outlet, Link, useNavigate } from "react-router-dom";
import { PageLogin } from './pages/PageLogin';
import { PageRegistration } from './pages/PageRegister';

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { PageІssuance } from './pages/PageІssuance';
import { PrivateRoute } from './components/PrivateRoute';
import { Header } from './components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { userSingOutAction } from './core/lib/adapters';
import { RootState } from './core/lib/frameworks/redux';

function App() {

  const dispatch = useDispatch();
  const userIsLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const signOut = () => {
    dispatch(userSingOutAction())
  }
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/")


    return () => {

    }
  }, [userIsLoggedIn])

  return (
    <>
      {userIsLoggedIn ? <Header signOut={signOut} /> : null
      }

      <Routes>
        <Route path="/" element={
          <PrivateRoute
            isLoggedIn={userIsLoggedIn}
            redirectPath={"login"}
          >
            <PageІssuance />
          </PrivateRoute>
        } />
        <Route path="login" element={<PageLogin />} />
        <Route path="registration" element={<PageRegistration />} />
        <Route path="home" element={<PageІssuance />} />
      </Routes>
    </>
  );
}

export default App;
