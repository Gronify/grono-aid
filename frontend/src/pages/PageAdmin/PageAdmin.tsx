import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { BuildingOfficeIcon, HandRaisedIcon, InboxStackIcon, LockClosedIcon, MapPinIcon, PresentationChartLineIcon, UserIcon, UsersIcon } from '@heroicons/react/20/solid'
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
import GiftManager from './GiftManager';
import HumanManager from './HumanManager';
import UserManager from './UserManager';
import DistributionManager from './DistributionManager';
import Statistic from './Statistic';

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
    { icon: <PresentationChartLineIcon className="h-5 w-5 mr-1" />, name: 'Статистика', current: true },
    { icon: <BuildingOfficeIcon className="h-4 w-4 mr-1" />, name: 'Центри', current: false },
    { icon: <InboxStackIcon className="h-4 w-4 mr-1" />, name: 'Види допомоги', current: false },
    { icon: <MapPinIcon className="h-4 w-4 mr-1" />, name: 'Адреси', current: false },
    { icon: <HandRaisedIcon className="h-4 w-4 mr-1" />, name: 'Видачі', current: false },
    { icon: <UsersIcon className="h-4 w-4 mr-1" />, name: 'Люди', current: false },
    { icon: <UserIcon className="h-4 w-4 mr-1" />, name: 'Користувачі', current: false },
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
              <div className="relative flex h-16 items-center justify-center">
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
                <div className="flex items-center justify-around sm:items-stretch sm:justify-start">

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
                          <div className="flex content-center ">
                            {item.icon}
                            <div className="hidden sm:block md:block lg:hidden">{item.current ? item.name : null}</div>
                            <div className="block sm:hidden md:hidden lg:block ">{item.name}</div>
                          </div>
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
                    <div className="flex">
                      {item.icon} {item.name}
                    </div>
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {tabs[0].current ? <Statistic /> : null}
      {tabs[1].current ? <CenterManager /> : null}
      {tabs[2].current ? <GiftManager /> : null}
      {tabs[3].current ? <AddressManager /> : null}
      {tabs[4].current ? <DistributionManager /> : null}
      {tabs[5].current ? <HumanManager /> : null}
      {tabs[6].current ? <UserManager /> : null}
    </>
  )
};

export default PageAdmin;

