import React, { ReactNode, useEffect, useState, useMemo, Fragment } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LockClosedIcon, PencilSquareIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/lib/frameworks/redux';
import { centerUpdateAction, humanUpdateAction } from '../../core/lib/adapters';
import InputMask from "react-input-mask";
import CenterService from '../../core/lib/services/CenterService';
import { useAxios } from '../../hooks';
import { useSnackbar } from 'notistack';
import { CenterEntityInterface } from '../../core/lib/entities/Center';
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { MRT_Localization_UK } from 'material-react-table/locales/uk';
import { Dialog, Transition } from '@headlessui/react';

type Props = {

  isLoading: boolean;
}

const CenterSchema = Yup.object().shape({
  login: Yup.string()
    .required("Логін це обов'язкове поле вводу"),
  password: Yup.string()
    .required("Пароль це обов'язкове поле вводу"),
});

// name: string;
// address: string;
// phone: string;
// director: string;
// phoneDirector: string;

const CenterManager = () => {

  const dispatch = useDispatch();
  const center = useSelector((state: RootState) => state.center.data);
  const centers = useSelector((state: RootState) => state.center.centers);
  const centerIsLoading = useSelector((state: RootState) => state.center.isLoading);
  const [modalDelete, setModalDelete] = useState({
    isOpen: false,
    center: center,
  })
  const [modalEdit, setModalEdit] = useState({
    isOpen: false,
    center: center,
  })

  const centerService = new CenterService(useAxios(), useSnackbar())

  useEffect(() => {
    centerService.getCenters(dispatch, centerIsLoading)

  }, [])

  const handleChange = (prop: any) => (event: any) => {
    dispatch(centerUpdateAction({ ...center, [prop]: event.target.value }))
  };


  const handleEditChange = (prop: any) => (event: any) => {
    setModalEdit({ isOpen: modalEdit.isOpen, center: { ...modalEdit.center, [prop]: event.target.value } })
  };

  const handleButton = (prop: any) => {
    centerService.create(dispatch, centerIsLoading, center)
  };

  const handleDeleteButton = (center: CenterEntityInterface) => {
    centerService.delete(dispatch, centerIsLoading, center)
  };

  const handleEditButton = (center: CenterEntityInterface) => {
    centerService.edit(dispatch, centerIsLoading, center)
  };

  const centerActions = (props: {
    row: {
      original: CenterEntityInterface
    },
    table: any,
  }): ReactNode => {
    return (
      <div className='flex'>
        <button className="flex items-center py-1 px-1 text-xs font-medium text-gray-700 toggle-full-view  hover:text-blue-700 focus:z-10 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => setModalEdit({
          isOpen: true,
          center: props.row.original,
        })}>
          <span className="sr-only">Edit</span>
          <PencilSquareIcon className="block h-6 w-6 pr-1" />

        </button>
        <button className="flex items-center py-1 px-1 text-xs font-medium text-gray-700   toggle-full-view hover:text-red-700 focus:z-10 dark:bg-gray-800 focus:outline-none dark:text-gray-400  dark:hover:text-white dark:hover:bg-gray-700" onClick={() =>
          setModalDelete({
            isOpen: true,
            center: props.row.original,
          }
          )
        }>
          <span className="sr-only">Delete</span>
          <TrashIcon className="block h-6 w-6 pr-1" />

        </button>
      </div>
    );
  }

  const columnsCenter: MRT_ColumnDef<CenterEntityInterface>[] = useMemo(
    () => [
      {
        header: 'Назва',
        accessorKey: 'name'
      },
      {
        header: 'Адреса',
        accessorKey: 'address'
      },
      {
        header: 'Телефон центру',
        accessorKey: 'phone'
      },
      {
        header: 'Деректор',
        accessorKey: 'director'
      },
      {
        header: 'Телефон деректору',
        accessorKey: 'phoneDirector'
      },
    ],
    [centerActions]
  );


  return (
    <>

      <div className="overflow-hidden shadow sm:rounded-md">
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className="grid grid-cols-6 gap-2">
            <div className="col-span-6 sm:col-span-6 lg:col-span-3">
              <label htmlFor="CenterName" className="block text-sm font-medium text-gray-700">
                Назва центру
              </label>
              <input
                type="text"
                name="CenterName"
                id="CenterName"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={center.name}
                onChange={handleChange("name")}
              />
            </div>
            <div className="col-span-6 sm:col-span-6 lg:col-span-3">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Телефон центру
              </label>
              <InputMask
                mask='+389999999999'
                value={center.phone}
                maskPlaceholder=""
                onChange={handleChange("phone")}
              >
                <input type="text"
                  name="phone"
                  id="phone"
                  autoComplete="phone"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </InputMask>
            </div>

            <div className="col-span-6">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Адреса центру
              </label>
              <input
                type="text"
                name="address"
                id="address"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={center.address}
                onChange={handleChange("address")}
              />
            </div>



            <div className="col-span-6 sm:col-span-6 lg:col-span-3">
              <label htmlFor="director" className="block text-sm font-medium text-gray-700">
                П.І.Б. директора
              </label>
              <input
                type="text"
                name="director"
                id="director"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={center.director}
                onChange={handleChange("director")}

              />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-3">
              <label htmlFor="phoneDirector" className="block text-sm font-medium text-gray-700">
                Телефон директора
              </label>
              <InputMask
                mask='+389999999999'
                value={center.phoneDirector}
                maskPlaceholder=""
                onChange={handleChange("phoneDirector")}
              >
                <input type="text"
                  name="phone"
                  id="phone"
                  autoComplete="phone"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </InputMask>
            </div>
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
              columns={columnsCenter}
              data={centers}
              state={{ isLoading: centerIsLoading }}
              enableRowSelection
              // enableColumnResizing
              // columnResizeMode="onEnd"
              initialState={{ density: "compact" }}
              localization={MRT_Localization_UK}
              enableRowActions
              renderRowActions={centerActions}
            />
          </div>
        </div>

      </div>

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
                    Назва: {modalDelete.center.name}
                  </p>
                  <p className="text-s text-gray-500 pt-2">
                    Адреса: {modalDelete.center.address}
                  </p>


                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-300 duration-300"
                    onClick={() => {

                      handleDeleteButton(modalDelete.center)
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
                  <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                    <label htmlFor="CenterName" className="block text-sm font-medium text-gray-700">
                      Назва центру
                    </label>
                    <input
                      type="text"
                      name="CenterName"
                      id="CenterName"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={modalEdit.center.name}
                      onChange={handleEditChange("name")}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Телефон центру
                    </label>
                    <InputMask
                      mask='+389999999999'
                      value={modalEdit.center.phone}
                      maskPlaceholder=""
                      onChange={handleEditChange("phone")}
                    >
                      <input type="text"
                        name="phone"
                        id="phone"
                        autoComplete="phone"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </InputMask>
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Адреса центру
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={modalEdit.center.address}
                      onChange={handleEditChange("address")}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                    <label htmlFor="director" className="block text-sm font-medium text-gray-700">
                      П.І.Б. директора
                    </label>
                    <input
                      type="text"
                      name="director"
                      id="director"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={modalEdit.center.director}
                      onChange={handleEditChange("director")}

                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                    <label htmlFor="phoneDirector" className="block text-sm font-medium text-gray-700">
                      Телефон директора
                    </label>
                    <InputMask
                      mask='+389999999999'
                      value={modalEdit.center.phoneDirector}
                      maskPlaceholder=""
                      onChange={handleEditChange("phoneDirector")}
                    >
                      <input type="text"
                        name="phone"
                        id="phone"
                        autoComplete="phone"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </InputMask>
                  </div>
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-300 duration-300"
                    onClick={() => {

                      handleEditButton(modalEdit.center)
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

export default CenterManager;


