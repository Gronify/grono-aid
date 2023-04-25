import React, { ReactNode, useEffect, useState, useMemo, Fragment, PureComponent } from 'react';
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
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Props = {

  isLoading: boolean;
}

const StatisticSchema = Yup.object().shape({
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

const Statistic = () => {

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

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <>

      <div className=" shadow sm:rounded-md">
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className=" px-4 py-3 text-center sm:px-6">
            <div className='relative shadow-md sm:rounded-lg'>
              <div className='grid grid-cols-6 gap-3'>
                <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                  <ResponsiveContainer width={"100%"} height={"100%"} aspect={1} >
                    <AreaChart
                      width={400}
                      height={100}
                      data={data}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                      <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                  <ResponsiveContainer width={"100%"} height={"100%"} aspect={1} >
                    <AreaChart
                      width={400}
                      height={100}
                      data={data}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                      <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
};

export default Statistic;


