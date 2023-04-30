import React, { useEffect, useMemo, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LockClosedIcon } from '@heroicons/react/20/solid'
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
  const actualAddressRegion = useSelector((state: RootState) => state.region.actualAddressRegion);
  const addressRegions = useSelector((state: RootState) => state.region.addressRegions);
  const isLoadingAddressRegion = useSelector((state: RootState) => state.region.addressRegionIsLoading);

  const addressCity = useSelector((state: RootState) => state.city.addressCity);
  const actualAddressCity = useSelector((state: RootState) => state.city.actualAddressCity);
  const addressCities = useSelector((state: RootState) => state.city.addressCities);
  const isLoadingAddressCity = useSelector((state: RootState) => state.city.addressCityIsLoading);

  const [streets, setStreets] = useState<{ id: any; name: string; }[]>([])
  const addressService = new AddressService(useAxios(), useSnackbar())
  useEffect(() => {
    dispatch(actualAddressCityUpdateAction({
      _id: "",
      name: "",
      regionId: "",
    }))
    addressService.getActualAddressCities(dispatch, isLoadingAddressRegion, actualAddressRegion._id)
  }, [actualAddressRegion])

  useEffect(() => {
    dispatch(actualAddressStreetUpdateAction(
      {
        _id: "",
        name: "",
        cityId: "",
      }
    ))
    addressService.getActualAddressStreets(dispatch, isLoadingAddressRegion, addressCity._id)
  }, [actualAddressCity])

  const handleCreateRegion = (inputValue: string) => {
    addressService.createAddressRegion(dispatch, isLoadingAddressRegion, { name: inputValue });
  }

  const handleCreateCity = (inputValue: string) => {
    addressService.createAddressCity(dispatch, isLoadingAddressCity, { regionId: addressRegion._id, name: inputValue });
  }

  const columnsStreets: MRT_ColumnDef[] = useMemo(
    () => [
      {
        header: 'id',
        accessorKey: "id"
      },
      {
        header: 'Назва Вулиці',
        accessorKey: "name"
      },

    ],
    []
  );

  const handleUpload = (e: any) => {
    e.preventDefault();

    var files = e.target.files,
      f = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e?.target?.result;
      let readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      /* Convert array to json*/
      let dataParse: { id: any; name: string; }[] = XLSX.utils.sheet_to_json(ws);

      const streets: { id: any; name: string; }[] = dataParse.map((record) => {
        return {
          id: record.id,
          name: String(record.name),
        };
      });
      console.log('====================================');
      console.log(streets);
      console.log('====================================');
      setStreets(streets);
      // setAllowToTest(true);
      // setAllowToCreate(false);
    };
    reader.readAsBinaryString(f);
  };
  return (
    <>
      <form>
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

              <MaterialReactTable
                columns={columnsStreets}
                data={streets}
                // state={{ isLoading: distributionIsLoading }}
                enableRowSelection
                // enableColumnResizing
                // columnResizeMode="onEnd"
                initialState={{ density: "compact", pagination: { pageIndex: 0, pageSize: 20 } }}

                localization={MRT_Localization_UK}
                enableRowActions
              // renderRowActions={distributionActions}
              />
            </div>
          </div>
        </div>
      </form>


    </>

  )
};

export default AddressManager;


