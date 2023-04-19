import React, { useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/lib/frameworks/redux';
import { centerUpdateAction, humanUpdateAction } from '../../core/lib/adapters';
import InputMask from "react-input-mask";
import CenterService from '../../core/lib/services/CenterService';
import { useAxios } from '../../hooks';
import { useSnackbar } from 'notistack';
import HumanService from '../../core/lib/services/HumanSearchService';

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
  const center = useSelector((state: RootState) => state.center.data);
  const centers = useSelector((state: RootState) => state.center.centers);
  const isLoading = useSelector((state: RootState) => state.center.isLoading);

  const humanService = new HumanService(useAxios(), useSnackbar())
  useEffect(() => {
    // humanService.getAll(dispatch, isLoading)

  }, [])

  const handleChange = (prop: any) => (event: any) => {
    dispatch(centerUpdateAction({ ...center, [prop]: event.target.value }))
  };


  return (
    <>

      <div className="overflow-hidden shadow sm:rounded-md">
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className="grid grid-cols-6 gap-2">
            <p>.... </p>
          </div>
        </div>
      </div>



    </>

  )
};

export default HumanManager;


