import React, { ReactNode, useEffect, useState, useMemo, Fragment } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LockClosedIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/lib/frameworks/redux';
import { centerUpdateAction, humanSearchUpdateAction, humanUpdateAction } from '../../core/lib/adapters';
import InputMask from "react-input-mask";
import CenterService from '../../core/lib/services/CenterService';
import { useAxios } from '../../hooks';
import { useSnackbar } from 'notistack';
import HumanService from '../../core/lib/services/HumanSearchService';
import { HumanSearchEntityInterface } from '../../core/lib/entities/Human';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { MRT_Localization_UK } from 'material-react-table/locales/uk';
import { Dialog, Transition } from '@headlessui/react';
import moment from 'moment';

type Props = {

  isLoading: boolean;
}

const HumanSchema = Yup.object().shape({
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

const HumanManager = () => {

  const dispatch = useDispatch();
  const human = useSelector((state: RootState) => state.humanSearch.data);
  const humans = useSelector((state: RootState) => state.humanSearch.humans);
  const humanIsLoading = useSelector((state: RootState) => state.humanSearch.isLoading);

  const [modalDelete, setModalDelete] = useState({
    isOpen: false,
    human: human,
  })
  const [modalEdit, setModalEdit] = useState({
    isOpen: false,
    human: human,
  })

  const humanService = new HumanService(useAxios(), useSnackbar())
  useEffect(() => {
    humanService.getHumans(dispatch, humanIsLoading)

  }, [])

  const handleChange = (prop: any) => (event: any) => {
    dispatch(humanSearchUpdateAction({ ...human, [prop]: event.target.value }))
  };

  const handleEditChange = (prop: any) => (event: any) => {
    setModalEdit({ isOpen: modalEdit.isOpen, human: { ...modalEdit.human, [prop]: event.target.value } })
  };
  const handleDeleteButton = (human: HumanSearchEntityInterface) => {
    humanService.delete(dispatch, humanIsLoading, human)
  };

  const handleEditButton = (human: HumanSearchEntityInterface) => {
    console.log(human);

    humanService.edit(dispatch, humanIsLoading, { ...human, dateOfBirthday: String(moment(human.dateOfBirthday, 'DD.MM.YYYY').toDate()) })
  };

  const humanActions = (props: {
    row: {
      original: HumanSearchEntityInterface
    },
    table: any,
  }): ReactNode => {
    return (
      <div className='flex'>
        <button className="flex items-center py-1 px-1 text-xs font-medium text-gray-700 toggle-full-view  hover:text-blue-700 focus:z-10 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => setModalEdit({
          isOpen: true,
          human: { ...props.row.original, dateOfBirthday: moment(props.row.original.dateOfBirthday).format('DD.MM.YYYY') },
        })}>
          <span className="sr-only">Edit</span>
          <PencilSquareIcon className="block h-6 w-6 pr-1" />

        </button>
        <button className="flex items-center py-1 px-1 text-xs font-medium text-gray-700   toggle-full-view hover:text-red-700 focus:z-10 dark:bg-gray-800 focus:outline-none dark:text-gray-400  dark:hover:text-white dark:hover:bg-gray-700" onClick={() =>
          setModalDelete({
            isOpen: true,
            human: props.row.original,
          }
          )
        }>
          <span className="sr-only">Delete</span>
          <TrashIcon className="block h-6 w-6 pr-1" />

        </button>
      </div>
    );
  }

  const columnsHuman: MRT_ColumnDef<HumanSearchEntityInterface>[] = useMemo(
    () => [
      {
        header: 'Прізвище',
        accessorKey: 'surname'
      },
      {
        header: 'Ім\'я',
        accessorKey: 'name'
      },
      {
        header: 'По батькові',
        accessorKey: 'patronymic'
      },
      {
        header: 'ІПН',
        accessorKey: 'ipn'
      },
      {
        header: 'Паспорт',
        accessorFn: human => human.passportId || " - "
      },
      {
        header: 'Телефон',
        accessorKey: 'phone'
      },
      {
        header: 'Дата народження',
        accessorFn: human => moment(human.dateOfBirthday).format('DD.MM.YYYY')
      },
      {
        header: 'Адреса',
        accessorFn: human => `${human.actualAddress.buildingId.streetId.cityId.regionId.name}, ${human.actualAddress.buildingId.streetId.cityId.name}, ${human.actualAddress.buildingId.streetId.name}, ${human.actualAddress.buildingId.name}, ${human.actualAddress.name}`
      },
      {
        header: 'Коммент',
        accessorKey: 'comment'
      },

    ],
    [humanActions]
  );


  return (
    <>

      <div className="overflow-hidden shadow sm:rounded-md">
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className=" px-4 py-3 text-center sm:px-6">
            <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
              <MaterialReactTable
                columns={columnsHuman}
                data={humans}
                state={{ isLoading: humanIsLoading }}
                enableRowSelection
                // enableColumnResizing
                // columnResizeMode="onEnd"
                initialState={{ density: "compact" }}
                localization={MRT_Localization_UK}
                enableRowActions
                renderRowActions={humanActions}
              />
            </div>
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
                    ПІБ: {modalDelete.human.surname} {modalDelete.human.name} {modalDelete.human.patronymic}
                  </p>



                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-300 duration-300"
                    onClick={() => {

                      handleDeleteButton(modalDelete.human)
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
                    <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
                      Прізвище
                    </label>
                    <input
                      type="text"
                      name="surname"
                      id="surname"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={modalEdit.human.surname}
                      onChange={handleEditChange("surname")}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Ім'я
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={modalEdit.human.name}
                      onChange={handleEditChange("name")}
                    />
                  </div>



                  <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                    <label htmlFor="patronymic" className="block text-sm font-medium text-gray-700">
                      По-батькові
                    </label>
                    <input
                      type="text"
                      name="patronymic"
                      id="patronymic"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={modalEdit.human.patronymic}
                      onChange={handleEditChange("patronymic")}
                    />
                  </div>



                  <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Телефон
                    </label>
                    <InputMask
                      mask='+389999999999'
                      value={modalEdit.human.phone}
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

                  <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                    <label htmlFor="ipn" className="block text-sm font-medium text-gray-700">
                      ІПН
                    </label>
                    <InputMask
                      mask='9999999999'
                      value={modalEdit.human.ipn}
                      maskPlaceholder=""

                      onChange={handleEditChange("ipn")}
                    >
                      <input
                        type="text"
                        name="ipn"
                        id="ipn"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"

                      />
                    </InputMask>
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Дата народження
                    </label>
                    <InputMask
                      mask='99.99.9999'
                      value={modalEdit.human.dateOfBirthday}
                      placeholder="31.08.1997"
                      maskPlaceholder=""
                      onChange={handleEditChange("dateOfBirthday")}
                    >
                      <input type="text"
                        name="dateOfBirthday"
                        id="dateOfBirthday"

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

                      handleEditButton(modalEdit.human)
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

export default HumanManager;


