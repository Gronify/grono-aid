import React, { useEffect, useState, useCallback, useMemo, Fragment, ReactNode } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ChevronDownIcon, EllipsisVerticalIcon, LockClosedIcon, XMarkIcon } from '@heroicons/react/20/solid'
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
import { Popover, Dialog, Transition } from '@headlessui/react';
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { MRT_Localization_UK } from 'material-react-table/locales/uk';
import { MRT_Cell } from 'material-react-table';
import { MRT_Row } from 'material-react-table';
import { MRT_TableInstance } from 'material-react-table';
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
  const [modalDelete, setModalDelete] = useState({
    isOpen: false,
    gift: gift,
  })

  const [modalEdit, setModalEdit] = useState({
    isOpen: false,
    gift: gift,
  })

  useEffect(() => {
    giftService.getGifts(dispatch, giftIsLoading)
  }, [])

  const handleChange = (prop: any) => (event: any) => {
    dispatch(giftUpdateAction({ ...gift, [prop]: event.target.value }))
  };

  const handleEditChange = (prop: any) => (event: any) => {
    setModalEdit({ isOpen: modalEdit.isOpen, gift: { ...modalEdit.gift, [prop]: event.target.value } })
  };


  const handleButton = (prop: any) => {
    giftService.create(dispatch, giftIsLoading, { name: gift.name, description: gift.description, period: gift.period, measurement: gift.measurement, centerId: user.centerId._id })
  };


  const handleDeleteButton = (gift: GiftEntityInterface) => {
    giftService.delete(dispatch, giftIsLoading, gift)
  };

  const handleEditButton = (gift: GiftEntityInterface) => {
    giftService.edit(dispatch, giftIsLoading, gift)
  };



  const giftActions = (props: {
    row: {
      original: GiftEntityInterface
    },
    table: any,
  }): ReactNode => {
    return (
      <div className='flex'>
        <button className="flex items-center py-1 px-1 text-xs font-medium text-gray-700 toggle-full-view  hover:text-blue-700 focus:z-10 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => setModalEdit({
          isOpen: true,
          gift: props.row.original,
        })}>
          <span className="sr-only">Edit</span>
          <PencilSquareIcon className="block h-6 w-6 pr-1" />

        </button>
        <button className="flex items-center py-1 px-1 text-xs font-medium text-gray-700   toggle-full-view hover:text-red-700 focus:z-10 dark:bg-gray-800 focus:outline-none dark:text-gray-400  dark:hover:text-white dark:hover:bg-gray-700" onClick={() =>
          setModalDelete({
            isOpen: true,
            gift: props.row.original,
          }
          )
        }>
          <span className="sr-only">Delete</span>
          <TrashIcon className="block h-6 w-6 pr-1" />

        </button>
      </div>
    );
  }

  const columnsGiftMachines: MRT_ColumnDef<GiftEntityInterface>[] = useMemo(
    () => [
      // {
      //   header: 'id',
      //   accessorKey: '_id',
      //   enableSorting: false,
      //   enableColumnFilter: false
      // },
      {
        header: 'Назва',
        accessorKey: 'name'
      },
      {
        header: 'Опис',
        accessorKey: 'description'
      },
      {
        header: 'Одиницю вимиру',
        accessorFn: gift => gift.measurement
      },
      {
        header: 'Період',
        accessorFn: gift => gift.period
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
            <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
              <MaterialReactTable
                columns={columnsGiftMachines}
                data={gifts}
                state={{ isLoading: giftIsLoading }}
                enableRowSelection
                // enableColumnResizing
                // columnResizeMode="onEnd"
                initialState={{ density: "compact" }}
                localization={MRT_Localization_UK}
                enableRowActions
                renderRowActions={giftActions}
              />
            </div>
          </div>
        </div>
      </div >

      <Transition appear show={modalDelete.isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[9999] overflow-y-auto bg-opacity-50 bg-gray-900"

          onClose={() => setModalDelete(prevState => {
            return {
              ...prevState,
              isOpen: false
            }
          })}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  <div className='flex'>
                    <TrashIcon className="h-6 w-6 pr-1" />
                    Видалення
                  </div>
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-s text-gray-500 border-t pt-2">
                    Ви впевнені, що хочете видалити запис?

                  </p>
                  <p className="text-s text-gray-500 pt-2">
                    Назва: {modalDelete.gift.name}
                  </p>
                  <p className="text-s text-gray-500 pt-2">
                    Опис: {modalDelete.gift.description}
                  </p>


                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-300 duration-300"
                    onClick={() => {

                      handleDeleteButton(modalDelete.gift)
                      setModalDelete(prevState => {
                        return {
                          ...prevState,
                          isOpen: false
                        }
                      })
                    }}
                  >
                    <TrashIcon className="h-5 w-5 pr-1" />
                    Видалити
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-black bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 duration-300"
                    onClick={() => setModalDelete(prevState => {
                      return {
                        ...prevState,
                        isOpen: false
                      }
                    })}
                  >
                    <XMarkIcon className="h-5 w-5 pr-1" />
                    Скасувати
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={modalEdit.isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[9999] overflow-y-auto bg-opacity-50 bg-gray-900"

          onClose={() => setModalDelete(prevState => {
            return {
              ...prevState,
              isOpen: false
            }
          })}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  <div className='flex'>
                    <PencilSquareIcon className="h-6 w-6 pr-1" />
                    Редагувати
                  </div>
                </Dialog.Title>
                <div className="mt-2">
                  <div className="col-span-6">
                    <label htmlFor="giftName" className="block text-sm font-medium text-gray-700">
                      Назва подарку
                    </label>
                    <input
                      type="text"
                      name="giftName"
                      id="giftName"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={modalEdit.gift.name}
                      onChange={handleEditChange("name")}
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
                      value={modalEdit.gift.measurement}
                      onChange={handleEditChange("measurement")}
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
                      value={modalEdit.gift.description}
                      onChange={handleEditChange("description")}
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
                      value={modalEdit.gift.period}
                      onChange={handleEditChange("period")}
                    />
                  </div>
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-300 duration-300"
                    onClick={() => {

                      handleEditButton(modalEdit.gift)
                      setModalEdit(prevState => {
                        return {
                          ...prevState,
                          isOpen: false
                        }
                      })
                    }}
                  >
                    <PencilSquareIcon className="h-5 w-5 pr-1" />
                    Редагувати
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-black bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 duration-300"
                    onClick={() => setModalEdit(prevState => {
                      return {
                        ...prevState,
                        isOpen: false
                      }
                    })}
                  >
                    <XMarkIcon className="h-5 w-5 pr-1" />
                    Скасувати
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

    </>

  )
};

export default GiftManager;


