import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/lib/frameworks/redux';
import { actualAddressBuildingUpdateAction, actualAddressCityUpdateAction, actualAddressFlatUpdateAction, actualAddressRegionUpdateAction, actualAddressStreetUpdateAction, addressBuildingUpdateAction, addressCityUpdateAction, addressFlatUpdateAction, addressRegionUpdateAction, addressStreetUpdateAction, humanUpdateAction } from '../../core/lib/adapters';
import { Autocomplete } from '../../components/Autocomplete';
import AddressService from '../../core/lib/services/AddressService';
import { useAxios } from '../../hooks';
import HumanService from '../../core/lib/services/HumanSearchService';
import Avatar, { genConfig } from 'react-nice-avatar';
import { Link, useNavigate } from 'react-router-dom';
import InputMask from "react-input-mask";
import { DtoCreateHuman } from '../../core/lib/dto/human';
import moment from 'moment';
import { log } from 'console';
import { useSnackbar } from 'notistack';

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
  const navigate = useNavigate();
  const [hasIpn, setHasIpn] = useState(true)
  const [hasActualAddress, setHasActualAddress] = useState(false)

  const human = useSelector((state: RootState) => state.human.data);


  const humanSearch = useSelector((state: RootState) => state.humanSearch.data);
  const humansSearch = useSelector((state: RootState) => state.humanSearch.humans);

  const isLoading = useSelector((state: RootState) => state.user.isLoading);

  const addressService = new AddressService(useAxios(), useSnackbar())
  const humanService = new HumanService(useAxios())

  const addressRegion = useSelector((state: RootState) => state.region.addressRegion);
  const actualAddressRegion = useSelector((state: RootState) => state.region.actualAddressRegion);
  const addressRegions = useSelector((state: RootState) => state.region.addressRegions);
  const actualAddressRegions = useSelector((state: RootState) => state.region.actualAddressRegions);
  const isLoadingAddressRegion = useSelector((state: RootState) => state.region.addressRegionIsLoading);
  const isLoadingActualAddressRegion = useSelector((state: RootState) => state.region.actualAddressRegionIsLoading);

  const addressCity = useSelector((state: RootState) => state.city.addressCity);
  const actualAddressCity = useSelector((state: RootState) => state.city.actualAddressCity);
  const addressCities = useSelector((state: RootState) => state.city.addressCities);
  const actualAddressCities = useSelector((state: RootState) => state.city.actualAddressCities);
  const isLoadingAddressCity = useSelector((state: RootState) => state.city.addressCityIsLoading);
  const isLoadingActualAddressCity = useSelector((state: RootState) => state.city.actualAddressCityIsLoading);

  const addressStreet = useSelector((state: RootState) => state.street.addressStreet);
  const actualAddressStreet = useSelector((state: RootState) => state.street.actualAddressStreet);
  const addressStreets = useSelector((state: RootState) => state.street.addressStreets);
  const actualAddressStreets = useSelector((state: RootState) => state.street.actualAddressStreets);
  const isLoadingAddressStreet = useSelector((state: RootState) => state.street.addressStreetIsLoading);
  const isLoadingActualAddressStreet = useSelector((state: RootState) => state.street.actualAddressStreetIsLoading);

  const addressBuilding = useSelector((state: RootState) => state.building.addressBuilding);
  const actualAddressBuilding = useSelector((state: RootState) => state.building.actualAddressBuilding);
  const addressBuildings = useSelector((state: RootState) => state.building.addressBuildings);
  const actualAddressBuildings = useSelector((state: RootState) => state.building.actualAddressBuildings);
  const isLoadingAddressBuilding = useSelector((state: RootState) => state.building.addressBuildingIsLoading);
  const isLoadingActualAddressBuilding = useSelector((state: RootState) => state.building.actualAddressBuildingIsLoading);

  const addressFlat = useSelector((state: RootState) => state.flat.addressFlat);
  const actualAddressFlat = useSelector((state: RootState) => state.flat.actualAddressFlat);
  const addressFlats = useSelector((state: RootState) => state.flat.addressFlats);
  const actualAddressFlats = useSelector((state: RootState) => state.flat.actualAddressFlats);
  const isLoadingAddressFlat = useSelector((state: RootState) => state.flat.addressFlatIsLoading);
  const isLoadingActualAddressFlat = useSelector((state: RootState) => state.flat.actualAddressFlatIsLoading);


  useEffect(() => {
    addressService.getAddressRegions(dispatch, isLoadingAddressRegion)
    addressService.getActualAddressRegions(dispatch, isLoadingActualAddressRegion)
  }, [])

  useEffect(() => {
    dispatch(addressCityUpdateAction({
      _id: "",
      name: "",
      regionId: "",
    }))
    addressService.getAddressCities(dispatch, isLoadingAddressRegion, addressRegion._id)
  }, [addressRegion])

  useEffect(() => {
    dispatch(addressStreetUpdateAction(
      {
        _id: "",
        name: "",
        cityId: "",
      }
    ))
    addressService.getAddressStreets(dispatch, isLoadingAddressRegion, addressCity._id)
  }, [addressCity])


  useEffect(() => {
    dispatch(addressBuildingUpdateAction({
      _id: "",
      name: "",
      streetId: "",
    }))
    addressService.getAddressBuildings(dispatch, isLoadingAddressRegion, addressStreet._id)
  }, [addressStreet])

  useEffect(() => {
    dispatch(addressFlatUpdateAction({
      _id: "",
      name: "",
      buildingId: "",
    }
    ))
    addressService.getAddressFlats(dispatch, isLoadingAddressRegion, addressBuilding._id)
  }, [addressBuilding])

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
    addressService.getActualAddressStreets(dispatch, isLoadingAddressRegion, actualAddressCity._id)
  }, [actualAddressCity])


  useEffect(() => {
    dispatch(actualAddressBuildingUpdateAction({
      _id: "",
      name: "",
      streetId: "",
    }))
    addressService.getActualAddressBuildings(dispatch, isLoadingAddressRegion, actualAddressStreet._id)
  }, [actualAddressStreet])

  useEffect(() => {
    dispatch(actualAddressFlatUpdateAction({
      _id: "",
      name: "",
      buildingId: "",
    }
    ))
    addressService.getActualAddressFlats(dispatch, isLoadingAddressRegion, actualAddressBuilding._id)
  }, [actualAddressBuilding])



  const handleChange = (prop: any) => (event: any) => {
    dispatch(humanUpdateAction({ ...human, [prop]: event.target.value }))
  };


  const handleCreateRegion = (inputValue: string) => {
    addressService.createAddressRegion(dispatch, isLoadingAddressRegion, { name: inputValue });
  }

  const handleCreateCity = (inputValue: string) => {
    addressService.createAddressCity(dispatch, isLoadingAddressCity, { regionId: addressRegion._id, name: inputValue });
  }

  const handleCreateStreet = (inputValue: string) => {
    addressService.createAddressStreet(dispatch, isLoadingAddressStreet, { cityId: addressCity._id, name: inputValue });
  }

  const handleCreateBuilding = (inputValue: string) => {
    addressService.createAddressBuilding(dispatch, isLoadingAddressBuilding, { streetId: addressStreet._id, name: inputValue });
  }

  const handleCreateFlat = (inputValue: string) => {
    addressService.createAddressFlat(dispatch, isLoadingAddressFlat, { buildingId: addressBuilding._id, name: inputValue });
  }


  const handleCreateActualRegion = (inputValue: string) => {
    addressService.createActualAddressRegion(dispatch, isLoadingAddressRegion, { name: inputValue });
  }

  const handleCreateActualCity = (inputValue: string) => {
    addressService.createActualAddressCity(dispatch, isLoadingAddressCity, { regionId: actualAddressRegion._id, name: inputValue });
  }

  const handleCreateActualStreet = (inputValue: string) => {
    addressService.createActualAddressStreet(dispatch, isLoadingAddressStreet, { cityId: actualAddressCity._id, name: inputValue });
  }

  const handleCreateActualBuilding = (inputValue: string) => {
    addressService.createActualAddressBuilding(dispatch, isLoadingAddressBuilding, { streetId: actualAddressStreet._id, name: inputValue });
  }

  const handleCreateActualFlat = (inputValue: string) => {
    addressService.createActualAddressFlat(dispatch, isLoadingAddressFlat, { buildingId: actualAddressBuilding._id, name: inputValue });
  }

  const handleButton = (prop: any) => {
    humanService.findHumans(dispatch, isLoading, human)

  };
  const handleButtonCreateHuman = async (prop: any) => {


    const humanCreate: DtoCreateHuman = {
      surname: human.surname,
      name: human.name,
      patronymic: human.patronymic,
      phone: human.phone,
      ipn: human.ipn,
      dateOfBirthday: moment(human.dateOfBirthday, 'DD.MM.YYYY').toDate(),
      address: addressFlat._id,
      actualAddress: hasActualAddress ? actualAddressFlat._id : addressFlat._id,
      passportId: human.passportId,
      comment: "",
      blocked: false
    }
    const newHuman = await humanService.createHuman(dispatch, isLoading, humanCreate)

    navigate("/human/" + newHuman._id)

  };




  return (
    <>
      <div className='container mx-auto'>
        <div className="mt-5 md:col-span-2 md:mt-0">

          <div className=" shadow sm:rounded-md">
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
                    value={human.surname}
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
                    value={human.name}
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
                    value={human.patronymic}
                    onChange={handleChange("patronymic")}
                  />
                </div>

                <div className="col-span-6 ">
                  <label htmlFor="ipnOrPassport" className="flex justify-between text-sm font-medium text-gray-700">
                    {hasIpn ? "ІПН" : "Паспорт"}
                    <div className="flex  items-center text-sm font-medium text-gray-700">
                      <input
                        type="checkbox"
                        name="hasIpn"
                        id="hasIpn"
                        className="mr-1  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"

                        onChange={(event) => setHasIpn(!event.target.checked)}

                      />
                      <label htmlFor="hasIpn" className="block text-sm font-medium text-gray-700">
                        Немає ІПН?
                      </label>

                    </div>
                  </label>
                  {hasIpn ?
                    <InputMask
                      mask='9999999999'
                      value={human.ipn}
                      maskPlaceholder=""

                      onChange={handleChange("ipn")}
                    >
                      <input
                        type="text"
                        name="ipn"
                        id="ipn"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"

                      />
                    </InputMask> :
                    // TODO: TO UPPERCASE
                    <InputMask
                      mask={"aa999999"}
                      value={human.passportId.toUpperCase()}
                      maskPlaceholder=""

                      onChange={handleChange("passportId")}
                    >
                      <input
                        type="text"
                        name="passportId"
                        id="passportId"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </InputMask>

                  }
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Дата народження
                  </label>
                  <InputMask
                    mask='99.99.9999'
                    value={human.dateOfBirthday}
                    placeholder="23.08.2002"
                    maskPlaceholder=""
                    onChange={handleChange("dateOfBirthday")}
                  >
                    <input type="text"
                      name="dateOfBirthday"
                      id="dateOfBirthday"

                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </InputMask>

                </div>


                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Телефон
                  </label>
                  <InputMask
                    mask='+389999999999'
                    value={human.phone}
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

                <div className="col-span-6">
                  <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                    Вулиця
                  </label>
                  <Autocomplete options={addressStreets} value={addressStreet} setValue={addressStreetUpdateAction} isLoading={isLoadingAddressStreet} handleCreate={handleCreateStreet} />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                  <label htmlFor="building" className="block text-sm font-medium text-gray-700">
                    Будинок
                  </label>
                  <Autocomplete options={addressBuildings} value={addressBuilding} setValue={addressBuildingUpdateAction} isLoading={isLoadingAddressBuilding} handleCreate={handleCreateBuilding} />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                  <label htmlFor="flat" className="block text-sm font-medium text-gray-700">
                    Квартира
                  </label>
                  <Autocomplete options={addressFlats} value={addressFlat} setValue={addressFlatUpdateAction} isLoading={isLoadingAddressFlat} handleCreate={handleCreateFlat} />
                </div>
                <div className="col-span-6">
                  <label htmlFor="hasActualAddress" className="flex justify-start text-sm font-medium text-gray-700">

                    <div className="flex  items-center text-sm font-medium text-gray-700">
                      <input
                        type="checkbox"
                        name="hasActualAddress"
                        id="hasActualAddress"
                        className="mr-1  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={(event) => setHasActualAddress(event.target.checked)}

                      />
                      <label htmlFor="hasActualAddress" className="block text-sm font-medium text-gray-700">
                        Живе не за пропискою
                      </label>

                    </div>
                  </label>

                </div>
                {hasActualAddress ?
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="Region" className="block text-sm font-medium text-gray-700">
                      Регіон
                    </label>
                    <Autocomplete options={actualAddressRegions} value={actualAddressRegion} setValue={actualAddressRegionUpdateAction} isLoading={isLoadingActualAddressRegion} handleCreate={handleCreateActualRegion} />
                  </div> : null}

                {hasActualAddress ? <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="City" className="block text-sm font-medium text-gray-700">
                    Населенний пункт
                  </label>
                  <Autocomplete options={actualAddressCities} value={actualAddressCity} setValue={actualAddressCityUpdateAction} isLoading={isLoadingActualAddressCity} handleCreate={handleCreateActualCity} />
                </div> : null}

                {hasActualAddress ? <div className="col-span-6">
                  <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                    Вулиця
                  </label>
                  <Autocomplete options={actualAddressStreets} value={actualAddressStreet} setValue={actualAddressStreetUpdateAction} isLoading={isLoadingActualAddressStreet} handleCreate={handleCreateActualStreet} />
                </div> : null}

                {hasActualAddress ? <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                  <label htmlFor="building" className="block text-sm font-medium text-gray-700">
                    Будинок
                  </label>
                  <Autocomplete options={actualAddressBuildings} value={actualAddressBuilding} setValue={actualAddressBuildingUpdateAction} isLoading={isLoadingActualAddressBuilding} handleCreate={handleCreateActualBuilding} />
                </div> : null}

                {hasActualAddress ? <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                  <label htmlFor="flat" className="block text-sm font-medium text-gray-700">
                    Квартира
                  </label>
                  <Autocomplete options={actualAddressFlats} value={actualAddressFlat} setValue={actualAddressFlatUpdateAction} isLoading={isLoadingActualAddressFlat} handleCreate={handleCreateActualFlat} />
                </div> : null}
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
              <button

                className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleButton}
              >
                Пошук
              </button>
            </div>

            <div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
              <button
                className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleButtonCreateHuman}
              >
                Створити
              </button>
            </div>

          </div>


          <ul className=" divide-y divide-gray-200 dark:divide-gray-700">
            {humansSearch.map((humanSearch) => {
              return <Link to={'/human/' + humanSearch._id} key={humanSearch._id}> <li className="pb-3 sm:pb-4 block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 ">
                    <Avatar
                      className="h-10 w-10 rounded-full"
                      {...genConfig(humanSearch.surname + humanSearch.name + humanSearch.patronymic)}

                    />

                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {humanSearch.surname} {humanSearch.name} {humanSearch.patronymic}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {humanSearch.address.buildingId.streetId.cityId.regionId.name}, {humanSearch.address.buildingId.streetId.cityId.name}, {humanSearch.address.buildingId.streetId.name}, {humanSearch.address.buildingId.name}/{humanSearch.address.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {humanSearch.phone}
                    </p>
                  </div>


                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {"1000-7?"}
                  </div>
                </div>
              </li></Link>
            })}

          </ul>
        </div>
      </div>


    </>

  )
};

export default PageІssuance;


