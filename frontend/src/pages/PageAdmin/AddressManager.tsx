import React, { ReactNode, useEffect, useMemo, useState, Fragment } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LockClosedIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/lib/frameworks/redux';
import { actualAddressCityUpdateAction, actualAddressStreetUpdateAction, addressCityUpdateAction, addressRegionUpdateAction, humanUpdateAction } from '../../core/lib/adapters';
import { Autocomplete } from '../../components/Autocomplete';
import AddressService from '../../core/lib/services/AddressService';
import { useAxios } from '../../hooks';
import { useSnackbar } from 'notistack';
import { MRT_Localization_UK } from 'material-react-table/locales/uk';
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import * as XLSX from "xlsx";
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




const AddressManager = () => {
  const dispatch = useDispatch();
  const addressRegion = useSelector((state: RootState) => state.region.addressRegion);

  const addressRegions = useSelector((state: RootState) => state.region.addressRegions);
  const isLoadingAddressRegion = useSelector((state: RootState) => state.region.addressRegionIsLoading);

  const addressCity = useSelector((state: RootState) => state.city.addressCity);
  const actualAddressCity = useSelector((state: RootState) => state.city.actualAddressCity);
  const addressCities = useSelector((state: RootState) => state.city.addressCities);
  const isLoadingAddressCity = useSelector((state: RootState) => state.city.addressCityIsLoading);

  const [streets, setStreets] = useState<{ id: any; name: string; }[]>([])
  const addressService = new AddressService(useAxios(), useSnackbar())
  const [modalDelete, setModalDelete] = useState({
    isOpen: false,
    street: { id: 0, name: "", },
  })

  useEffect(() => {
    addressService.getAddressRegions(dispatch, isLoadingAddressRegion)

  }, [])

  useEffect(() => {

    dispatch(addressCityUpdateAction({
      _id: "",
      name: "",
      regionId: "",
    }))
    addressService.getAddressCities(dispatch, isLoadingAddressRegion, addressRegion._id)
  }, [addressRegion])



  const handleCreateRegion = (inputValue: string) => {
    addressService.createAddressRegion(dispatch, isLoadingAddressRegion, { name: inputValue });
  }

  const handleCreateCity = (inputValue: string) => {
    addressService.createAddressCity(dispatch, isLoadingAddressCity, { regionId: addressRegion._id, name: inputValue });
  }

  const handleCreateButton = () => {
    streets.map(street => {
      addressService.createAddressStreet(dispatch, isLoadingAddressRegion, { cityId: addressCity._id, name: street.name });
    })

  }

  const streetActions = (props: {
    row: {
      original: { id: any; name: string; }
    },
    table: any,
  }): ReactNode => {
    return (
      <div className='flex'>


        <button className="flex items-center py-1 px-1 text-xs font-medium text-gray-700   toggle-full-view hover:text-red-700 focus:z-10 dark:bg-gray-800 focus:outline-none dark:text-gray-400  dark:hover:text-white dark:hover:bg-gray-700" onClick={() =>
          setModalDelete({
            isOpen: true,
            street: props.row.original,
          }
          )
        }>
          <span className="sr-only">Delete</span>
          <TrashIcon className="block h-6 w-6 pr-1" />

        </button>
      </div >
    );
  }
  const columnsStreets: MRT_ColumnDef<{ id: any; name: string; }>[] =
    [
      {
        header: 'id',
        accessorKey: 'id'
      },
      {
        header: 'Назва Вулиці',
        accessorKey: 'name'
      },

    ]
    ;

  const handleUpload = (e: any) => {
    console.log("handleUpload");

    e.preventDefault();

    var files = e.target.files,
      f = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e?.target?.result;
      let readData = XLSX.read(data, { type: "binary" });
      const wsname = readData.SheetNames[0];
      const ws = readData.Sheets[wsname];

      /* Convert array to json*/
      let dataParse: { id: any; name: string; }[] = XLSX.utils.sheet_to_json(ws);

      const streets: { id: any; name: string; }[] = dataParse.map((record) => {
        return {
          id: record.id,
          name: String(record.name),
        };
      });
      setStreets(streets);
      // setAllowToTest(true);
      // setAllowToCreate(false);
    };
    reader.onerror = function (ex) {
      console.log(ex);
    };
    reader.readAsBinaryString(f);
  };
  return (
    <>

      <div className=" shadow sm:rounded-md">
        <div className="bg-white text-center px-4 py-5 sm:p-6">
          {/* В розробці! */}
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="Region" className="block text-sm font-medium text-gray-700">
                Регіон
              </label>
              <Autocomplete options={addressRegions} value={addressRegion} setValue={addressRegionUpdateAction} isLoading={isLoadingAddressRegion} handleCreate={handleCreateRegion} />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="City" className="block text-sm font-medium text-gray-700">
                Населенний пункт
              </label>
              <Autocomplete options={addressCities} value={addressCity} setValue={addressCityUpdateAction} isLoading={isLoadingAddressCity} handleCreate={handleCreateCity} />
            </div>
          </div>
          <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <div className="flex items-center justify-center w-full mt-5">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Натисніть, щоб завантажити</span>, або перетягніть</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">CSV, XLSX</p>
                </div>
                <input id="dropzone-file" type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" className="hidden" onChange={handleUpload} />
              </label>
            </div>


          </div>
          <MaterialReactTable
            columns={columnsStreets}
            data={streets}
            state={{ isLoading: false }}
            // enableRowSelection
            // enableColumnResizing
            // columnResizeMode="onEnd"
            initialState={{ density: "compact", pagination: { pageIndex: 0, pageSize: 20 } }}

            localization={MRT_Localization_UK}
            enableRowActions
            renderRowActions={streetActions}
          />
          <div className=" px-4 py-3 text-center sm:px-6">
            <button

              className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={handleCreateButton}

            >
              Створити
            </button>
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
                    Назва: {modalDelete.street.name}
                  </p>



                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-300 duration-300"
                    onClick={() => {
                      setStreets(streets.filter(street => street.id !== modalDelete.street.id))
                      // handleDeleteButton(modalDelete.center)
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

export default AddressManager;


