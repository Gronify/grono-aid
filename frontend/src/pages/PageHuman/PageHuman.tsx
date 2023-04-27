import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LockClosedIcon, PhoneIcon, UserIcon, CalendarDaysIcon, IdentificationIcon, MapPinIcon, HomeIcon, } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/lib/frameworks/redux';
import { distributionUpdateAction, giftUpdateAction, humanUpdateAction } from '../../core/lib/adapters';
import { useParams } from 'react-router-dom';
import { useAxios } from '../../hooks';
import HumanService from '../../core/lib/services/HumanSearchService';
import moment from 'moment';
import GiftService from '../../core/lib/services/GiftService';
import { Autocomplete } from '../../components/Autocomplete';
import DistributionService from '../../core/lib/services/DistributionService';
import { useSnackbar } from 'notistack';
// import { PhoneIcon, UserIcon, CalendarDaysIcon, IdentificationIcon, MapPinIcon, HomeIcon, } from '@heroicons/react/24/outline';


type Props = {

  isLoading: boolean;
}

const ІssuanceSchema = Yup.object().shape({
  login: Yup.string()
    .required("Логін це обов'язкове поле вводу"),
  password: Yup.string()
    .required("Пароль це обов'язкове поле вводу"),
});


const PageHuman = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const humanSearch = useSelector((state: RootState) => state.humanSearch.data)
  const isLoading = useSelector((state: RootState) => state.humanSearch.isLoading)
  const gift = useSelector((state: RootState) => state.gift.data)
  const gifts = useSelector((state: RootState) => state.gift.gifts)
  const giftIsLoading = useSelector((state: RootState) => state.gift.isLoading)
  const humanService = new HumanService(useAxios(), useSnackbar())
  const giftService = new GiftService(useAxios(), useSnackbar())
  const distribution = useSelector((state: RootState) => state.distribution.data)
  const distributions = useSelector((state: RootState) => state.distribution.distributions)
  const distributionIsLoading = useSelector((state: RootState) => state.distribution.isLoading)

  const distributionService = new DistributionService(useAxios(), useSnackbar())
  const bottomRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [distributions])

  useEffect(() => {
    humanService.findHumanById(dispatch, isLoading, id)
    giftService.getGifts(dispatch, isLoading)

  }, [id])

  useEffect(() => {
    if (id) {
      distributionService.getDistributions(dispatch, isLoading, id)
    }
  }, [id])

  const handleButton = (prop: any) => {
    distributionService.create(dispatch, isLoading, {
      humanId: humanSearch._id,
      giftId: gift._id,
      amount: distribution.amount,
      comment: distribution.comment,
    })
  };



  const handleChange = (prop: any) => (event: any) => {

    dispatch(distributionUpdateAction({ ...distribution, [prop]: event.target.value }))

  };

  return (
    <>
      <div className='container mx-auto mt-6'>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div className="bg-white shadow-md rounded-lg px-6 py-6 mb-2">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                <label htmlFor="surname" className="flex text-sm font-medium text-gray-500">
                  <UserIcon className="h-5 w-5 mr-1" /> Прізвище, Ім'я, Побатькові
                </label>
                <span className="leading-tight font-normal text-xl mb-2">{humanSearch.surname} {humanSearch.name} {humanSearch.patronymic}</span>
              </div>
              <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                <label htmlFor="phone" className="flex text-sm font-medium text-gray-500">
                  <PhoneIcon className="h-5 w-5 mr-1" /> Телефон
                </label>
                <span className="leading-tight font-normal text-xl mb-2">{humanSearch.phone}</span>
              </div>

              {humanSearch.ipn !== '' ?
                <div className="col-span-6 sm:col-span-3 lg:col-span-3">

                  <label htmlFor="phone" className="flex text-sm font-medium text-gray-500">
                    <IdentificationIcon className="h-5 w-5 mr-1" />  ІПН
                  </label>
                  <span className="leading-tight font-normal text-xl mb-2">{humanSearch.ipn}</span>
                </div>
                : null}

              {humanSearch.passportId !== '' ? <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                <label htmlFor="passport" className="flex text-sm font-medium text-gray-500">
                  <IdentificationIcon className="h-5 w-5 mr-1" />  Паспорт
                </label>
                <span className="leading-tight font-normal text-xl mb-2">{humanSearch.passportId}</span>
              </div> : null}

              <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                <label htmlFor="dateOfBirthday" className="flex text-sm font-medium text-gray-500">
                  <CalendarDaysIcon className="h-5 w-5 mr-1" />
                  Дата народження
                </label>
                <span className="leading-tight font-normal text-xl mb-2">{moment(humanSearch.dateOfBirthday).format('DD.MM.YYYY')}</span>
              </div>
              <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                <label htmlFor="address" className="flex text-sm font-medium text-gray-500">
                  <HomeIcon className="h-5 w-5 mr-1" /> Адреса прописки
                </label>
                <span className="leading-tight font-normal text-xl mb-2">{humanSearch.address.buildingId.streetId.cityId.regionId.name}, {humanSearch.address.buildingId.streetId.cityId.name}, {humanSearch.address.buildingId.streetId.name}, {humanSearch.address.buildingId.name}/{humanSearch.address.name}</span>
              </div>
              <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                <label htmlFor="actualAddress" className="flex text-sm font-medium text-gray-500">
                  <MapPinIcon className="h-5 w-5 mr-1" />   Фактична адреса
                </label>
                <span className="leading-tight font-normal text-xl mb-2">{humanSearch.actualAddress.buildingId.streetId.cityId.regionId.name}, {humanSearch.actualAddress.buildingId.streetId.cityId.name}, {humanSearch.actualAddress.buildingId.streetId.name}, {humanSearch.actualAddress.buildingId.name}/{humanSearch.actualAddress.name}</span>
              </div>
              {humanSearch.passportId !== '' ? <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-500">
                  Коментар
                </label>
                <span className="leading-tight font-normal text-xl mb-2">{humanSearch.comment}</span></div>
                : null}
            </div>
          </div>
          <div className="overflow-auto max-h-96">
            <div className='flex-none min-w-full px-4 sm:px-6 md:px-0 overflow-hidden lg:overflow-auto scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded dark:scrollbar-track:!bg-slate-500/[0.16] dark:scrollbar-thumb:!bg-slate-500/50 max-h-96 lg:supports-scrollbars:pr-2 lg:max-h-96'>
              <ol className="border-l border-gray-300 m-2">

                {distributions.map((distribution) => {
                  return <li>
                    <div className="flex flex-start items-center pt-3">
                      <div className="bg-gray-300 w-2 h-2 rounded-full -ml-1 mr-3"></div>
                      <p className="text-gray-500 text-sm">{moment(distribution.createdAt).format('DD.MM.YYYY HH:mm:ss')}</p>
                    </div>
                    <div className="mt-0.5 ml-4 mb-6">
                      <h4 className="text-gray-800 font-semibold text-xl mb-1.5">{distribution.giftId.name} {distribution.amount} {distribution.giftId.measurement}</h4>
                      <p className="text-gray-500 mb-3">{distribution.giftId.description} </p>
                    </div>
                  </li>
                })}

                <div ref={bottomRef} />

              </ol>

            </div>
          </div>
          <div className="shadow sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="gift" className="block text-sm font-medium text-gray-700">
                    Вид допомоги
                  </label>

                  <Autocomplete options={gifts} value={gift} setValue={giftUpdateAction} isLoading={giftIsLoading} />

                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                    Кількість {gifts.find(({ _id }) => _id === gift._id)?.measurement}
                  </label>
                  <input
                    type="number"
                    name="amount"
                    id="amount"

                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={handleChange("amount")}
                  />
                </div>


              </div>

            </div>
            <div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
              <button
                className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleButton}
              >
                Видати
              </button>
            </div>
          </div>
        </div>
      </div >

    </>

  )
};

export default PageHuman;


