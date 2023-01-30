import React, { useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/lib/frameworks/redux';
import { buildingUpdateAction, cityUpdateAction, flatUpdateAction, humanUpdateAction, regionUpdateAction, streetUpdateAction } from '../../core/lib/adapters';
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

  const city = useSelector((state: RootState) => state.city.data);
  const cities = useSelector((state: RootState) => state.city.cities);
  const isLoadingCity = useSelector((state: RootState) => state.city.isLoading);

  const street = useSelector((state: RootState) => state.street.data);
  const streets = useSelector((state: RootState) => state.street.streets);
  const isLoadingStreet = useSelector((state: RootState) => state.street.isLoading);

  const building = useSelector((state: RootState) => state.building.data);
  const buildings = useSelector((state: RootState) => state.building.buildings);
  const isLoadingBuilding = useSelector((state: RootState) => state.building.isLoading);

  const flat = useSelector((state: RootState) => state.flat.data);
  const flats = useSelector((state: RootState) => state.flat.flats);
  const isLoadingFlat = useSelector((state: RootState) => state.flat.isLoading);

  useEffect(() => {
    addressService.getRegions(dispatch, isLoadingRegion)
  }, [])

  useEffect(() => {
    dispatch(cityUpdateAction({
      _id: "",
      name: "",
      regionId: "",
    }))
    addressService.getCities(dispatch, isLoadingRegion, region._id)
  }, [region])

  useEffect(() => {
    dispatch(streetUpdateAction({
      _id: "",
      name: "",
      cityId: "",
    }))
    addressService.getStreets(dispatch, isLoadingRegion, city._id)
  }, [city])


  useEffect(() => {
    dispatch(buildingUpdateAction({
      _id: "",
      name: "",
      streetId: "",
    }))
    addressService.getBuildings(dispatch, isLoadingRegion, street._id)
  }, [street])

  useEffect(() => {
    dispatch(flatUpdateAction({
      _id: "",
      name: "",
      buildingId: "",
    }))
    addressService.getFlats(dispatch, isLoadingRegion, building._id)
  }, [building])



  const handleChange = (prop: any) => (event: any) => {
    dispatch(humanUpdateAction({ ...human, [prop]: event.target.value }))
  };


  const handleCreateRegion = (inputValue: string) => {
    addressService.createRegion(dispatch, isLoadingRegion, { name: inputValue });
  }

  const handleCreateCity = (inputValue: string) => {
    addressService.createCity(dispatch, isLoadingCity, { regionId: region._id, name: inputValue });
  }

  const handleCreateStreet = (inputValue: string) => {
    addressService.createStreet(dispatch, isLoadingStreet, { cityId: city._id, name: inputValue });
  }

  const handleCreateBuilding = (inputValue: string) => {
    addressService.createBuilding(dispatch, isLoadingBuilding, { streetId: street._id, name: inputValue });
  }

  const handleCreateFlat = (inputValue: string) => {
    addressService.createFlat(dispatch, isLoadingFlat, { buildingId: building._id, name: inputValue });
  }



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
                    <Autocomplete options={regions} value={region} setValue={regionUpdateAction} isLoading={isLoadingRegion} handleCreate={handleCreateRegion} />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="City" className="block text-sm font-medium text-gray-700">
                      Населенний пункт
                    </label>
                    <Autocomplete options={cities} value={city} setValue={cityUpdateAction} isLoading={isLoadingCity} handleCreate={handleCreateCity} />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                      Вулиця
                    </label>
                    <Autocomplete options={streets} value={street} setValue={streetUpdateAction} isLoading={isLoadingStreet} handleCreate={handleCreateStreet} />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                    <label htmlFor="building" className="block text-sm font-medium text-gray-700">
                      Будинок
                    </label>
                    <Autocomplete options={buildings} value={building} setValue={buildingUpdateAction} isLoading={isLoadingBuilding} handleCreate={handleCreateBuilding} />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                    <label htmlFor="flat" className="block text-sm font-medium text-gray-700">
                      Квартира
                    </label>
                    <Autocomplete options={flats} value={flat} setValue={flatUpdateAction} isLoading={isLoadingFlat} handleCreate={handleCreateFlat} />
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


