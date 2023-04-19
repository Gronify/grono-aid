import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ChevronDownIcon, EllipsisVerticalIcon, LockClosedIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/lib/frameworks/redux';
import { giftUpdateAction, humanUpdateAction } from '../../core/lib/adapters';
import { useAxios } from '../../hooks';
import GiftService from '../../core/lib/services/GiftService';
import { useSnackbar } from 'notistack';
import { CellProps, Column } from 'react-table';
import { Table } from '../../components/Table';
import { GiftEntityInterface } from '../../core/lib/entities/Gift';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Popover } from '@headlessui/react';

type Props = {

  isLoading: boolean;
}

const GiftSchema = Yup.object().shape({
  login: Yup.string()
    .required("Логін це обов'язкове поле вводу"),
  password: Yup.string()
    .required("Пароль це обов'язкове поле вводу"),
});




const GiftManager = () => {
  const user = useSelector((state: RootState) => state.user.data)
  const gift = useSelector((state: RootState) => state.gift.data)
  const gifts = useSelector((state: RootState) => state.gift.gifts)
  const giftIsLoading = useSelector((state: RootState) => state.gift.isLoading)
  const dispatch = useDispatch();
  const giftService = new GiftService(useAxios(), useSnackbar())

  useEffect(() => {
    giftService.getGifts(dispatch, giftIsLoading)
  }, [])

  const handleChange = (prop: any) => (event: any) => {
    dispatch(giftUpdateAction({ ...gift, [prop]: event.target.value }))
  };


  const handleButton = (prop: any) => {
    giftService.create(dispatch, giftIsLoading, { name: gift.name, description: gift.description, period: gift.period, measurement: gift.measurement, centerId: user.centerId._id })
  };
  const giftActions = useCallback((
    {
      value,
      cell: {
        row: { original },
      },
    }: CellProps<GiftEntityInterface>
  ) => {


    return (
      <Popover className="relative">
        <Popover.Button
          className="flex items-center p-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-full-view hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <EllipsisVerticalIcon className="block h-6 w-6" />
        </Popover.Button>
        <Popover.Panel className="absolute z-10 top-10 right-0 mt-3">
          <div className="overflow-hidden rounded-lg shadow-lg ring-2 ring-black ring-opacity-5">
            <div className="relative grid gap-0 bg-white ">
              <button className="flex items-center py-2 px-6 text-xs font-medium text-gray-700 bg-white toggle-full-view hover:bg-gray-100 hover:text-blue-700 focus:z-10 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => console.log({
                isOpen: true,
                gift: original,
              })}>
                <span className="sr-only">Edit</span>
                <PencilSquareIcon className="block h-6 w-6 pr-1" />
                Редагувати
              </button>
              <button className="flex items-center py-2 px-6 text-xs font-medium text-gray-700 bg-white  toggle-full-view hover:bg-gray-100 hover:text-red-700 focus:z-10 dark:bg-gray-800 focus:outline-none dark:text-gray-400  dark:hover:text-white dark:hover:bg-gray-700" onClick={() => console.log({
                isOpen: true,
                gift: original,
              })}>
                <span className="sr-only">Delete</span>
                <TrashIcon className="block h-6 w-6 pr-1" />
                Видалити
              </button>
            </div>
          </div>
        </Popover.Panel>
      </Popover>
      // <div className="flex ">
      //   <button className="flex items-center p-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-full-view hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
      //     <span className="sr-only">Edit</span>
      //     <PencilSquareIcon className="block h-6 w-6" />
      //   </button>
      //   <button className="flex ml-1 items-center p-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-full-view hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
      //     <span className="sr-only">Delete</span>
      //     <TrashIcon className="block h-6 w-6" />
      //   </button>
      // </div>
    );
  }, [
    // userCanDeleteDealer, userCanUpdateDealer
  ]);

  const columnsGiftMachines: Column<GiftEntityInterface>[] = useMemo(
    () => [
      {
        Header: 'id',
        accessor: '_id',
        width: 10,
      },
      {
        Header: 'Назва',
        accessor: 'name'
      },
      {
        Header: 'Опис',
        accessor: 'description'
      },
      {
        Header: 'Одиницю вимиру',
        accessor: gift => gift.measurement
      },
      {
        id: 'giftActions',
        Header: '',
        accessor: '_id',
        width: 46,
        Cell: giftActions,
      },
    ],
    [giftActions]
  );



  return (
    <>
      <div className="shadow sm:rounded-md">
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className="grid grid-cols-6 gap-2">
            <div className="col-span-6">
              <label htmlFor="giftName" className="block text-sm font-medium text-gray-700">
                Назва подарку
              </label>
              <input
                type="text"
                name="giftName"
                id="giftName"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={gift.name}
                onChange={handleChange("name")}
              />
            </div>

            <div className="col-span-6">
              <label htmlFor="measurement" className="block text-sm font-medium text-gray-700">
                Одиниця вимірення
              </label>
              <input
                type="text"
                name="measurement"
                id="measurement"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={gift.measurement}
                onChange={handleChange("measurement")}
              />
            </div>

            <div className="col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Опис
              </label>
              <input
                type="text"
                name="description"
                id="description"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={gift.description}
                onChange={handleChange("description")}
              />
            </div>

            <div className="col-span-6">
              <label htmlFor="period" className="block text-sm font-medium text-gray-700">
                Період
              </label>
              <input
                type="number"
                name="period"
                id="period"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={gift.period}
                onChange={handleChange("period")}
              />
            </div>





          </div>
          <div className=" px-4 py-3 text-center sm:px-6">
            <button

              className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={handleButton}
            >
              Створити
            </button>
          </div>
          <div className=" px-4 py-3 text-center sm:px-6">
            <Table
              isLoading={giftIsLoading}
              columns={columnsGiftMachines}
              data={gifts}
              msgNoData="На даний момент не було створено жодного виду допомоги!"
            />
          </div>


        </div>

      </div>



    </>

  )
};

export default GiftManager;


