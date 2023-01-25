import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/lib/frameworks/redux';
import { humanUpdateAction } from '../../core/lib/adapters';
import CenterManager from './CenterManager';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';
import ReactNiceAvatar from 'react-nice-avatar';
import { Fragment } from 'react'
import { tab } from '@testing-library/user-event/dist/tab';
import AddressManager from './AddressManager';

type Props = {

  isLoading: boolean;
}

const ІssuanceSchema = Yup.object().shape({
  login: Yup.string()
    .required("Логін це обов'язкове поле вводу"),
  password: Yup.string()
    .required("Пароль це обов'язкове поле вводу"),
});


const PageAdmin = () => {

  const [tabs, setTabs] = useState([
    { name: 'Statistics', current: false },
    { name: 'Canter Manager', current: false },
    { name: 'Gift Manager', current: false },
    { name: 'Address Manager', current: false },
    { name: 'Distribution Manager', current: false },
    { name: 'Human Manager', current: false },
    { name: 'User Manager', current: false },
  ])

  const [currentTab, setCurrentTab] = useState(0)

  const handleChangeTab = (prop: any) => (event: any) => {
    let prevTabs = tabs.map((tab) => {
      return {
        ...tab,
        current: false
      }
    })

    prevTabs[prop].current = true
    setTabs(prevTabs)
  };




  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>
      <Disclosure as="nav" className="bg-gray-700">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">


                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {tabs.map((item, id) => (
                        <Disclosure.Button
                          key={item.name}
                          onClick={handleChangeTab(id)}
                          className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {tabs.map((item, id) => (

                  <Disclosure.Button
                    key={item.name}
                    onClick={handleChangeTab(id)}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-sm font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>


      {tabs[1].current ? <CenterManager /> : null}
      {tabs[3].current ? <AddressManager /> : null}




    </>

  )
};

export default PageAdmin;

