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
import UserService from '../../core/lib/services/UserService';
import { UserEntityInterface } from '../../core/lib/entities/User';
import DistributionService from '../../core/lib/services/DistributionService';
import { DistributionEntityInterface, DistributionManagerEntityInterface } from '../../core/lib/entities/Distribution';

type Props = {

  isLoading: boolean;
}

// name: string;
// address: string;
// phone: string;
// director: string;
// phoneDirector: string;

const DistributionManager = () => {

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.data);
  const distribution = useSelector((state: RootState) => state.distribution.data);
  const distributions = useSelector((state: RootState) => state.distribution.distributions);
  const distributionIsLoading = useSelector((state: RootState) => state.user.isLoading);

  // _id: string;
  // humanId: HumanEntityInterface;
  // giftId: GiftEntityInterface;
  // amount: number;
  // comment: string;
  // userId: UserEntityInterface;
  // createdAt: string;
  const [modalDelete, setModalDelete] = useState({
    isOpen: false,
    distribution: distribution,
  })

  const distributionService = new DistributionService(useAxios(), useSnackbar())
  useEffect(() => {
    distributionService.getDistributionsByCenter(dispatch, distributionIsLoading, user.centerId._id)

  }, [])

  const handleDeleteButton = (distribution: DistributionEntityInterface) => {
    distributionService.delete(dispatch, distributionIsLoading, distribution, user.centerId._id)
  };

  const distributionActions = (props: {
    row: {
      original: DistributionEntityInterface
    },
    table: any,
  }): ReactNode => {
    return (
      <div className='flex'>

        <button className="flex items-center py-1 px-1 text-xs font-medium text-gray-700   toggle-full-view hover:text-red-700 focus:z-10 dark:bg-gray-800 focus:outline-none dark:text-gray-400  dark:hover:text-white dark:hover:bg-gray-700" onClick={() =>
          setModalDelete({
            isOpen: true,
            distribution: props.row.original,
          }
          )
        }>
          <span className="sr-only">Delete</span>
          <TrashIcon className="block h-6 w-6 pr-1" />

        </button>
      </div>
    );
  }

  const columnsDistribution: MRT_ColumnDef<DistributionEntityInterface>[] = useMemo(
    () => [

      {
        header: 'ПІБ',
        accessorFn: distribution => `${distribution.humanId.surname} ${distribution.humanId.name} ${distribution.humanId.patronymic}`
      },
      {
        header: 'Вид допомоги',
        accessorFn: distribution => `${distribution.giftId.name}`
      },
      {
        header: 'Кількість',
        accessorFn: distribution => `${distribution.amount}`
      },
      {
        header: 'ПІБ Волонтера',
        accessorFn: distribution => `${distribution.userId.surname} ${distribution.userId.name} ${distribution.userId.patronymic}`
      },
      {
        header: 'Комент',
        accessorKey: 'comment'
      },
      {
        header: 'Дата-час фіксації',
        accessorFn: distribution => moment(distribution.createdAt).format('DD.MM.YYYY HH:mm:ss')
      },


    ],
    [distributionActions]
  );


  return (
    <>

      <div className="overflow-hidden shadow sm:rounded-md">
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className=" px-4 py-3 text-center sm:px-6">
            <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
              <MaterialReactTable
                columns={columnsDistribution}
                data={distributions}
                state={{ isLoading: distributionIsLoading }}
                enableRowSelection
                // enableColumnResizing
                // columnResizeMode="onEnd"
                initialState={{ density: "compact", pagination: { pageIndex: 0, pageSize: 20 } }}

                localization={MRT_Localization_UK}
                enableRowActions
                renderRowActions={distributionActions}
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

                  </p>



                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-300 duration-300"
                    onClick={() => {

                      handleDeleteButton(modalDelete.distribution)
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
    </>

  )
};

export default DistributionManager;


