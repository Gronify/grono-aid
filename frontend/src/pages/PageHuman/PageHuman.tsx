import React, { useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/lib/frameworks/redux';
import { humanUpdateAction } from '../../core/lib/adapters';
import { useParams } from 'react-router-dom';
import { useAxios } from '../../hooks';
import HumanService from '../../core/lib/services/HumanService';
import moment from 'moment';


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

  const human = useSelector((state: RootState) => state.human.data)
  const isLoading = useSelector((state: RootState) => state.human.isLoading)
  const humanService = new HumanService(useAxios())
  useEffect(() => {
    humanService.findHumanById(dispatch, isLoading, id)


  }, [id])

  return (
    <>
      <div className='container mx-auto'>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <h4 className="font-medium leading-tight text-2xl">Profile</h4>
          <h4 className="font-medium leading-tight text-2xl">Прізвище: {human.surname}</h4>
          <h4 className="font-medium leading-tight text-2xl">Ім'я: {human.name}</h4>
          <h4 className="font-medium leading-tight text-2xl">Побатькові: {human.patronymic}</h4>
          <h4 className="font-medium leading-tight text-2xl">Номер: {human.phone}</h4>
          <h4 className="font-medium leading-tight text-2xl">ІПН: {human.ipn}</h4>
          <h4 className="font-medium leading-tight text-2xl">Паспорт ID: {human.passportId}</h4>
          <h4 className="font-medium leading-tight text-2xl">Дата народження: {moment(human.dateOfBirthday).format('DD.MM.YYYY')}</h4>
          <h4 className="font-medium leading-tight text-2xl">Адреса: {human.address.buildingId.streetId.cityId.regionId.name}, {human.address.buildingId.streetId.cityId.name}, {human.address.buildingId.streetId.name}, {human.address.buildingId.name}/{human.address.name}</h4>
          <h4 className="font-medium leading-tight text-2xl">Фактична адреса:</h4>
          <h4 className="font-medium leading-tight text-2xl">ІПН: {human.comment}</h4>
          <ol className="border-l border-gray-300">
            <li>
              <div className="flex flex-start items-center pt-3">
                <div className="bg-gray-300 w-2 h-2 rounded-full -ml-1 mr-3"></div>
                <p className="text-gray-500 text-sm">01.07.2021</p>
              </div>
              <div className="mt-0.5 ml-4 mb-6">
                <h4 className="text-gray-800 font-semibold text-xl mb-1.5">Title of section 1</h4>
                <p className="text-gray-500 mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, et elementum lorem ornare. Maecenas placerat facilisis mollis. Duis sagittis ligula in sodales vehicula.</p>
              </div>
            </li>
            <li>
              <div className="flex flex-start items-center pt-2">
                <div className="bg-gray-300 w-2 h-2 rounded-full -ml-1 mr-3"></div>
                <p className="text-gray-500 text-sm">13.09.2021</p>
              </div>
              <div className="mt-0.5 ml-4 mb-6">
                <h4 className="text-gray-800 font-semibold text-xl mb-1.5">Title of section 2</h4>
                <p className="text-gray-500 mb-3">Libero expedita explicabo eius fugiat quia aspernatur autem laudantium error architecto recusandae natus sapiente sit nam eaque, consectetur porro molestiae ipsam an deleniti.</p>
              </div>
            </li>
            <li>
              <div className="flex flex-start items-center pt-2">
                <div className="bg-gray-300 w-2 h-2 rounded-full -ml-1 mr-3"></div>
                <p className="text-gray-500 text-sm">25.11.2021</p>
              </div>
              <div className="mt-0.5 ml-4 pb-5">
                <h4 className="text-gray-800 font-semibold text-xl mb-1.5">Title of section 3</h4>
                <p className="text-gray-500 mb-3">Voluptatibus temporibus esse illum eum aspernatur, fugiat suscipit natus! Eum corporis illum nihil officiis tempore. Excepturi illo natus libero sit doloremque, laborum molestias rerum pariatur quam ipsam necessitatibus incidunt, explicabo.</p>
              </div>
            </li>
          </ol>
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
      </div>

    </>

  )
};

export default PageHuman;


