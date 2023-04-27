import React, { useEffect, useLayoutEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/lib/frameworks/redux';

import { useParams } from 'react-router-dom';
import { useAxios } from '../../hooks';

import DistributionService from '../../core/lib/services/DistributionService';
import UserService from '../../core/lib/services/UserService';
import Avatar, { genConfig } from 'react-nice-avatar';
import { useSnackbar } from 'notistack';
import { BuildingOfficeIcon, MapIcon, PhoneIcon, UserIcon } from '@heroicons/react/20/solid';

type Props = {

  isLoading: boolean;
}



const PageProfile = () => {

  const dispatch = useDispatch()
  const userIsLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const user = useSelector((state: RootState) => state.user.data);

  const userShortStatIsLoggedIn = useSelector((state: RootState) => state.userShortStat.isLoading);
  const userShortStat = useSelector((state: RootState) => state.userShortStat.data);


  const userService = new UserService(useAxios(), useSnackbar())


  useEffect(() => {
    if (user._id !== "") {
      userService.getDataByUserId(dispatch, userIsLoggedIn, user)
      userService.getUserShortStatByUserId(dispatch, userShortStatIsLoggedIn, user)
    }

  }, [user._id])


  return (
    <>
      <div className='container mx-auto sm:max-w-fit'>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div className=" shadow sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6 ">
              <div className="grid grid-cols-6 gap-6 justify-items-center">
                <div className="col-span-6 sm:col-span-2 ">

                  <Avatar
                    className="h-48 w-48 rounded-full"
                    {...genConfig(user.email)} />

                </div>
                <div className="col-span-6 sm:col-span-4 ">
                  <div className="grid grid-cols-6 gap-8">
                    <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                      <label htmlFor="surname" className="flex text-sm font-medium text-gray-500">
                        <UserIcon className="h-5 w-5 mr-1" /> Прізвище, Ім'я, Побатькові
                      </label>
                      <span className="leading-tight font-normal text-xl mb-2">{user.surname} {user.name} {user.patronymic}</span>
                    </div>
                    <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                      <label htmlFor="phone" className="flex text-sm font-medium text-gray-500">
                        <PhoneIcon className="h-5 w-5 mr-1" /> Телефон
                      </label>
                      <span className="leading-tight font-normal text-xl mb-2">{user.phone}</span>
                    </div>
                    <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                      <label htmlFor="center" className="flex text-sm font-medium text-gray-500">
                        <BuildingOfficeIcon className="h-5 w-5 mr-1" /> Центр
                      </label>
                      <span className="leading-tight font-normal text-xl mb-2">{user.centerId.name}</span>
                    </div>
                    <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                      <label htmlFor="address" className="flex text-sm font-medium text-gray-500">
                        <MapIcon className="h-5 w-5 mr-1" />Адреса центру
                      </label>
                      <span className="leading-tight font-normal text-xl mb-2">{user.centerId.address}</span>
                    </div>
                  </div>
                </div>

                <div className="col-span-6 sm:col-span-6 ">


                  <br />
                  <h4 className="font-medium leading-tight text-2xl">Видано за день: </h4>
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">

                          </th>
                          <th scope="col" className="px-6 py-3">
                            Кількість одиниць
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Кількість видач
                          </th>

                        </tr>
                      </thead>
                      <tbody>
                        {userShortStat.distributeToday.map((distribute) => {
                          return (<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {distribute.name} - {distribute.measurement}
                            </th>
                            <td className="px-6 py-4">
                              {distribute.totalAmount}
                            </td>
                            <td className="px-6 py-4">
                              {distribute.totalCount}
                            </td>

                          </tr>)
                        })}


                      </tbody>
                    </table>
                  </div>

                  <br />
                  <h4 className="font-medium leading-tight text-2xl">Видано за місяць: </h4>

                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">

                          </th>
                          <th scope="col" className="px-6 py-3">
                            Кількість одиниць
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Кількість видач
                          </th>

                        </tr>
                      </thead>
                      <tbody>
                        {userShortStat.distributeThisMonth.map((distribute) => {
                          return (<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {distribute.name} - {distribute.measurement}
                            </th>
                            <td className="px-6 py-4">
                              {distribute.totalAmount}
                            </td>
                            <td className="px-6 py-4">
                              {distribute.totalCount}
                            </td>

                          </tr>)
                        })}


                      </tbody>
                    </table>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div >

    </>

  )
};

export default PageProfile;


