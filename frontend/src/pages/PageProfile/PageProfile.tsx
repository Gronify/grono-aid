import React, { useEffect, useLayoutEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/lib/frameworks/redux';

import { useParams } from 'react-router-dom';
import { useAxios } from '../../hooks';

import DistributionService from '../../core/lib/services/DistributionService';
import UserService from '../../core/lib/services/UserService';
import Avatar, { genConfig } from 'react-nice-avatar';
import { useSnackbar } from 'notistack';

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
                <div className="col-span-6 sm:col-span-3 ">
                  <Avatar
                    className="h-48 w-48 rounded-full"
                    {...genConfig(user.email)} />
                </div>
                <div className="col-span-6 sm:col-span-3 ">
                  <h4 className="font-medium leading-tight text-2xl">Прізвище: {user.surname}</h4>
                  <h4 className="font-medium leading-tight text-2xl">Ім'я: {user.name}</h4>
                  <h4 className="font-medium leading-tight text-2xl">Побатькові: {user.patronymic}</h4>
                  <h4 className="font-medium leading-tight text-2xl">Телефон: {user.phone}</h4>
                  <br />
                  <h4 className="font-medium leading-tight text-2xl">Видано за день: </h4>
                  {userShortStat.distributeToday.map((distribute) => {
                    return (<><h3 className="font-medium leading-tight text-lg">{distribute.name} - {distribute.measurement} </h3>
                      <h2 className="font-medium leading-tight text-base">Кількість одиниць: {distribute.totalAmount} </h2>
                      <h2 className="font-medium leading-tight text-base">Кількість видач: {distribute.totalCount} </h2></>)
                  })}
                  <br />
                  <h4 className="font-medium leading-tight text-2xl">Видано за місяць: </h4>
                  {userShortStat.distributeThisMonth.map((distribute) => {
                    return (<><h3 className="font-medium leading-tight text-lg">{distribute.name} - {distribute.measurement} </h3>
                      <h2 className="font-medium leading-tight text-base">Кількість одиниць: {distribute.totalAmount} </h2>
                      <h2 className="font-medium leading-tight text-base">Кількість видач: {distribute.totalCount} </h2></>)
                  })}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>

  )
};

export default PageProfile;


