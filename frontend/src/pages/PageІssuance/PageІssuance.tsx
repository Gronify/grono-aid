import React, { useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/lib/frameworks/redux';
import { humanUpdateAction, regionUpdateAction } from '../../core/lib/adapters';
import { Autocomplete } from '../../components/Autocomplete';
import AddressService from '../../core/lib/services/AddressService';
import { useAxios } from '../../hooks';


type Props = {

  isLoading: boolean;
}

const ІssuanceSchema = Yup.object().shape({
  login: Yup.string()
    .required("Логін це обов'язкове поле вводу"),
  password: Yup.string()
    .required("Пароль це обов'язкове поле вводу"),
});


const PageІssuance = () => {
  const dispatch = useDispatch();
  const human = useSelector((state: RootState) => state.human.data);
  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const addressService = new AddressService(useAxios())



  const region = useSelector((state: RootState) => state.region.data);
  const regions = useSelector((state: RootState) => state.region.regions);
  const isLoadingRegion = useSelector((state: RootState) => state.region.isLoading);

  useEffect(() => {
    addressService.getRegions(dispatch, isLoadingRegion)
  }, [])

  const handleChange = (prop: any) => (event: any) => {
    dispatch(humanUpdateAction({ ...human, [prop]: event.target.value }))
  };




  return (
    <>
      <div className='container mx-auto'>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form>
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
                      Прізвище
                    </label>
                    <input
                      type="text"
                      name="surname"
                      id="surname"
                      autoComplete="family-name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={handleChange("surname")}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Ім'я
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="given-name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={handleChange("name")}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="patronymic" className="block text-sm font-medium text-gray-700">
                      По батькові
                    </label>
                    <input
                      type="text"
                      name="patronymic"
                      id="patronymic"
                      autoComplete="patronymic"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={handleChange("patronymic")}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="ipn" className="block text-sm font-medium text-gray-700">
                      ІПН
                    </label>
                    <input
                      type="text"
                      name="ipn"
                      id="ipn"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={handleChange("ipn")}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Телефон
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      autoComplete="phone"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={handleChange("phone")}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="Region" className="block text-sm font-medium text-gray-700">
                      Регіон
                    </label>
                    <Autocomplete options={regions} value={region} setValue={regionUpdateAction} isLoading={isLoading} />
                    {/* <select
                      id="Region"
                      name="Region"
                      autoComplete="Region-name"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>Donecka</option>
                      <option>Harkivska</option>
                      <option>Luganska</option>
                    </select> */}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="City" className="block text-sm font-medium text-gray-700">
                      Населенний пункт
                    </label>
                    <select
                      id="City"
                      name="City"
                      autoComplete="City-name"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>Kramatosk</option>
                      <option>Slavians</option>
                      <option>Drigkivka</option>
                    </select>
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                      Вулиця
                    </label>
                    <input
                      type="text"
                      name="street-address"
                      id="street-address"
                      autoComplete="street-address"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                    <label htmlFor="building" className="block text-sm font-medium text-gray-700">
                      Будинок
                    </label>
                    <input
                      type="text"
                      name="building"
                      id="building"
                      autoComplete="building"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                    <label htmlFor="flat" className="block text-sm font-medium text-gray-700">
                      Квартира
                    </label>
                    <input
                      type="text"
                      name="flat"
                      id="flat"
                      autoComplete="flat"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Пошук
                </button>
              </div>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="gift" className="block text-sm font-medium text-gray-700">
                        gift
                      </label>
                      <select
                        id="gift"
                        name="gift"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option>Продуктовий набор</option>
                        <option>Медікаменти</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="ammout" className="block text-sm font-medium text-gray-700">
                        Кількість
                      </label>
                      <input
                        type="number"
                        name="ammout"
                        id="ammout"
                        autoComplete="ammout"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>


                  </div>

                </div>
                <div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
                  <button
                    className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Створити і видати
                  </button>
                </div>
              </div>
            </div>
          </form>



        </div>
      </div>


    </>

  )
};

export default PageІssuance;


